/* ─────────────────────────────────────────────────────────────
   DE MOTOR

   Alles hier is een gewone functie: toestand erin, nieuwe toestand eruit.
   Geen React, geen opslag, geen schermen. Dat is met opzet: de regels van
   het onderzoek moeten los te lezen en los te controleren zijn, en
   scripts/controleer.mjs speelt de zaak met deze zelfde begrippen na.

   De hele voortgang is vijf lijstjes id's. Meer is er niet, en dat is de
   reden dat een opgeslagen spel nooit stukgaat op een nieuwe bouw: er zit
   niets in wat aan de code vastzit.
   ───────────────────────────────────────────────────────────── */

import type { Hoofdstuk, Laag, Taak, Verband } from '../verhaal/types.ts'

export type Toestand = {
  /** Id's van apps, gesprekken en bewijs die in het apparaat te vinden zijn. */
  beschikbaar: string[]
  /** Bewijs-id's die als kaartje op het bord liggen. */
  verzameld: string[]
  /** Verband-id's die de speler gelegd heeft. */
  gelegd: string[]
  /** Slot-id's die open zijn. */
  gekraakt: string[]
  /** Gesprek-id's die de speler geopend heeft. Alleen voor het bolletje. */
  geopend: string[]
  /** Hoe ver het onderzoek is. */
  laag: number
}

export type Melding =
  | { soort: 'verband'; verband: Verband; nieuw: string[] }
  | { soort: 'geen-verband' }
  | { soort: 'al-gelegd'; verband: Verband }
  | { soort: 'slot-open'; naam: string; nieuw: string[] }
  | { soort: 'slot-fout' }
  | { soort: 'opgepakt'; titel: string }
  | { soort: 'laag'; laag: Laag }

export type Uitkomst = {
  toestand: Toestand
  meldingen: Melding[]
}

export function beginToestand(h: Hoofdstuk): Toestand {
  return {
    beschikbaar: [...h.begin],
    verzameld: [],
    gelegd: [],
    gekraakt: [],
    geopend: [],
    laag: 1,
  }
}

/* ── Hulpjes ─────────────────────────────────────────────────── */

function metErbij(lijst: string[], ids: string[]): string[] {
  const uit = [...lijst]
  for (const id of ids) if (!uit.includes(id)) uit.push(id)
  return uit
}

/** Wat van deze id's is nog niet beschikbaar? */
function watNieuwIs(t: Toestand, ids: string[] | undefined): string[] {
  return (ids ?? []).filter((id) => !t.beschikbaar.includes(id))
}

/**
 * Na elke handeling kijken of er een laag opengaat.
 *
 * Dit staat apart omdat het na álles moet gebeuren -- een slot kraken kan
 * net zo goed de laatste voorwaarde zijn als een draadje leggen. Eén keer
 * per handeling is niet genoeg: laag 3 kan de voorwaarde van laag 4 al
 * meebrengen, dus we blijven doorlopen tot er niets meer verandert.
 */
function controleerLagen(h: Hoofdstuk, t: Toestand): Uitkomst {
  const meldingen: Melding[] = []
  let toestand = t
  let veranderd = true

  while (veranderd) {
    veranderd = false
    for (const laag of h.lagen) {
      if (laag.nr <= toestand.laag) continue
      if (laag.nr !== toestand.laag + 1) continue

      const gehaald = laag.eist.every(
        (id) =>
          toestand.gelegd.includes(id) ||
          toestand.gekraakt.includes(id) ||
          toestand.verzameld.includes(id),
      )
      if (!gehaald) continue

      toestand = {
        ...toestand,
        laag: laag.nr,
        beschikbaar: metErbij(toestand.beschikbaar, laag.opent),
      }
      meldingen.push({ soort: 'laag', laag })
      veranderd = true
    }
  }

  return { toestand, meldingen }
}

/* ── De drie handelingen ─────────────────────────────────────── */

/** Een bewijsstuk oppakken en op het bord leggen. */
export function pakOp(h: Hoofdstuk, t: Toestand, bewijsId: string): Uitkomst {
  if (t.verzameld.includes(bewijsId)) return { toestand: t, meldingen: [] }

  const stuk = h.bewijs.find((b) => b.id === bewijsId)
  if (!stuk) return { toestand: t, meldingen: [] }

  const na: Toestand = {
    ...t,
    verzameld: [...t.verzameld, bewijsId],
    beschikbaar: metErbij(t.beschikbaar, [bewijsId]),
  }

  const gevolg = controleerLagen(h, na)
  return {
    toestand: gevolg.toestand,
    meldingen: [{ soort: 'opgepakt', titel: stuk.titel }, ...gevolg.meldingen],
  }
}

/** Twee kaartjes aan elkaar knopen. De volgorde maakt niet uit. */
export function verbind(h: Hoofdstuk, t: Toestand, a: string, b: string): Uitkomst {
  const verband = h.verbanden.find(
    (v) => (v.van === a && v.naar === b) || (v.van === b && v.naar === a),
  )

  if (!verband) return { toestand: t, meldingen: [{ soort: 'geen-verband' }] }
  if (t.gelegd.includes(verband.id)) {
    return { toestand: t, meldingen: [{ soort: 'al-gelegd', verband }] }
  }

  const nieuw = watNieuwIs(t, verband.opent)
  const na: Toestand = {
    ...t,
    gelegd: [...t.gelegd, verband.id],
    beschikbaar: metErbij(t.beschikbaar, verband.opent ?? []),
  }

  const gevolg = controleerLagen(h, na)
  return {
    toestand: gevolg.toestand,
    meldingen: [{ soort: 'verband', verband, nieuw }, ...gevolg.meldingen],
  }
}

/** Een code intypen. */
export function kraak(h: Hoofdstuk, t: Toestand, slotId: string, code: string): Uitkomst {
  const slot = h.sloten.find((s) => s.id === slotId)
  if (!slot) return { toestand: t, meldingen: [] }
  if (t.gekraakt.includes(slotId)) return { toestand: t, meldingen: [] }

  // Spaties en hoofdletters vergeven we; een code overtypen van een foto
  // moet geen typwedstrijd worden.
  const getypt = code.replace(/\s+/g, '').toLowerCase()
  const juist = slot.code.replace(/\s+/g, '').toLowerCase()
  if (getypt !== juist) return { toestand: t, meldingen: [{ soort: 'slot-fout' }] }

  const nieuw = watNieuwIs(t, slot.opent)
  const na: Toestand = {
    ...t,
    gekraakt: [...t.gekraakt, slotId],
    beschikbaar: metErbij(t.beschikbaar, slot.opent),
  }

  const gevolg = controleerLagen(h, na)
  return {
    toestand: gevolg.toestand,
    meldingen: [{ soort: 'slot-open', naam: slot.naam, nieuw }, ...gevolg.meldingen],
  }
}

/** Een gesprek openen. Alleen om het ongelezen-bolletje weg te halen. */
export function markeerGelezen(t: Toestand, gesprekId: string): Toestand {
  if (t.geopend.includes(gesprekId)) return t
  return { ...t, geopend: [...t.geopend, gesprekId] }
}

/* ── Vragen die de schermen stellen ──────────────────────────── */

export function isBeschikbaar(t: Toestand, id: string): boolean {
  return t.beschikbaar.includes(id)
}

export function huidigeLaag(h: Hoofdstuk, t: Toestand): Laag {
  return h.lagen.find((l) => l.nr === t.laag) ?? h.lagen[0]
}

/** De conclusies die op het bord liggen, in de volgorde waarin je ze legde. */
export function conclusies(h: Hoofdstuk, t: Toestand): Verband[] {
  return t.gelegd
    .map((id) => h.verbanden.find((v) => v.id === id))
    .filter((v): v is Verband => v !== undefined)
}

/** Heeft de speler dit id binnen, op welke manier dan ook? */
export function heeft(t: Toestand, id: string): boolean {
  return t.gelegd.includes(id) || t.gekraakt.includes(id) || t.verzameld.includes(id)
}

/**
 * De takenlijst zoals hij nu op het scherm hoort te staan.
 *
 * Taken van eerdere fases die nog openstaan blijven erbij, met hun eigen
 * fasenummer. Ze houden niemand tegen -- je mag ze laten liggen -- maar
 * ze verdwijnen niet stiekem uit beeld, want dan lijkt het alsof je iets
 * gemist hebt zonder te weten wat.
 */
export function taken(h: Hoofdstuk, t: Toestand): { open: Taak[]; af: Taak[] } {
  const zichtbaar = h.taken.filter((taak) => taak.laag <= t.laag)
  const isAf = (taak: Taak) => taak.klaarBij.every((id) => heeft(t, id))
  return {
    open: zichtbaar.filter((taak) => !isAf(taak)),
    af: zichtbaar.filter(isAf),
  }
}

/**
 * Hoeveel van de zaak is af?
 *
 * Bewust op verbanden gebaseerd en niet op bewijs: bewijs verzamelen is
 * makkelijk, verbanden leggen is het werk.
 */
export function vordering(h: Hoofdstuk, t: Toestand): number {
  if (h.verbanden.length === 0) return 0
  return Math.round((t.gelegd.length / h.verbanden.length) * 100)
}

/** Mag de speler een dader aanwijzen? Pas na de laatste laag. */
export function magBeschuldigen(h: Hoofdstuk, t: Toestand): boolean {
  return t.laag >= Math.max(...h.lagen.map((l) => l.nr))
}
