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
import { fileURLToPath, pathToFileURL } from 'node:url'
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

// Op Windows is 'c:\...' geen geldige module-URL, vandaar pathToFileURL.
const zaak = await import(pathToFileURL(zaakPad).href).then((m) => m.hoofdstuk1)

// ── 1. Ieder bewijsstuk heeft een uniek id ────────────────────
const bewijsIds = new Set()
for (const b of zaak.bewijs) {
  eis(!bewijsIds.has(b.id), `bewijs-id komt twee keer voor: ${b.id}`)
  bewijsIds.add(b.id)
}

// ── 2. Elke verwijzing wijst naar iets dat bestaat ────────────
const slotIds = new Set(zaak.sloten.map((s) => s.id))
const gespreksIds = new Set(zaak.gesprekken.map((g) => g.id))
const appIds = new Set(zaak.apps.map((a) => a.id))

/** Alles wat een `opent`-lijst mag noemen. */
function bestaat(id) {
  return bewijsIds.has(id) || gespreksIds.has(id) || slotIds.has(id) || appIds.has(id)
}

for (const v of zaak.verbanden) {
  eis(bewijsIds.has(v.van), `verband ${v.id} vertrekt vanaf onbekend bewijs: ${v.van}`)
  eis(bewijsIds.has(v.naar), `verband ${v.id} wijst naar onbekend bewijs: ${v.naar}`)
  eis(v.van !== v.naar, `verband ${v.id} verbindt een bewijsstuk met zichzelf`)
  for (const id of v.opent ?? []) {
    eis(bestaat(id), `verband ${v.id} opent iets onbekends: ${id}`)
  }
}

/** Op welke app zit dit slot? Een slot zonder app kan de speler nooit zien. */
const appVanSlot = new Map()
for (const a of zaak.apps) if (a.slot) appVanSlot.set(a.slot, a.id)

for (const s of zaak.sloten) {
  eis(bewijsIds.has(s.hintIn), `slot ${s.id} verwijst naar onbekend bewijs voor de hint: ${s.hintIn}`)
  eis(s.code.length > 0, `slot ${s.id} heeft geen code`)
  eis(appVanSlot.has(s.id), `slot ${s.id} zit nergens op -- geen enkele app noemt het`)
  for (const id of s.opent) {
    eis(bestaat(id), `slot ${s.id} opent iets onbekends: ${id}`)
  }
}

for (const b of zaak.bewijs) {
  if (b.app) eis(appIds.has(b.app), `bewijs ${b.id} ligt in een onbekende app: ${b.app}`)
}

for (const g of zaak.gesprekken) {
  eis(appIds.has(g.app), `gesprek ${g.id} ligt in een onbekende app: ${g.app}`)
}

for (const g of zaak.gesprekken) {
  for (const bericht of g.berichten) {
    for (const id of bericht.levert ?? []) {
      eis(bewijsIds.has(id), `gesprek ${g.id} levert onbekend bewijs: ${id}`)
    }
  }
}

// ── 3. Kun je de zaak eigenlijk uitspelen? ────────────────────
// We spelen hem na als een volmaakte speler: alles oppakken wat te zien
// is, elk geldig verband leggen, elk slot kraken waar we voor kunnen
// staan. Komen we niet tot en met de laatste laag, dan zit de speler klem.
//
// Dit draait op de échte motor uit src/engine/, niet op een nagebouwde
// versie ervan. Anders controleer je uiteindelijk of twee kopieën van de
// regels het met elkaar eens zijn in plaats van of de zaak klopt.
const motorPad = resolve(hier, '..', 'src', 'engine', 'zaak.ts')
const { beginToestand, pakOp, verbind, kraak } = await import(pathToFileURL(motorPad).href)

let t = beginToestand(zaak)
let veranderd = true
let rondes = 0

while (veranderd && rondes < 500) {
  veranderd = false
  rondes++

  // Alles oppakken wat in een zichtbare app ligt.
  for (const b of zaak.bewijs) {
    if (t.verzameld.includes(b.id)) continue
    if (!t.beschikbaar.includes(b.id)) continue
    if (b.app && !t.beschikbaar.includes(b.app)) continue
    t = pakOp(zaak, t, b.id).toestand
    veranderd = true
  }

  // Alles markeren in gesprekken die open staan.
  for (const g of zaak.gesprekken) {
    if (!t.beschikbaar.includes(g.id)) continue
    if (!t.beschikbaar.includes(g.app)) continue
    for (const bericht of g.berichten) {
      for (const id of bericht.levert ?? []) {
        if (t.verzameld.includes(id)) continue
        t = pakOp(zaak, t, id).toestand
        veranderd = true
      }
    }
  }

  for (const v of zaak.verbanden) {
    if (t.gelegd.includes(v.id)) continue
    if (!t.verzameld.includes(v.van) || !t.verzameld.includes(v.naar)) continue
    t = verbind(zaak, t, v.van, v.naar).toestand
    veranderd = true
  }

  for (const s of zaak.sloten) {
    if (t.gekraakt.includes(s.id)) continue
    // Twee voorwaarden: de speler moet de hint hebben, én de app waar het
    // slot op zit moet te zien zijn. Alleen de code kennen is niet genoeg
    // als je nooit voor de deur komt te staan.
    const app = appVanSlot.get(s.id)
    if (!t.verzameld.includes(s.hintIn)) continue
    if (!app || !t.beschikbaar.includes(app)) continue
    t = kraak(zaak, t, s.id, s.code).toestand
    veranderd = true
  }
}

const laatsteLaag = Math.max(...zaak.lagen.map((l) => l.nr))
eis(
  t.laag === laatsteLaag,
  `een volmaakte speler komt niet verder dan fase ${t.laag} van ${laatsteLaag} ` +
    `-- de zaak loopt dood`,
)

// ── 4. Los materiaal opsporen ─────────────────────────────────
for (const b of zaak.bewijs) {
  if (!t.verzameld.includes(b.id)) {
    waarschuwingen.push(`bewijs ${b.id} ("${b.titel}") is nergens te vinden`)
  }
}

for (const v of zaak.verbanden) {
  if (!t.gelegd.includes(v.id)) {
    waarschuwingen.push(`verband ${v.id} kan nooit gelegd worden`)
  }
}

for (const g of zaak.gesprekken) {
  if (!t.beschikbaar.includes(g.id)) {
    waarschuwingen.push(`gesprek ${g.id} ("${g.met}") komt nooit beschikbaar`)
  }
}

// ── 5. De ontknoping moet te onderbouwen zijn ─────────────────
const dragend = [zaak.dader.bewijsA, zaak.dader.bewijsB, zaak.dader.bewijsC]

for (const [naam, id] of [['A', dragend[0]], ['B', dragend[1]], ['C', dragend[2]]]) {
  eis(bewijsIds.has(id), `sluitend bewijs ${naam} bestaat niet: ${id}`)
  eis(t.verzameld.includes(id), `sluitend bewijs ${naam} (${id}) is niet te vinden`)
}

eis(new Set(dragend).size === 3, 'de drie sluitende bewijsstukken zijn niet alle drie anders')
eis(
  zaak.verdachten.includes(zaak.dader.persoon),
  `de dader (${zaak.dader.persoon}) staat niet tussen de verdachten -- hij is niet aan te wijzen`,
)
for (const id of zaak.verdachten) {
  eis(
    zaak.personen.some((p) => p.id === id),
    `verdachte ${id} bestaat niet als persoon`,
  )
}

// Ook dit op de echte motor: een typefout in dader.bewijsA moet hier
// stukgaan en niet pas als een speler na drie uur op 'Dien in' drukt.
const beschuldigPad = resolve(hier, '..', 'src', 'engine', 'beschuldiging.ts')
const { beoordeel } = await import(pathToFileURL(beschuldigPad).href)

eis(
  beoordeel(zaak, zaak.dader.persoon, dragend).einde === 'sluitend',
  'de drie dragende stukken leveren geen sluitend einde op',
)
eis(
  beoordeel(zaak, zaak.dader.persoon, [dragend[0], dragend[1], zaak.bewijs[0].id])
    .einde === 'zwak' || dragend.includes(zaak.bewijs[0].id),
  'zwak bewijs bij de juiste dader levert geen zwak einde op',
)
const iemandAnders = zaak.verdachten.find((id) => id !== zaak.dader.persoon)
eis(
  beoordeel(zaak, iemandAnders, dragend).einde === 'mis',
  'de verkeerde aanwijzen levert geen mis-einde op',
)

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
