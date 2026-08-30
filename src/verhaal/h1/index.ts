import type { Hoofdstuk } from '../types.ts'
import { personen } from './personen.ts'
import { apps } from './apps.ts'
import { bewijs } from './bewijs.ts'
import { verbanden } from './verbanden.ts'
import { sloten } from './sloten.ts'
import { lagen } from './lagen.ts'

import { sanne } from './gesprekken/sanne.ts'
import { tim } from './gesprekken/tim.ts'
import { mama } from './gesprekken/mama.ts'
import { buurtapp } from './gesprekken/buurtapp.ts'
import { nadia } from './gesprekken/nadia.ts'

/* Alles bij elkaar. Een tweede hoofdstuk is straks een map hiernaast met
   precies dit bestand erin, en één regel in src/verhaal/index.ts. */

export const hoofdstuk1: Hoofdstuk = {
  id: 'h1',
  titel: 'Westerveld',
  personen,
  apps,
  bewijs,
  gesprekken: [sanne, tim, mama, buurtapp, nadia],
  verbanden,
  sloten,
  lagen,

  /* Waar je mee begint: vier apps, vier gesprekken en de stukken die de
     recherche in de eerste zestien uur zelf al had. De rest verdien je. */
  begin: [
    'app-berichten',
    'app-fotos',
    'app-oproepen',
    'app-dossier',

    'g-sanne',
    'g-tim',
    'g-mama',
    'g-buurtapp',

    'd-melding',
    'd-signalement',
    'd-fiets',
    'd-camera-2312',

    'f-selfie-1938',
    'f-botsauto',
    'f-zweefmolen',

    'o-2119-sanne',
    'o-2319-mama',
    'o-2324-ruud',
    'o-0912-ellen',
  ],

  dader: {
    persoon: 'ruud',
    bewijsA: 'd-mast-ruud',
    bewijsB: 'd-verklaring-ineke-2',
    bewijsC: 'n-boodschappen',
  },
}
