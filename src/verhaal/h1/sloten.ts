import type { Slot } from '../types.ts'

/* ─────────────────────────────────────────────────────────────
   DE SLOTEN

   Een slot is het enige moment waarop de speler écht zelf iets moet
   bedenken in plaats van herkennen. Regel bij het schrijven: de code
   staat altijd letterlijk in materiaal dat de speler al heeft, en nooit
   in materiaal dat pas achter het slot vandaan komt. Dat laatste
   controleert scripts/controleer.mjs ook.
   ───────────────────────────────────────────────────────────── */

export const sloten: Slot[] = [
  {
    id: 'slot-notities',
    naam: 'Notitie-app',
    vraag:
      'De notitie-app op haar toestel is apart beveiligd met een zescijferige code. ' +
      'Het NFI is er niet doorheen gekomen. Zij heeft die code zelf gekozen.',
    code: '030309',
    hintIn: 'd-melding',
    duwtje:
      'Mensen kiezen een datum die ze nooit vergeten. Van Marit ligt er precies één ' +
      'datum in het dossier — op het meldingsformulier.',
    opent: ['n-boodschappen', 'n-14-juni', 'n-lijst'],
  },
]
