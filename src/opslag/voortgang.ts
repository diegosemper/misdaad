/* ─────────────────────────────────────────────────────────────
   VOORTGANG BEWAREN

   Je speelt hier uren aan, dus dit moet gewoon werken. Twee regels:

   1. We slaan alleen id's op, nooit iets wat aan de code vastzit. Een
      nieuwe bouw kan een opgeslagen spel daardoor niet stukmaken.
   2. Alles wat er uitkomt wordt nagekeken voor we het gebruiken. Een
      kapotte opslag mag het spel niet laten vastlopen -- dan beginnen we
      liever opnieuw dan dat je op een wit scherm staart.

   localStorage kan in een privé-venster of met geblokkeerde site-gegevens
   zelfs bij het uitlezen al een fout gooien, vandaar dat élke aanraking
   binnen een try staat.
   ───────────────────────────────────────────────────────────── */

import type { Toestand } from '../engine/zaak.ts'

const SLEUTEL = 'misdaad.h1'
const VORM = 1

type Bewaard = {
  vorm: number
  toestand: Toestand
}

function isLijstVanTekst(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((i) => typeof i === 'string')
}

function isToestand(x: unknown): x is Toestand {
  if (typeof x !== 'object' || x === null) return false
  const t = x as Record<string, unknown>
  return (
    isLijstVanTekst(t.beschikbaar) &&
    isLijstVanTekst(t.verzameld) &&
    isLijstVanTekst(t.gelegd) &&
    isLijstVanTekst(t.gekraakt) &&
    isLijstVanTekst(t.geopend) &&
    typeof t.laag === 'number'
  )
}

export function laad(): Toestand | null {
  try {
    const rauw = localStorage.getItem(SLEUTEL)
    if (!rauw) return null
    const bewaard = JSON.parse(rauw) as Partial<Bewaard>
    if (bewaard.vorm !== VORM) return null
    if (!isToestand(bewaard.toestand)) return null
    return bewaard.toestand
  } catch {
    return null
  }
}

export function bewaar(toestand: Toestand): void {
  try {
    localStorage.setItem(SLEUTEL, JSON.stringify({ vorm: VORM, toestand }))
  } catch {
    // Vol, privé-venster, of site-gegevens geblokkeerd. Dan speel je door
    // zonder dat het bewaard wordt -- vervelend, maar geen reden om het
    // spel te onderbreken.
  }
}

export function wis(): void {
  try {
    localStorage.removeItem(SLEUTEL)
  } catch {
    // Zie hierboven.
  }
}
