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

   De opdracht van elke laag is met opzet een vraag en geen instructie.
   Er staat nooit "verbind A met B" -- dat is precies het spel.
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
  {
    nr: 3,
    titel: "Het Anker",
    eist: ['v-alibi-rachid', 'v-alibi-tim', 'v-niet-gaan-lopen', 'v-steegje'],
    opent: ['g-joost', 'd-nfi-toestel', 'd-verklaring-joost-1'],
    opdracht:
      'Twintig minuten in een café waar ze niet hoefde te werken, en ze kwam er ' +
      'huilend uit. De uitlezing van het NFI is binnen, inclusief wat er gewist was. ' +
      'Zoek uit waarom ze daarheen ging.',
  },
  {
    nr: 4,
    titel: 'Wie wist het en deed niets',
    eist: ['v-joost-liegt', 'v-joost-alibi', 'v-niet-de-eerste'],
    opent: ['g-dylan'],
    opdracht:
      'Je hebt een man die alles heeft gedaan behalve dit. Haar notities zijn open. ' +
      'Zoek uit aan wie ze het verteld heeft, en wat die ermee gedaan heeft.',
  },
  {
    nr: 5,
    titel: 'De achtentachtig minuten',
    eist: ['v-ruud-wist-het', 'v-verkocht', 'v-bus-twee-keer'],
    opent: [],
    opdracht:
      'Eén telefoon in dit dorp is die nacht uitgegaan, en het was niet de hare. ' +
      'Maak het rond: waar hij was, wat hij daarna deed, en waarom hij het deed. ' +
      'Daarna mag je iemand aanwijzen.',
  },
]
