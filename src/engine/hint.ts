/* ─────────────────────────────────────────────────────────────
   HINTS

   Drie stappen, en je vraagt ze zelf op. Wie vastloopt hoort niet
   urenlang vast te zitten, en wie het zelf wil vinden hoeft ze nooit te
   zien.

   De opbouw is met opzet zo:

   1. Een duwtje. Waar moet je kijken, of wat voor soort verband is dit.
      Genoeg om verder te komen zonder dat het iets weggeeft.
   2. De richting. Eén van de twee stukken bij naam, of de app waar het
      in ligt.
   3. Het antwoord. Beide stukken bij naam, of precies welk stuk je zoekt.

   Wat een hint nooit doet is de code van een slot noemen. Die staat
   letterlijk in materiaal dat je al hebt; de derde hint zegt in wélk
   stuk, en daarmee is het overtypen.

   De teksten worden uit de zaak zelf afgeleid en niet apart geschreven.
   Dat is bewust: hints die je met de hand bijhoudt lopen na de eerste
   wijziging in de verbanden meteen achter, en dan sturen ze je verkeerd.
   ───────────────────────────────────────────────────────────── */

import type { Bewijs, Hoofdstuk, Slot, Verband } from '../verhaal/types.ts'
import type { Toestand } from './zaak.ts'
import { heeft, huidigeTaak } from './zaak.ts'

/**
 * Een titel netjes aanhalen.
 *
 * Sommige bewijsstukken heten al iets met aanhalingstekens erin --
 * '"ik moet nog iets doen"' bijvoorbeeld. Daar nog een setje omheen
 * zetten levert een dubbele op, en dat leest als een fout.
 */
function noem(titel: string): string {
  return /^["“‘']/.test(titel) ? titel : `"${titel}"`
}

/** Waar ligt dit bewijsstuk? Voor de tweede hint. */
function waar(h: Hoofdstuk, stuk: Bewijs): string | null {
  if (stuk.app) {
    const app = h.apps.find((a) => a.id === stuk.app)
    return app ? `de app ${app.naam}` : null
  }
  for (const gesprek of h.gesprekken) {
    if (gesprek.berichten.some((b) => b.levert?.includes(stuk.id))) {
      return `het gesprek met ${gesprek.met}`
    }
  }
  return null
}

function overBewijs(h: Hoofdstuk, id: string): string[] {
  const stuk = h.bewijs.find((b) => b.id === id)
  if (!stuk) return []
  const plek = waar(h, stuk)
  return [
    'Je mist hier nog een stuk voor. Het ligt in de werkomgeving, niet op je bord.',
    plek ? `Kijk in ${plek}.` : 'Loop de apps nog eens langs.',
    `Je zoekt: ${noem(stuk.titel)}.`,
  ]
}

function overSlot(h: Hoofdstuk, slot: Slot): string[] {
  const bron = h.bewijs.find((b) => b.id === slot.hintIn)
  return [
    'Hier moet een code ingevuld worden. Die staat ergens in materiaal dat je al hebt.',
    slot.duwtje,
    bron
      ? `De code staat letterlijk in ${noem(bron.titel)}.`
      : 'De code staat letterlijk in het dossier.',
  ]
}

function overVerband(h: Hoofdstuk, t: Toestand, v: Verband): string[] {
  const a = h.bewijs.find((b) => b.id === v.van)
  const b = h.bewijs.find((x) => x.id === v.naar)
  if (!a || !b) return []

  // Ligt er nog iets niet op je bord, dan is dát het probleem, en niet
  // de vraag welke twee bij elkaar horen.
  const ontbreekt = [v.van, v.naar].find((id) => !t.verzameld.includes(id))
  if (ontbreekt) return overBewijs(h, ontbreekt)

  // Het eerste duwtje leiden we af uit wat de twee stukken gemeen
  // hebben. Dat is precies wat een rechercheur zou opvallen.
  let duwtje =
    'Twee stukken op je bord zeggen samen meer dan los. Lees ze allebei nog eens.'
  if (a.tijd && b.tijd) {
    duwtje = `Let op de tijden. Twee stukken op je bord liggen rond ${a.tijd} en ${b.tijd}.`
  } else if (a.soort === b.soort) {
    duwtje = `Twee stukken van dezelfde soort (${a.soort}) spreken elkaar tegen of vullen elkaar aan.`
  } else if (a.dag && b.dag && a.dag === b.dag) {
    duwtje = `Twee stukken van ${a.dag} horen bij elkaar.`
  }

  return [
    duwtje,
    `Een van de twee is ${noem(a.titel)}.`,
    `Koppel ${noem(a.titel)} aan ${noem(b.titel)}.`,
  ]
}

/**
 * De hints voor de opdracht die nu op het scherm staat.
 *
 * Altijd drie, of niets als er niets te hinten valt. De speler bepaalt
 * zelf hoeveel hij er van ziet.
 */
export function hints(h: Hoofdstuk, t: Toestand): string[] {
  const taak = huidigeTaak(h, t)
  if (!taak) return []

  for (const doel of taak.klaarBij) {
    if (heeft(t, doel)) continue

    const slot = h.sloten.find((s) => s.id === doel)
    if (slot) return overSlot(h, slot)

    const verband = h.verbanden.find((v) => v.id === doel)
    if (verband) return overVerband(h, t, verband)

    return overBewijs(h, doel)
  }

  return []
}
