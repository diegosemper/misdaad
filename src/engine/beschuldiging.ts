/* ─────────────────────────────────────────────────────────────
   DE BESCHULDIGING

   Een naam noemen is niet genoeg. Je moet er drie bewijsstukken bij
   leggen, en die moeten de drie stukken zijn die de zaak écht sluitend
   maken. Wijs je de juiste man aan met zwak bewijs, dan haalt het geen
   rechter -- en dat is een eigen einde, geen half einde.
   ───────────────────────────────────────────────────────────── */

import type { Hoofdstuk } from '../verhaal/types.ts'

export type Oordeel = {
  /** De juiste persoon aangewezen? */
  juistePersoon: boolean
  /** Hoeveel van de drie sluitende stukken erbij lagen (0 t/m 3). */
  sterkte: number
  einde: 'sluitend' | 'zwak' | 'mis'
}

export function beoordeel(h: Hoofdstuk, persoon: string, bewijs: string[]): Oordeel {
  const juistePersoon = persoon === h.dader.persoon
  const nodig = [h.dader.bewijsA, h.dader.bewijsB, h.dader.bewijsC]
  const gekozen = new Set(bewijs)
  const sterkte = nodig.filter((id) => gekozen.has(id)).length

  const einde = !juistePersoon ? 'mis' : sterkte === 3 ? 'sluitend' : 'zwak'
  return { juistePersoon, sterkte, einde }
}
