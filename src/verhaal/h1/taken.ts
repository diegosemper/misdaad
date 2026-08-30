import type { Taak } from '../types.ts'

/* ─────────────────────────────────────────────────────────────
   DE TAKENLIJST

   Dit is het verschil tussen "ik weet niet wat ik moet doen" en "nog
   even dit". De lijst staat altijd in beeld en werkt bij zodra je iets
   vindt -- je ziet een regel doorstreept worden op het moment dat je een
   draadje legt.

   Twee regels bij het schrijven:

   1. Een taak is een vraag of een doel, nooit een instructie. "Ga na of
      Joost de tijd had" mag. "Verbind de kassa-uitdraai met de verklaring
      van Marloes" is het spel voor de speler spelen.

   2. Niet elk verband krijgt een taak. De dragende lijn staat erop plus
      een enkel zijspoor; de rest mag je zelf vinden. Een lijst waar
      álles op staat is geen onderzoek meer maar een boodschappenlijstje.

   Taken van eerdere fases die nog openstaan blijven zichtbaar, met hun
   fasenummer erbij. Je mag ze laten liggen -- ze houden je nergens tegen.
   ───────────────────────────────────────────────────────────── */

export const taken: Taak[] = [
  /* ── Fase 1: de laatste avond ────────────────────────────── */
  {
    id: 't-laatste-bericht',
    laag: 1,
    tekst: 'Zoek uit wat het laatste is dat ze aan iemand geschreven heeft',
    klaarBij: ['b-sanne-2214'],
  },
  {
    id: 't-laatst-gezien',
    laag: 1,
    tekst: 'Stel vast wanneer en waar ze voor het laatst is gezien',
    klaarBij: ['d-camera-2312'],
  },
  {
    id: 't-uur-alleen',
    laag: 1,
    tekst: 'Reconstrueer wat ze deed nadat ze Sanne wegstuurde',
    klaarBij: ['v-alleen'],
  },
  {
    id: 't-fiets',
    laag: 1,
    tekst: 'Verklaar hoe haar fiets aan de Bemmelseweg terechtkwam',
    klaarBij: ['v-fiets'],
  },
  {
    id: 't-dorp',
    laag: 1,
    tekst: 'Ga na waarop het dorp zijn verdenking baseert',
    klaarBij: ['v-rachid-aangewezen'],
  },
  {
    id: 't-rugzak',
    laag: 1,
    tekst: 'Zoek uit wat er met haar rugzak is gebeurd',
    klaarBij: ['v-rugzak'],
  },

  /* ── Fase 2: de tijdlijn ─────────────────────────────────── */
  {
    id: 't-masten',
    laag: 2,
    tekst: 'Volg haar telefoon door de mastgegevens heen',
    klaarBij: ['d-mast-marit'],
  },
  {
    id: 't-alibi-tim',
    laag: 2,
    tekst: 'Toets het alibi van Tim Wielinga',
    klaarBij: ['v-alibi-tim'],
  },
  {
    id: 't-alibi-rachid',
    laag: 2,
    tekst: 'Toets het alibi van Rachid El Amrani',
    klaarBij: ['v-alibi-rachid'],
  },
  {
    id: 't-kolkweg-hoe',
    laag: 2,
    tekst: 'Verklaar hoe ze in zes minuten een kilometer buiten het dorp kwam',
    klaarBij: ['v-niet-gaan-lopen'],
  },
  {
    id: 't-waar-heen',
    laag: 2,
    tekst: 'Zoek uit waar ze om half elf naartoe ging',
    klaarBij: ['v-steegje'],
  },
  {
    id: 't-hulp',
    laag: 2,
    tekst: 'Ga na wie ze die avond nog om hulp heeft gevraagd',
    klaarBij: ['v-hulpvraag'],
  },

  /* ── Fase 3: Het Anker ───────────────────────────────────── */
  {
    id: 't-gewist',
    laag: 3,
    tekst: 'Lees wat het NFI uit het toestel heeft teruggehaald',
    klaarBij: ['b-joost-gewist'],
  },
  {
    id: 't-joost-verklaring',
    laag: 3,
    tekst: 'Leg de verklaring van Joost Bakker naast zijn eigen berichten',
    klaarBij: ['v-joost-liegt'],
  },
  {
    id: 't-joost-tijd',
    laag: 3,
    tekst: 'Ga na of Joost Bakker die nacht de tijd had',
    klaarBij: ['v-joost-alibi'],
  },
  {
    id: 't-sinds-wanneer',
    laag: 3,
    tekst: 'Stel vast sinds wanneer dit speelt, en hoe oud ze toen was',
    klaarBij: ['v-zestien'],
  },
  {
    id: 't-notities',
    laag: 3,
    tekst: 'Kom in de beveiligde notitie-app — zij koos die code zelf',
    klaarBij: ['slot-notities'],
  },

  /* ── Fase 4: wie wist het en deed niets ──────────────────── */
  {
    id: 't-lijst',
    laag: 4,
    tekst: 'Zoek uit of ze de eerste was',
    klaarBij: ['v-niet-de-eerste'],
  },
  {
    id: 't-verteld',
    laag: 4,
    tekst: 'Zoek uit aan welke volwassene ze het verteld heeft',
    klaarBij: ['v-ruud-wist-het'],
  },
  {
    id: 't-gunningen',
    laag: 4,
    tekst: 'Ga na wat Kolthof Bouw dit jaar aan opdrachten heeft gekregen',
    klaarBij: ['v-verkocht'],
  },
  {
    id: 't-boekhouding',
    laag: 4,
    tekst: 'Vraag na of iemand binnen het bedrijf iets is opgevallen',
    klaarBij: ['v-boekhouding'],
  },
  {
    id: 't-dylan',
    laag: 4,
    tekst: 'Lees wat Dylan haar die zondagochtend schreef',
    klaarBij: ['v-bus-twee-keer'],
  },

  /* ── Fase 5: de achtentachtig minuten ────────────────────── */
  {
    id: 't-mast-ruud',
    laag: 5,
    tekst: 'Vorder de mastgegevens van Ruud Kolthof',
    klaarBij: ['d-mast-ruud'],
  },
  {
    id: 't-88',
    laag: 5,
    tekst: 'Leg die achtentachtig minuten naast wat hij zelf verklaard heeft',
    klaarBij: ['v-88-minuten'],
  },
  {
    id: 't-ineke',
    laag: 5,
    tekst: 'Neem de buurvrouw alsnog serieus',
    klaarBij: ['v-bus-schoonspuiten'],
  },
  {
    id: 't-stort',
    laag: 5,
    tekst: 'Zoek uit wat er maandagochtend om half zeven aan de Kolkweg gebeurde',
    klaarBij: ['v-kolkweg'],
  },
  {
    id: 't-zoekactie',
    laag: 5,
    tekst: 'Ga na waarom er nooit op de Kolkweg is gezocht',
    klaarBij: ['v-zoekactie-weggestuurd'],
  },
]
