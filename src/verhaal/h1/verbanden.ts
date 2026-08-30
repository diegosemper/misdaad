import type { Verband } from '../types.ts'

/* ─────────────────────────────────────────────────────────────
   DE DRAADJES

   Een verband is pas een verband als de twee stukken samen iets zeggen
   wat ze los niet zeggen. Dat is de enige regel die ik bij het schrijven
   aanhoud: kun je de conclusie ook uit één van de twee halen, dan is het
   geen verband maar een herhaling, en dan hoort het hier niet.

   `opent` is waar de speeltijd vandaan komt. Elk draadje dat iets
   opent, geeft de speler een reden om terug te gaan naar de telefoon.
   ───────────────────────────────────────────────────────────── */

export const verbanden: Verband[] = [
  /* ── Laag 1: de laatste avond ────────────────────────────── */
  {
    id: 'v-alleen',
    van: 'b-sanne-2214',
    naar: 'd-camera-2312',
    conclusie:
      'Om 22:14 stuurt ze Sanne weg. Bijna een uur later staat ze nog steeds ' +
      'in het dorp, alleen, bij het hek — zonder fiets en zonder rugzak. Wat ze ' +
      '"nog moest doen" heeft haar dat hele uur gekost.',
    opent: ['d-buurtonderzoek'],
  },
  {
    id: 'v-fiets',
    van: 'd-fiets',
    naar: 'd-camera-2312',
    conclusie:
      'Op het camerabeeld loopt ze de Molenweg op, het dorp in. Haar fiets ligt ' +
      'anderhalve kilometer de andere kant op, in een natte berm, met schone banden ' +
      'en gepoetste trappers. Die fiets is daar niet gevallen. Die is daar neergelegd.',
    opent: ['app-verhoren', 'd-verklaring-sanne'],
  },
  {
    id: 'v-rachid-aangewezen',
    van: 'f-zweefmolen',
    naar: 'b-buurtapp-rachid',
    conclusie:
      'Binnen twee uur na de melding heeft het dorp een dader. Het bewijs is één ' +
      'onscherpe foto waarop iemand toevallig in de richting van de camera kijkt. ' +
      'Niemand in de groep kent zijn naam.',
    opent: ['d-verklaring-rachid', 'd-kassabon-zweefmolen'],
  },
  {
    id: 'v-rugzak',
    van: 'f-selfie-1938',
    naar: 'd-signalement',
    conclusie:
      'Ze had een zware rugzak bij zich die ze volgens Sanne nooit meenam als ze ' +
      'uitging. Op het camerabeeld van 23:12 heeft ze hem niet meer. De rugzak is ' +
      'nooit teruggevonden.',
  },
  {
    id: 'v-tim-ruzie',
    van: 'f-botsauto',
    naar: 'b-tim-dreiging',
    conclusie:
      'De jongen die om 21:02 haar arm vastpakt waar het halve dorp bij staat, ' +
      'stuurt haar tweeëntwintig minuten later dat ze er spijt van krijgt.',
    opent: ['d-verklaring-tim'],
  },
  {
    id: 'v-niemand-thuis',
    van: 'o-2319-mama',
    naar: 'b-mama-zondag',
    conclusie:
      'Om 23:19 belt ze haar moeder twee keer achter elkaar. Ellen ligt op de bank ' +
      'en hoort het niet. Tien uur later belt Ellen elf keer terug.',
  },

  /* ── Laag 2: de tijdlijn ─────────────────────────────────── */
  {
    id: 'v-alibi-rachid',
    van: 'd-verklaring-rachid',
    naar: 'd-kassabon-zweefmolen',
    conclusie:
      'Negentien ritten tussen tien en één, allemaal gestart met de sleutel die die ' +
      'avond aan één man was uitgegeven, met nooit meer dan elf minuten ertussen. ' +
      'Rachid El Amrani kan niet weg zijn geweest. Hij valt af.',
  },
  {
    id: 'v-alibi-tim',
    van: 'b-tim-dreiging',
    naar: 'd-verklaring-tim',
    conclusie:
      'Vanaf 22:47 staat Tims telefoon onafgebroken op de mast Dorpsstraat en liggen ' +
      'er drie getuigen die hem naar binnen hebben gedragen. Hij is een dronken ' +
      'achttienjarige met een grote mond. Hij valt af.',
  },
  {
    id: 'v-niet-gaan-lopen',
    van: 'd-mast-marit',
    naar: 'd-camera-2312',
    conclusie:
      'Om 23:41 hangt haar telefoon nog aan de mast Molenweg. Zes minuten later aan ' +
      'de mast Kolkweg, ruim een kilometer verderop in het buitengebied. Dat loop je ' +
      'niet in zes minuten. Ze is bij iemand ingestapt.',
    opent: ['d-verklaring-ineke-1', 'g-nadia'],
  },
  {
    id: 'v-telefoon-uit',
    van: 'd-mast-marit',
    naar: 'o-0912-ellen',
    conclusie:
      'Om 23:48 houdt elke registratie op. Vanaf dat moment komt er geen enkele ' +
      'oproep meer binnen, ook niet de elf van haar moeder. Haar telefoon is die nacht ' +
      'uitgegaan en nooit meer aangegaan.',
  },
  {
    id: 'v-steegje',
    van: 'd-verklaring-ineke-1',
    naar: 'b-sanne-2214',
    conclusie:
      'Zeventien minuten nadat ze Sanne wegstuurt, ziet Ineke Slot haar het steegje ' +
      'naast \'t Anker in gaan. Dát was wat ze nog moest doen.',
    opent: ['d-rooster-anker'],
  },
  {
    id: 'v-niet-ingeroosterd',
    van: 'd-verklaring-ineke-1',
    naar: 'd-rooster-anker',
    conclusie:
      'Ze stond die zaterdag niet ingeroosterd. Ze ging om half elf \'s avonds ' +
      'achterom een café binnen waar ze niet hoefde te werken, en kwam er twintig ' +
      'minuten later huilend uit.',
  },
  {
    id: 'v-hulpvraag',
    van: 'b-nadia-2326',
    naar: 'd-verklaring-sanne',
    conclusie:
      'Veertien minuten na het steegje vraagt ze een lerares om een gesprek. Het gaat ' +
      'niet over school, en ze wil het uitdrukkelijk niet aan haar moeder vragen. ' +
      'Sanne wist al sinds 8 oktober dat er iets aankwam.',
  },
  {
    id: 'v-laatste-gesprek',
    van: 'o-2324-ruud',
    naar: 'd-mast-marit',
    conclusie:
      'Haar laatste telefoongesprek duurt zesennegentig seconden en gaat naar haar ' +
      'stiefvader. Zeventien minuten later stapt ze op de Molenweg bij iemand in een ' +
      'auto. Ruud Kolthof heeft tegen de politie verklaard dat hij die nacht heeft ' +
      'geslapen.',
  },
]
