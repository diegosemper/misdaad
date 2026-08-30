import type { App } from '../types.ts'

/* Wat je voor je hebt is geen telefoon van een slachtoffer maar de
   werkomgeving van een rechercheur: links de uitgelezen gegevens van
   Marits toestel, rechts het dossier dat de recherche zelf aanlegt.
   Eén metafoor, alles op dezelfde plek.

   Apps met een slot staan er vanaf het begin bij. Dat is met opzet: een
   deur waarvan je weet dat hij dicht is, is een doel. */

export const apps: App[] = [
  {
    id: 'app-berichten',
    naam: 'Berichten',
    teken: '💬',
    soort: 'gesprekken',
    onderschrift: 'Uitlezing toestel M. de Vries — chatverkeer',
  },
  {
    id: 'app-fotos',
    naam: "Foto's",
    teken: '🖼',
    soort: 'stukken',
    onderschrift: 'Uitlezing toestel M. de Vries — beeldmateriaal',
  },
  {
    id: 'app-oproepen',
    naam: 'Oproepen',
    teken: '📞',
    soort: 'stukken',
    onderschrift: 'Belgeschiedenis 11–12 oktober',
  },
  {
    id: 'app-notities',
    naam: 'Notities',
    teken: '📝',
    soort: 'stukken',
    onderschrift: 'Uitlezing toestel M. de Vries — notitie-app',
    slot: 'slot-notities',
  },
  {
    id: 'app-dossier',
    naam: 'Dossier',
    teken: '📁',
    soort: 'stukken',
    onderschrift: 'Zaak 2026-0417 — stukken en rapporten',
  },
  {
    id: 'app-verhoren',
    naam: 'Verhoren',
    teken: '🎙',
    soort: 'stukken',
    onderschrift: 'Uitgewerkte gespreksverslagen',
  },
]
