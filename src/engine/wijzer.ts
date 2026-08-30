/* ─────────────────────────────────────────────────────────────
   DE WEGWIJZER

   Je weet wát je moet uitzoeken, maar niet waar je moet kijken. Dit
   rekent uit welke app en welk gesprek op dit moment de moeite waard
   zijn, zodat daar een kloppend stipje op kan.

   Waar het stopt is een keuze, geen gemakzucht:

   · Moet je nog iets vínden, dan wijst hij de app aan en het gesprek of
     het stuk erin. Binnen een gesprek wijst hij niets aan -- daar staat
     al een knop bij de regels die iets opleveren, en de rest moet je
     lezen. Dat lezen ís het spel.

   · Ligt alles wat je nodig hebt al op het bord, dan wijst hij het bord
     aan en verder niets. Wélke twee kaartjes aan elkaar horen zegt hij
     niet. Dat is de puzzel; die oplossen voor de speler zou het spel
     wegnemen in plaats van het toegankelijk maken.
   ───────────────────────────────────────────────────────────── */

import type { Hoofdstuk } from '../verhaal/types.ts'
import type { Toestand } from './zaak.ts'
import { heeft, huidigeTaak } from './zaak.ts'

export type Wijzer = {
  apps: string[]
  gesprekken: string[]
  /** Bewijs-id's die als regel in een lijst staan. */
  stukken: string[]
  /** Ga naar het bord: alles ligt er, er moet iets verbonden worden. */
  bord: boolean
}

const LEEG: Wijzer = { apps: [], gesprekken: [], stukken: [], bord: false }

export function wijzer(h: Hoofdstuk, t: Toestand): Wijzer {
  const taak = huidigeTaak(h, t)
  if (!taak) return LEEG

  const apps = new Set<string>()
  const gesprekken = new Set<string>()
  const stukken = new Set<string>()
  let bord = false

  /** Waar ligt dit bewijsstuk, en is het zichtbaar? */
  function wijsBewijsAan(id: string): void {
    if (t.verzameld.includes(id)) return

    const stuk = h.bewijs.find((b) => b.id === id)
    if (!stuk) return

    // In een app als los stuk.
    if (stuk.app) {
      if (!t.beschikbaar.includes(stuk.app)) return
      if (!t.beschikbaar.includes(id)) return
      apps.add(stuk.app)
      stukken.add(id)
      return
    }

    // Anders komt het uit een chatbericht.
    for (const gesprek of h.gesprekken) {
      const staatErin = gesprek.berichten.some((b) => b.levert?.includes(id))
      if (!staatErin) continue
      if (!t.beschikbaar.includes(gesprek.id)) continue
      if (!t.beschikbaar.includes(gesprek.app)) continue
      apps.add(gesprek.app)
      gesprekken.add(gesprek.id)
      return
    }
  }

  for (const doel of taak.klaarBij) {
    if (heeft(t, doel)) continue

    // Een slot: wijs de app aan waar het op zit.
    const slot = h.sloten.find((s) => s.id === doel)
    if (slot) {
      const app = h.apps.find((a) => a.slot === slot.id)
      if (app && t.beschikbaar.includes(app.id)) apps.add(app.id)
      continue
    }

    // Een verband: eerst de twee stukken, en pas als die er allebei
    // liggen wijzen we naar het bord.
    const verband = h.verbanden.find((v) => v.id === doel)
    if (verband) {
      const compleet =
        t.verzameld.includes(verband.van) && t.verzameld.includes(verband.naar)
      if (compleet) {
        bord = true
      } else {
        wijsBewijsAan(verband.van)
        wijsBewijsAan(verband.naar)
      }
      continue
    }

    // Anders is het een bewijsstuk dat je moet vinden.
    wijsBewijsAan(doel)
  }

  return {
    apps: [...apps],
    gesprekken: [...gesprekken],
    stukken: [...stukken],
    bord,
  }
}
