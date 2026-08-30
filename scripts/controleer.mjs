/* ─────────────────────────────────────────────────────────────
   DE COMPUTER LEEST DE ZAAK NA

   Bij zeventig bewijsstukken en achtentwintig verbanden is met de hand
   nakijken of alles klopt geen doen meer. Eén verband dat naar een
   bewijs-id verwijst dat niet bestaat, en de speler zit muurvast zonder
   dat het spel een fout geeft -- het draadje doet gewoon niets.

   Dit script laadt de échte verhaaldata en controleert of de zaak
   speelbaar is. Het draait mee in `npm run build`, dus een kapotte zaak
   kan niet online komen.

   Waarom kan node hier TypeScript inlezen? Node 22.18 en hoger haalt de
   types er vanzelf uit. Voorwaarde is wel dat de imports in src/verhaal/
   en src/engine/ hun .ts-extensie voluit schrijven, want node zoekt niet
   zelf naar bestanden zoals een bundelaar dat doet. Vandaar dat je daar
   `import { bewijs } from './bewijs.ts'` ziet staan en niet './bewijs'.
   ───────────────────────────────────────────────────────────── */

import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const hier = dirname(fileURLToPath(import.meta.url))
const zaakPad = resolve(hier, '..', 'src', 'verhaal', 'h1', 'index.ts')

const fouten = []
const waarschuwingen = []

function eis(voorwaarde, bericht) {
  if (!voorwaarde) fouten.push(bericht)
}

if (!existsSync(zaakPad)) {
  console.log('· nog geen zaak om na te kijken (src/verhaal/h1 bestaat nog niet)')
  process.exit(0)
}

const zaak = await import(zaakPad).then((m) => m.hoofdstuk1)

// ── 1. Ieder bewijsstuk heeft een uniek id ────────────────────
const bewijsIds = new Set()
for (const b of zaak.bewijs) {
  eis(!bewijsIds.has(b.id), `bewijs-id komt twee keer voor: ${b.id}`)
  bewijsIds.add(b.id)
}

// ── 2. Elke verwijzing wijst naar iets dat bestaat ────────────
const conclusieIds = new Set(zaak.verbanden.map((v) => v.id))
const slotIds = new Set(zaak.sloten.map((s) => s.id))
const gespreksIds = new Set(zaak.gesprekken.map((g) => g.id))

/** Alles wat een `opent`-lijst mag noemen. */
function bestaat(id) {
  return bewijsIds.has(id) || gespreksIds.has(id) || slotIds.has(id)
}

for (const v of zaak.verbanden) {
  eis(bewijsIds.has(v.van), `verband ${v.id} vertrekt vanaf onbekend bewijs: ${v.van}`)
  eis(bewijsIds.has(v.naar), `verband ${v.id} wijst naar onbekend bewijs: ${v.naar}`)
  eis(v.van !== v.naar, `verband ${v.id} verbindt een bewijsstuk met zichzelf`)
  for (const id of v.opent ?? []) {
    eis(bestaat(id), `verband ${v.id} opent iets onbekends: ${id}`)
  }
}

for (const s of zaak.sloten) {
  eis(bewijsIds.has(s.hintIn), `slot ${s.id} verwijst naar onbekend bewijs voor de hint: ${s.hintIn}`)
  eis(s.code.length > 0, `slot ${s.id} heeft geen code`)
  for (const id of s.opent) {
    eis(bestaat(id), `slot ${s.id} opent iets onbekends: ${id}`)
  }
}

for (const g of zaak.gesprekken) {
  for (const bericht of g.berichten) {
    for (const id of bericht.levert ?? []) {
      eis(bewijsIds.has(id), `gesprek ${g.id} levert onbekend bewijs: ${id}`)
    }
  }
}

// ── 3. Kun je de zaak eigenlijk uitspelen? ────────────────────
// We spelen hem na als een perfecte speler: alles pakken wat open is,
// elk geldig verband leggen, elk slot kraken waarvan de hint gevonden is.
// Komen we niet tot en met de laatste laag, dan zit de speler klem.
const beschikbaar = new Set(zaak.begin)
const gelegd = new Set()
const gekraakt = new Set()
const gehaaldeLagen = new Set()

function open(ids) {
  for (const id of ids ?? []) beschikbaar.add(id)
}

for (const g of zaak.gesprekken) {
  if (beschikbaar.has(g.id)) {
    for (const bericht of g.berichten) open(bericht.levert)
  }
}

let veranderd = true
let rondes = 0
while (veranderd && rondes < 200) {
  veranderd = false
  rondes++

  for (const v of zaak.verbanden) {
    if (gelegd.has(v.id)) continue
    if (beschikbaar.has(v.van) && beschikbaar.has(v.naar)) {
      gelegd.add(v.id)
      open(v.opent)
      veranderd = true
    }
  }

  for (const s of zaak.sloten) {
    if (gekraakt.has(s.id)) continue
    if (beschikbaar.has(s.hintIn)) {
      gekraakt.add(s.id)
      open(s.opent)
      veranderd = true
    }
  }

  for (const g of zaak.gesprekken) {
    if (!beschikbaar.has(g.id)) continue
    for (const bericht of g.berichten) {
      for (const id of bericht.levert ?? []) {
        if (!beschikbaar.has(id)) {
          beschikbaar.add(id)
          veranderd = true
        }
      }
    }
  }

  for (const laag of zaak.lagen) {
    if (gehaaldeLagen.has(laag.nr)) continue
    if (laag.eist.every((id) => gelegd.has(id) || gekraakt.has(id) || beschikbaar.has(id))) {
      gehaaldeLagen.add(laag.nr)
      open(laag.opent)
      veranderd = true
    }
  }
}

for (const laag of zaak.lagen) {
  eis(gehaaldeLagen.has(laag.nr), `laag ${laag.nr} (${laag.titel}) is onbereikbaar`)
}

// ── 4. Los materiaal opsporen ─────────────────────────────────
for (const b of zaak.bewijs) {
  if (!beschikbaar.has(b.id)) {
    waarschuwingen.push(`bewijs ${b.id} ("${b.titel}") is nergens te vinden`)
  }
}

for (const v of zaak.verbanden) {
  if (!gelegd.has(v.id)) {
    waarschuwingen.push(`verband ${v.id} kan nooit gelegd worden`)
  }
}

// ── 5. De ontknoping moet te onderbouwen zijn ─────────────────
eis(bewijsIds.has(zaak.dader.bewijsA), `sluitend bewijs A bestaat niet: ${zaak.dader.bewijsA}`)
eis(bewijsIds.has(zaak.dader.bewijsB), `sluitend bewijs B bestaat niet: ${zaak.dader.bewijsB}`)
eis(bewijsIds.has(zaak.dader.bewijsC), `sluitend bewijs C bestaat niet: ${zaak.dader.bewijsC}`)

// ── Uitslag ───────────────────────────────────────────────────
console.log(
  `· ${zaak.bewijs.length} bewijsstukken, ${zaak.verbanden.length} verbanden, ` +
    `${zaak.sloten.length} sloten, ${zaak.gesprekken.length} gesprekken, ` +
    `${zaak.lagen.length} lagen`,
)

for (const w of waarschuwingen) console.log(`  let op: ${w}`)

if (fouten.length > 0) {
  console.error('')
  for (const f of fouten) console.error(`  FOUT: ${f}`)
  console.error(`\nDe zaak klopt niet (${fouten.length} fouten).`)
  process.exit(1)
}

console.log('· de zaak is speelbaar')
