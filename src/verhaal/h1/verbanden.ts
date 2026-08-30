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

  /* ── Fase 3: 't Anker ────────────────────────────────────── */
  {
    id: 'v-joost-liegt',
    van: 'b-joost-gewist',
    naar: 'd-verklaring-joost-1',
    conclusie:
      'Hij zegt dat hij haar alleen over roosters appte, zoals al zijn personeel. Het ' +
      'NFI haalde achtendertig berichten terug die hij had ingetrokken, allemaal tussen ' +
      'middernacht en half drie. Hij liegt over alles wat hij kan liegen.',
    opent: ['d-kassa-anker', 'd-verklaring-marloes'],
  },
  {
    id: 'v-magazijn',
    van: 'd-verklaring-marloes',
    naar: 'd-verklaring-ineke-1',
    conclusie:
      'Van half elf tot elf was Joost weg van de bar, "in het magazijn". Precies in die ' +
      'twintig minuten zag Ineke Slot Marit het steegje in gaan en er huilend uit komen.',
  },
  {
    id: 'v-joost-alibi',
    van: 'd-kassa-anker',
    naar: 'd-verklaring-marloes',
    conclusie:
      'Vanaf elf uur staat er onafgebroken werk op zijn bedienerscode, één handeling per ' +
      'zeventig seconden tot na tweeën. Joost Bakker was er wél om half elf, maar hij ' +
      'kan om kwart voor twaalf niet in een auto op de Molenweg hebben gezeten. Hij is ' +
      'niet degene die haar heeft opgehaald.',
    opent: ['app-notities', 'f-scherm-joost'],
  },
  {
    id: 'v-zestien',
    van: 'f-scherm-joost',
    naar: 'd-nfi-toestel',
    conclusie:
      'Veertien schermafdrukken, bewaard nadat hij ze had ingetrokken, de eerste van ' +
      '2 mei. Ze was zestien. Ze legde vanaf de eerste nacht een dossier aan, want ze ' +
      'wist toen al dat niemand haar op haar woord zou geloven.',
  },
  {
    id: 'v-niet-de-eerste',
    van: 'n-lijst',
    naar: 'b-joost-gewist',
    conclusie:
      'Drie namen met jaartallen, één doorgestreept met "verhuisd, wil niet". Ze was ' +
      'niet de eerste, en dat wist ze. Daaronder een tweede lijst, met een kop in ' +
      'hoofdletters: WIE WIST HET EN DEED NIETS.',
  },

  /* ── Fase 4: de leugen ───────────────────────────────────── */
  {
    id: 'v-ruud-wist-het',
    van: 'n-14-juni',
    naar: 'o-2324-ruud',
    conclusie:
      'Op 14 juni vertelde ze het aan Ruud, in de bus, op de oprit, met de motor uit. ' +
      'Hij vroeg drie keer of haar moeder het wist en zei toen: ik regel het. Vier ' +
      'maanden later is het laatste telefoongesprek van haar leven met hem.',
    opent: ['d-gunning', 'd-verklaring-karin'],
  },
  {
    id: 'v-verkocht',
    van: 'n-boodschappen',
    naar: 'd-gunning',
    conclusie:
      'Drie weken nadat ze het hem vertelde kreeg Kolthof Bouw de verbouwing van ' +
      '\'t Anker, zonder offerte, met een veel te hoge aanbetaling. Zes weken later de ' +
      'Kolkweg, enkelvoudig gegund. Haar eigen woorden: "Hij heeft het niet doorgegeven. ' +
      'Hij heeft het verkocht."',
    opent: ['d-verklaring-wouter', 'd-verklaring-ruud-1'],
  },
  {
    id: 'v-boekhouding',
    van: 'd-verklaring-karin',
    naar: 'd-gunning',
    conclusie:
      'Zijn eigen boekhouder vroeg ernaar en kreeg te horen dat het tussen Joost en hem ' +
      'geregeld was. In de vier jaar daarvoor had Kolthof Bouw geen enkele gemeentelijke ' +
      'opdracht gehad.',
  },
  {
    id: 'v-wouter-noemt-joost',
    van: 'd-verklaring-wouter',
    naar: 'd-verklaring-joost-1',
    conclusie:
      'De wethouder noemt uit zichzelf de naam Joost Bakker, terwijl daar niet naar ' +
      'gevraagd is. Niemand in dit dorp heeft samengespannen. Ze wisten alleen allemaal ' +
      'net genoeg om zich ongemakkelijk te voelen.',
  },
  {
    id: 'v-bus-twee-keer',
    van: 'b-dylan-loods',
    naar: 'd-verklaring-ruud-1',
    conclusie:
      'Hij zegt dat hij de hele nacht heeft geslapen. Zondagochtend had hij de bus al ' +
      'schoongemaakt en vroeg hij zijn zoon om hem nóg een keer te doen. Daarna liep hij ' +
      'mee met de zoekactie.',
    opent: ['d-mast-ruud', 'd-verklaring-ineke-2'],
  },

  /* ── Fase 5: de ontknoping ───────────────────────────────── */
  {
    id: 'v-88-minuten',
    van: 'd-mast-ruud',
    naar: 'd-verklaring-ruud-1',
    conclusie:
      'Om 23:58 boekt zijn telefoon in op de mast Kolkweg, een kilometer van zijn bed, ' +
      'elf minuten nadat die van Marit daar voor het laatst hing. Daarna staat hij ' +
      'achtentachtig minuten uit — de enige keer in vier jaar dat dit toestel langer dan ' +
      'vijf minuten uit is geweest.',
    opent: ['d-bouwput', 'd-verklaring-ruud-2', 'd-bus-onderzoek'],
  },
  {
    id: 'v-bus-schoonspuiten',
    van: 'd-mast-ruud',
    naar: 'd-verklaring-ineke-2',
    conclusie:
      'Om 01:26 gaat zijn telefoon weer aan op de mast Molenweg. Acht minuten later ziet ' +
      'Ineke Slot hem op de oprit staan met de hogedrukspuit, portieren open, naar ' +
      'binnen spuitend. In oktober, in het donker. Ze heeft het drie keer verteld.',
  },
  {
    id: 'v-kolkweg',
    van: 'd-mast-ruud',
    naar: 'd-bouwput',
    conclusie:
      'De sleuven aan de Kolkweg lagen dat weekend open, met de kraan er al naast. ' +
      'Maandagochtend om half zeven is er beton in gegaan, en hij stond er zelf bij — ' +
      'iets wat hij volgens de chauffeurs nooit doet. De mast waar hij om 23:58 op ' +
      'inboekte dekt precies dat terrein.',
  },
  {
    id: 'v-zoekactie-weggestuurd',
    van: 'b-buurtapp-kolkweg',
    naar: 'd-bouwput',
    conclusie:
      'Om half tien maandagochtend wilde het dorp het Kolkgebied afzoeken. Hij liet ' +
      'weten dat het terrein afgezet was in verband met de stort van dinsdag. Het beton ' +
      'lag er op dat moment drie uur in.',
  },
  {
    id: 'v-schoongemaakt',
    van: 'd-bus-onderzoek',
    naar: 'd-verklaring-ruud-2',
    conclusie:
      'De bus is van binnen met chloor en hoge druk gereinigd, de passagiersstoel is nat ' +
      'geweest en van binnenuit gedroogd. Er is niets meer te vinden. Het onderzoek begon ' +
      'zeven dagen na de vermissing, omdat niemand op tijd naar hem heeft gekeken.',
  },
]
