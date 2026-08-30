import type { Laag } from '../types.ts'

/* ─────────────────────────────────────────────────────────────
   DE LAGEN

   Hoofdstuk 1 is geen doorlopend verhaal maar vijf keer dezelfde lus:
   zoeken, verbinden, iets openen. Een laag gaat pas open als je de
   verbanden hebt die ertoe doen -- niet als je genoeg kaartjes hebt.
   Verzamelen is makkelijk, verbanden leggen is het werk.

   `eist` noemt alleen de dragende verbanden. De rest van een laag mag je
   overslaan; wie alles legt heeft een completer beeld, maar niemand komt
   vast te zitten omdat hij één zijspoor niet gevonden heeft.
   ───────────────────────────────────────────────────────────── */

export const lagen: Laag[] = [
  {
    nr: 1,
    titel: 'De laatste avond',
    eist: [],
    opent: [],
    opdracht:
      'Zestien uur na de melding. Je hebt haar telefoon, een fiets in een sloot en ' +
      'een dorp dat al weet wie het gedaan heeft. Zoek uit wat zij die avond deed, ' +
      'en met wie ze sprak.',
  },
  {
    nr: 2,
    titel: 'De tijdlijn',
    eist: ['v-alleen', 'v-fiets', 'v-rachid-aangewezen'],
    opent: ['d-mast-marit', 'd-verklaring-tim'],
    opdracht:
      'De telecomgegevens zijn binnen. Leg haar laatste uur naast wat de getuigen ' +
      'zeggen, en streep weg wie er aantoonbaar niet bij kan zijn geweest.',
  },
]
