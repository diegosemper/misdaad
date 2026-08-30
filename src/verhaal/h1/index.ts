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
import { joost } from './gesprekken/joost.ts'
import { dylan } from './gesprekken/dylan.ts'

/* Alles bij elkaar. Een tweede hoofdstuk is straks een map hiernaast met
   precies dit bestand erin, en één regel in src/verhaal/index.ts. */

export const hoofdstuk1: Hoofdstuk = {
  id: 'h1',
  titel: 'Westerveld',
  personen,
  apps,
  bewijs,
  gesprekken: [sanne, tim, mama, buurtapp, nadia, joost, dylan],
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

  /* Wie je mag aanwijzen. Ellen en Sanne staan er bewust bij: een lijst
     waarop alleen de verdachten staan is zelf al een aanwijzing. */
  verdachten: ['joost', 'ruud', 'tim', 'rachid', 'dylan', 'ellen', 'sanne', 'wouter'],

  dader: {
    persoon: 'ruud',
    bewijsA: 'd-mast-ruud',
    bewijsB: 'd-verklaring-ineke-2',
    bewijsC: 'n-boodschappen',
  },

  eindes: {
    sluitend: {
      titel: 'De Kolkweg',
      tekst:
        'Op donderdagochtend staat er een graafmachine op de Kolkweg. Het beton van ' +
        'maandag moet er eerst af. Dat duurt tot kwart over elf.\n\n' +
        'Ze ligt in de sleuf voor de fundering, op haar zij, met haar rugzak nog om. In ' +
        'de rugzak zitten een oplader, een setje schone kleren, tweehonderdveertig euro ' +
        'en een uitgeprinte routebeschrijving naar het politiebureau in Zutphen — bij ' +
        'haar vader in de buurt, niet hier. Ze was van plan geweest om na dat gesprek ' +
        'niet meer thuis te komen.\n\n' +
        'Ruud Kolthof bekent op de vierde dag, als hem de achtentachtig minuten voor de ' +
        'zevende keer worden voorgehouden. Hij zegt dat hij haar niet heeft willen ' +
        'doden. Dat is waarschijnlijk waar en het maakt niets uit. Hij zegt ook dat hij ' +
        'twintig minuten in de auto heeft gezeten voordat hij uitstapte, en dat ze toen ' +
        'nog ademde. Daar zegt hij verder niets over.\n\n' +
        'Joost Bakker wordt drie weken later aangehouden. Er melden zich uiteindelijk ' +
        'vier vrouwen, van wie er drie minderjarig waren. Twee ervan stonden in Marits ' +
        'lijst.\n\n' +
        'Wouter Prins treedt af wegens een gunningskwestie. In de plaatselijke krant ' +
        'staat dat hij "de schijn tegen had".\n\n' +
        'Café-zaal \'t Anker gaat in januari weer open onder een andere naam. Ineke Slot ' +
        'wordt door niemand uit het dorp gebeld.\n\n' +
        'Ze had het aan één volwassene verteld. Die ene heeft er vier maanden lang niets ' +
        'mee gedaan, en toen zij dat niet langer accepteerde, heeft hij haar in een ' +
        'sleuf gelegd waar hij de volgende ochtend zelf bij het beton stond.',
    },
    zwak: {
      titel: 'Onvoldoende',
      tekst:
        'Je hebt de juiste man. Je krijgt hem niet.\n\n' +
        'De officier leest het dossier twee keer en schuift het terug over tafel. Een ' +
        'telefoon die uit heeft gestaan is geen misdrijf. Een buurvrouw die iemand zijn ' +
        'bus ziet wassen is geen getuige, zeker niet déze buurvrouw. En zonder lichaam ' +
        'is er geen plaats delict, geen tijdstip en geen doodsoorzaak.\n\n' +
        'Ruud Kolthof gaat na negen dagen naar huis. Hij loopt in november nog mee met ' +
        'de laatste zoekactie, in het bos, met een hesje aan.\n\n' +
        'De Kolkweg wordt in maart opgeleverd. Er komt een parkeerterrein overheen, ' +
        'zesenveertig plaatsen, met een bord waarop staat dat het project mede mogelijk ' +
        'is gemaakt door de gemeente Westerveld.\n\n' +
        'Ellen de Vries verhuist in het voorjaar naar Zutphen. Ze is dan al vier maanden ' +
        'niet meer met Ruud getrouwd, maar ze heeft nooit gezegd waarom.\n\n' +
        'Het dossier blijft open. Elk jaar in oktober belt er iemand van het cold ' +
        'caseteam met Sanne Bosma, om te vragen of haar nog iets te binnen is geschoten.',
    },
    mis: {
      titel: 'Opgelucht',
      tekst:
        'Je hebt {naam} aangewezen.\n\n' +
        'Het dorp is opgelucht. Eindelijk een naam, eindelijk een gezicht, eindelijk ' +
        'iemand anders. In de buurtapp staat binnen een uur dat ze het altijd al hadden ' +
        'geweten.\n\n' +
        'De zaak houdt het niet. Bij de rechter-commissaris valt hij binnen zes weken ' +
        'uit elkaar, en tegen die tijd kijkt niemand meer. Wat er van {naam} overblijft ' +
        'nadat de zaak is geseponeerd, blijft over.\n\n' +
        'Ruud Kolthof zit bij de persconferentie op de eerste rij, naast Ellen. Hij legt ' +
        'zijn hand op haar rug als ze het niet meer kan. Op de foto in de krant ziet dat ' +
        'eruit zoals het eruit hoort te zien.\n\n' +
        'Marit ligt anderhalve meter onder een parkeerterrein dat in maart wordt ' +
        'opgeleverd. Ze is nooit gevonden.\n\n' +
        'Ze had het aan één volwassene verteld.',
    },
  },
}
