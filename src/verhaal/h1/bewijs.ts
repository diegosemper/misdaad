import type { Bewijs } from '../types.ts'

/* ─────────────────────────────────────────────────────────────
   HET MATERIAAL

   Volgorde: per app, en binnen een app op tijd. De id's zeggen waar iets
   vandaan komt -- d- is dossier, f- is foto, o- is oproep, b- is een
   bericht uit een gesprek, n- is een notitie. Dat scheelt zoeken zodra
   het er zeventig zijn.

   Bewijs met een app erbij ligt in die app en kan opgepakt worden zodra
   het beschikbaar is. Bewijs zonder app komt uit een chatbericht: dat
   bestaat pas als de speler het bericht markeert.
   ───────────────────────────────────────────────────────────── */

export const bewijs: Bewijs[] = [
  /* ── Dossier: de eerste stukken ──────────────────────────── */
  {
    id: 'd-melding',
    soort: 'document',
    app: 'app-dossier',
    titel: 'Meldingsformulier vermissing',
    bron: 'Zaak 2026-0417',
    dag: 'zo 12 okt',
    tijd: '13:00',
    inhoud:
      'Melder: E. de Vries (moeder), Molenweg 22, Westerveld.\n\n' +
      'Vermist: Marit de Vries, geboren 3 maart 2009, 1.68 m, halflang donkerblond ' +
      'haar. Laatst gedragen: zwarte jas, spijkerbroek, witte sneakers, grijze rugzak.\n\n' +
      'Melder verklaart haar dochter voor het laatst te hebben gezien op zaterdag ' +
      '11 oktober omstreeks 19:30, toen betrokkene naar de kermis vertrok. Melder is ' +
      'omstreeks 21:30 in slaap gevallen op de bank en heeft niet gemerkt dat ' +
      'betrokkene niet is thuisgekomen.\n\n' +
      'Echtgenoot van melder, R. Kolthof, verklaart de gehele nacht thuis te zijn ' +
      'geweest en niets te hebben gehoord.',
  },
  {
    id: 'd-signalement',
    soort: 'document',
    app: 'app-dossier',
    titel: 'Uitgifte signalement',
    bron: 'Zaak 2026-0417',
    dag: 'zo 12 okt',
    tijd: '14:20',
    inhoud:
      'Signalement verspreid onder eenheden en via de regionale omroep.\n\n' +
      'Bijzonderheid: betrokkene droeg volgens getuige S. Bosma een grijze rugzak. ' +
      'Getuige merkt op dat betrokkene "die nooit meenam als ze uitging". Inhoud ' +
      'rugzak onbekend. Rugzak is niet aangetroffen.',
  },
  {
    id: 'd-fiets',
    soort: 'document',
    app: 'app-dossier',
    titel: 'Proces-verbaal aantreffen fiets',
    bron: 'Zaak 2026-0417',
    dag: 'zo 12 okt',
    tijd: '11:40',
    inhoud:
      'Aangetroffen door G. Hoving, landbouwer, Bemmelseweg 3, in de berm ter hoogte ' +
      'van perceel 114, deels in de sloot.\n\n' +
      'Damesfiets, merk Batavus, kleur mat groen. Slot niet aangebracht. Geen ' +
      'braakschade. Voorwiel niet ontzet, geen krassen op het frame die op een ' +
      'aanrijding wijzen.\n\n' +
      'Opmerking verbalisant: de fiets lag naar het oosten gericht, met de trappers ' +
      'in gepoetste staat. De berm was die nacht nat. Op de banden is geen modder ' +
      'van de sloot aangetroffen.',
  },
  {
    id: 'd-camera-2312',
    soort: 'foto',
    app: 'app-dossier',
    titel: 'Camerabeeld snackbar Van Elst, 23:12',
    bron: 'Zaak 2026-0417 — beveiligingsbeeld',
    dag: 'za 11 okt',
    tijd: '23:12',
    inhoud:
      'Korrelig zwart-witbeeld van de ingang van het kermisterrein, gezien vanaf de ' +
      'overkant van de weg.\n\n' +
      'Een meisje in een donkere jas staat stil bij het hek. Ze kijkt niet naar de ' +
      'kermis en niet naar de weg, maar naar haar telefoon in haar hand. Ze staat er ' +
      'volgens de tijdcode drie minuten en veertig seconden. Dan loopt ze naar links, ' +
      'de Molenweg op, weg van het terrein.\n\n' +
      'Ze heeft geen fiets bij zich. Ze heeft geen rugzak bij zich.',
  },
  {
    id: 'd-buurtonderzoek',
    soort: 'document',
    app: 'app-dossier',
    titel: 'Buurtonderzoek Molenweg',
    bron: 'Zaak 2026-0417',
    dag: 'ma 13 okt',
    inhoud:
      'Aan de Molenweg zijn elf woningen bezocht. Negen bewoners verklaren niets te ' +
      'hebben gezien of gehoord.\n\n' +
      'Nummer 14, mw. I. Slot, verklaart wél waarnemingen te hebben gedaan. ' +
      'Verbalisant tekent aan dat mevrouw bij eerdere gelegenheden meermalen ' +
      'meldingen heeft gedaan die niet konden worden bevestigd.\n\n' +
      'Nummer 22 (woning betrokkene) is bezocht. Bewoners R. Kolthof en E. de Vries ' +
      'verklaren beiden te hebben geslapen.',
  },

  /* ── Foto's van Marits eigen toestel ─────────────────────── */
  {
    id: 'f-selfie-1938',
    soort: 'foto',
    app: 'app-fotos',
    titel: 'Selfie met Sanne, onderweg',
    bron: 'Toestel M. de Vries',
    dag: 'za 11 okt',
    tijd: '19:38',
    inhoud:
      'Twee meisjes op een donkere weg, van onderaf gefotografeerd. Sanne lacht met ' +
      'haar tong uit haar mond. Marit lacht niet echt; haar ogen kijken langs de ' +
      'camera heen.\n\n' +
      'Over haar schouder hangt een grijze rugzak. Hij ziet er zwaar uit.',
  },
  {
    id: 'f-botsauto',
    soort: 'foto',
    app: 'app-fotos',
    titel: 'Botsauto\'s',
    bron: 'Toestel M. de Vries',
    dag: 'za 11 okt',
    tijd: '21:02',
    inhoud:
      'Onscherpe foto van de botsauto\'s, genomen terwijl de fotograaf bewoog.\n\n' +
      'Links in beeld, half buiten de rand, staat een jongen met een groene bomberjack ' +
      'die iemands arm vasthoudt. Zijn mond staat open. Van de persoon wiens arm hij ' +
      'vasthoudt is alleen een mouw te zien.\n\n' +
      'Dit is de laatste foto die Marit die avond zelf maakte.',
  },
  {
    id: 'f-zweefmolen',
    soort: 'foto',
    app: 'app-fotos',
    titel: 'Bij de zweefmolen',
    bron: 'Toestel S. Bosma, gedeeld in groepschat',
    dag: 'za 11 okt',
    tijd: '21:07',
    inhoud:
      'Marit voor de zweefmolen, met een beker in haar hand. Ze kijkt opzij, naar iets ' +
      'buiten beeld.\n\n' +
      'Op de achtergrond, bij het bedieningspaneel, staat een jongen in een oranje hesje ' +
      'met een portofoon. Hij kijkt in de richting van de camera.\n\n' +
      'Dit is de foto die in de buurtapp rondging.',
  },

  /* ── Belgeschiedenis ─────────────────────────────────────── */
  {
    id: 'o-2119-sanne',
    soort: 'oproep',
    app: 'app-oproepen',
    titel: 'Inkomend — Sanne',
    bron: 'Belgeschiedenis M. de Vries',
    dag: 'za 11 okt',
    tijd: '21:19',
    inhoud: 'Inkomend, beantwoord. Duur 41 seconden.',
  },
  {
    id: 'o-2319-mama',
    soort: 'oproep',
    app: 'app-oproepen',
    titel: 'Uitgaand — Mama',
    bron: 'Belgeschiedenis M. de Vries',
    dag: 'za 11 okt',
    tijd: '23:19',
    inhoud:
      'Uitgaand, niet beantwoord. Duur 0 seconden.\n\n' +
      'Direct daarna, om 23:21, nogmaals uitgaand naar hetzelfde nummer. Ook niet ' +
      'beantwoord.',
  },
  {
    id: 'o-2324-ruud',
    soort: 'oproep',
    app: 'app-oproepen',
    titel: 'Uitgaand — Ruud',
    bron: 'Belgeschiedenis M. de Vries',
    dag: 'za 11 okt',
    tijd: '23:24',
    inhoud:
      'Uitgaand, beantwoord. Duur 96 seconden.\n\n' +
      'Dit is het laatste telefoongesprek dat Marit de Vries heeft gevoerd.',
  },
  {
    id: 'o-0912-ellen',
    soort: 'oproep',
    app: 'app-oproepen',
    titel: 'Gemist — Mama (zondag)',
    bron: 'Belgeschiedenis M. de Vries',
    dag: 'zo 12 okt',
    tijd: '09:12',
    inhoud:
      'Inkomend, niet beantwoord. Daarna om 09:14, 09:15, 09:15, 09:16, 09:16, 09:18, ' +
      '09:22, 09:31 — elf pogingen binnen het uur. Geen enkele beantwoord.',
  },

  /* ── Bewijs dat uit gesprekken komt ──────────────────────── */
  {
    id: 'b-sanne-2214',
    soort: 'bericht',
    titel: '"ik moet nog iets doen"',
    bron: 'Chat met Sanne Bosma',
    dag: 'za 11 okt',
    tijd: '22:14',
    inhoud:
      'Marit: ga jij maar vast\n' +
      'Marit: ik moet nog iets doen\n' +
      'Sanne: wat dan\n' +
      'Marit: gewoon iets\n' +
      'Marit: duurt niet lang\n\n' +
      'Sanne heeft daarna niets meer van haar gehoord.',
  },
  {
    id: 'b-tim-dreiging',
    soort: 'bericht',
    titel: 'Tim, na de botsauto\'s',
    bron: 'Chat met Tim Wielinga',
    dag: 'za 11 okt',
    tijd: '21:24',
    inhoud:
      'Tim: je hoeft niet zo te doen waar iedereen bij is\n' +
      'Tim: ik wou gewoon praten\n' +
      'Tim: MARIT\n' +
      'Tim: weet je wat, laat ook maar\n' +
      'Tim: je gaat er nog spijt van krijgen',
  },
  {
    id: 'b-buurtapp-rachid',
    soort: 'bericht',
    titel: 'De buurtapp wijst iemand aan',
    bron: 'Buurtapp Westerveld (312 leden)',
    dag: 'zo 12 okt',
    tijd: '15:47',
    inhoud:
      'Binnen twee uur na de melding gaat de foto van de zweefmolen rond in de ' +
      'buurtapp, met de jongen in het oranje hesje omcirkeld.\n\n' +
      'Er wordt gesproken over "die gasten van de kermis", "ze kwamen donderdag pas ' +
      'binnen" en "de politie doet niks". Niemand in de groep heeft met hem gesproken. ' +
      'Niemand noemt zijn naam, want niemand weet die.',
  },
  {
    id: 'b-mama-zondag',
    soort: 'bericht',
    titel: 'Ellen, zondagochtend',
    bron: 'Chat met Mama',
    dag: 'zo 12 okt',
    tijd: '09:11',
    inhoud:
      'Mama: waar ben je\n' +
      'Mama: neem je telefoon op\n' +
      'Mama: marit alsjeblieft\n' +
      'Mama: ik heb sanne gebeld die zegt dat je om kwart over tien wegging\n' +
      'Mama: waar BEN je\n\n' +
      'Alle berichten zijn afgeleverd. Geen enkele is gelezen.',
  },
  {
    id: 'b-nadia-2326',
    soort: 'bericht',
    titel: 'Het bericht aan mevrouw Berger',
    bron: 'Chat met N. Berger (school)',
    dag: 'za 11 okt',
    tijd: '23:26',
    inhoud:
      'Marit: mevrouw sorry dat ik zo laat app\n' +
      'Marit: mag ik u maandag spreken\n' +
      'Marit: het is belangrijk en het gaat niet over school\n' +
      'Marit: en ik wil het niet aan mijn moeder vragen\n\n' +
      'Mevrouw Berger heeft het bericht maandagochtend om 07:41 gelezen.',
  },

  /* ── Laag 2: de tijdlijn ─────────────────────────────────── */
  {
    id: 'd-mast-marit',
    soort: 'document',
    app: 'app-dossier',
    titel: 'Mastgegevens toestel M. de Vries',
    bron: 'Vordering telecomgegevens',
    dag: 'za 11 okt',
    inhoud:
      'Uitdraai van de zendmasten waarop het toestel van betrokkene die avond is ' +
      'ingeboekt:\n\n' +
      '  19:41   mast Kermisveld\n' +
      '  22:14   mast Kermisveld\n' +
      '  23:12   mast Kermisveld\n' +
      '  23:26   mast Molenweg\n' +
      '  23:41   mast Molenweg\n' +
      '  23:47   mast Kolkweg\n' +
      '  23:48   geen registratie meer\n\n' +
      'De mast Kolkweg dekt het buitengebied ten oosten van de kern, op ruim een ' +
      'kilometer van de Molenweg. Tussen 23:41 en 23:47 is die afstand afgelegd.\n\n' +
      'Na 23:48 is het toestel niet meer op enige mast ingeboekt.',
  },
  {
    id: 'd-verklaring-sanne',
    soort: 'verklaring',
    app: 'app-verhoren',
    titel: 'Verklaring S. Bosma',
    bron: 'Verhoor, ma 13 oktober',
    inhoud:
      '"We zijn om half acht weggegaan. Ze had haar rugzak bij zich, dat vond ik al ' +
      'raar, die neemt ze nooit mee.\n\n' +
      'Bij de botsauto\'s kwam Tim. Hij pakte haar arm vast. Die gast van de zweefmolen ' +
      'stuurde hem weg, die was juist aardig.\n\n' +
      'Daarna was ze stil. Ik vroeg wat er was en ze zei niks. Om kwart over tien ' +
      'appte ze dat ik vast moest gaan. Ik dacht dat het over Tim ging.\n\n' +
      'Ik had moeten blijven. Dat weet ik ook wel."',
  },
  {
    id: 'd-verklaring-tim',
    soort: 'verklaring',
    app: 'app-verhoren',
    titel: 'Verklaring T. Wielinga',
    bron: 'Verhoor, ma 13 oktober',
    inhoud:
      '"Ja ik heb haar arm vastgepakt. Dat had ik niet moeten doen. Maar ik heb haar ' +
      'daarna niet meer gezien, dat zweer ik.\n\n' +
      'Ik was klaar. Ik heb bij de tent nog zes bier gehad en toen hebben Bas en Ilias ' +
      'me naar huis gebracht. Kwart voor elf ofzo. Mijn moeder heeft me op de bank ' +
      'gelegd want ik kwam de trap niet op.\n\n' +
      'Dat bericht van \'je krijgt er spijt van\' — ik weet hoe dat klinkt. Ik was ' +
      'achttien en dronken en zij had het uitgemaakt. Ik bedoelde er niks mee."\n\n' +
      'Aantekening verbalisant: de verklaring wordt bevestigd door B. Veenstra, ' +
      'I. Yildiz en de moeder van betrokkene. Het toestel van betrokkene is vanaf ' +
      '22:47 onafgebroken ingeboekt op de mast Dorpsstraat.',
  },
  {
    id: 'd-verklaring-rachid',
    soort: 'verklaring',
    app: 'app-verhoren',
    titel: 'Verklaring R. El Amrani',
    bron: 'Verhoor, di 14 oktober',
    inhoud:
      '"Ik weet al waarom ik hier zit.\n\n' +
      'Ik heb dat meisje één keer gezien. Er was een jongen die haar arm vasthield en ' +
      'ik heb gezegd dat hij moest oprotten. Dat doe ik elke avond wel drie keer, dat ' +
      'hoort bij het werk.\n\n' +
      'Ik stond van tien uur tot een uur op de zweefmolen. Alleen ik mag daarop staan, ' +
      'want ik heb het certificaat. Vraag het aan iedereen daar. Vraag de kassa maar op.\n\n' +
      'En ik weet ook wat er in die app staat. Mijn neef heeft het me laten zien."',
  },
  {
    id: 'd-kassabon-zweefmolen',
    soort: 'document',
    app: 'app-dossier',
    titel: 'Kassa-uitdraai zweefmolen',
    bron: 'Vordering exploitant Bergsma Attracties',
    dag: 'za 11 okt',
    inhoud:
      'Uitdraai van het kassasysteem van attractie 4 (zweefmolen), zaterdag 11 oktober.\n\n' +
      'Tussen 22:00 en 01:00 zijn 214 kaartjes verkocht, verdeeld over 19 ritten. Elke ' +
      'rit is met de sleutel van de bediener gestart en gestopt; die sleutel is die ' +
      'avond aan één persoon uitgegeven.\n\n' +
      'De langste onderbreking tussen twee handelingen bedraagt elf minuten.',
  },
  {
    id: 'd-verklaring-ineke-1',
    soort: 'verklaring',
    app: 'app-verhoren',
    titel: 'Verklaring I. Slot (eerste)',
    bron: 'Buurtonderzoek, ma 13 oktober',
    inhoud:
      '"Ik slaap slecht, dat weet iedereen hier, en dat wordt tegen me gebruikt.\n\n' +
      'Om even voor half elf zag ik dat kind het steegje naast \'t Anker in gaan. Het ' +
      'achterom. Ik dacht nog: die gaat werken, maar op zaterdagavond om die tijd?\n\n' +
      'En om iets voor elven kwam ze eruit. Ze huilde. Niet zachtjes, echt huilen, met ' +
      'haar hand voor haar mond.\n\n' +
      'Ik heb dat gezegd tegen die agent. Hij schreef het niet op."\n\n' +
      'Aantekening verbalisant: betrokkene heeft in 2023 en 2024 meldingen gedaan die ' +
      'niet konden worden bevestigd. Waarde van deze verklaring vooralsnog beperkt.',
  },
  {
    id: 'd-rooster-anker',
    soort: 'document',
    app: 'app-dossier',
    titel: "Werkrooster café-zaal 't Anker",
    bron: 'Vordering werkgever',
    dag: 'za 11 okt',
    inhoud:
      'Werkrooster week 41.\n\n' +
      'Zaterdag 11 oktober: J. Bakker (leiding), M. Veldhuis (bar), K. Bakker (keuken).\n\n' +
      'M. de Vries staat op zaterdag 11 oktober **niet** ingeroosterd. Zij werkte die ' +
      'maand nog twee zaterdagen: 4 en 18 oktober.',
  },

  /* ── Achter de notitie-app ───────────────────────────────── */
  {
    id: 'n-boodschappen',
    soort: 'notitie',
    app: 'app-notities',
    titel: 'Notitie "boodschappen"',
    bron: 'Toestel M. de Vries — beveiligde notitie',
    inhoud:
      'Een notitie met de naam "boodschappen" waarin geen enkele boodschap staat. ' +
      'Achtenveertig regels, bijgehouden vanaf 2 mei.\n\n' +
      'Elke regel is een datum, een plaats en één zin. Ze zijn kort, precies en ' +
      'zonder bijvoeglijke naamwoorden geschreven, zoals iemand schrijft die weet dat ' +
      'het ooit voorgelezen kan worden.\n\n' +
      'De laatste regel is van 9 oktober:\n\n' +
      '  "9 okt — R. weet het sinds 14 juni. 14 juni gezegd, 3 juli opdracht Anker, ' +
      '19 aug Kolkweg. Hij heeft het niet doorgegeven. Hij heeft het verkocht."',
  },
  {
    id: 'n-14-juni',
    soort: 'notitie',
    app: 'app-notities',
    titel: 'Notitie "14 juni"',
    bron: 'Toestel M. de Vries — beveiligde notitie',
    dag: '14 juni',
    inhoud:
      '"Vandaag aan R. verteld. In de bus, op de oprit, motor uit.\n\n' +
      'Hij werd niet boos. Dat had ik verwacht en dat gebeurde niet. Hij vroeg drie ' +
      'keer of ik het aan mama had verteld en toen ik nee zei werd hij rustig.\n\n' +
      'Hij zei: ik regel het, jij houdt je er nu verder buiten.\n\n' +
      'Ik ben opgelucht naar binnen gelopen. Ik heb die avond voor het eerst in weken ' +
      'geslapen."',
  },
  {
    id: 'n-lijst',
    soort: 'notitie',
    app: 'app-notities',
    titel: 'Notitie zonder naam',
    bron: 'Toestel M. de Vries — beveiligde notitie',
    inhoud:
      'Drie namen onder elkaar, met jaartallen erachter. Eén ervan is doorgestreept ' +
      'en er staat "verhuisd, wil niet" bij.\n\n' +
      'Eronder, in hoofdletters: WIE WIST HET EN DEED NIETS.\n\n' +
      'Daaronder vijf namen. Twee ervan zijn van mensen die op dit moment meelopen in ' +
      'de zoekacties.',
  },

  /* ── De drie stukken die de zaak sluitend maken ──────────── */
  {
    id: 'd-mast-ruud',
    soort: 'document',
    app: 'app-dossier',
    titel: 'Mastgegevens toestel R. Kolthof',
    bron: 'Vordering telecomgegevens',
    dag: 'za 11 okt',
    inhoud:
      'Uitdraai van het toestel van R. Kolthof, nacht van 11 op 12 oktober:\n\n' +
      '  23:33   mast Molenweg\n' +
      '  23:41   mast Molenweg\n' +
      '  23:58   mast Kolkweg\n' +
      '  23:58   toestel uitgeschakeld\n' +
      '  01:26   toestel ingeschakeld, mast Molenweg\n\n' +
      'Het toestel is 88 minuten uit geweest.\n\n' +
      'Opmerking analist: over de opgevraagde periode van vier jaar is dit de enige ' +
      'keer dat dit toestel langer dan vijf minuten is uitgeschakeld. Betrokkene ' +
      'verklaarde de gehele nacht thuis te hebben geslapen.',
  },
  {
    id: 'd-verklaring-ineke-2',
    soort: 'verklaring',
    app: 'app-verhoren',
    titel: 'Verklaring I. Slot (tweede)',
    bron: 'Nader verhoor',
    inhoud:
      '"Nu wilt u het ineens wél weten.\n\n' +
      'Om half twee \'s nachts stond Kolthof zijn bus af te spuiten. Op de oprit. Met ' +
      'de hogedrukspuit, in oktober, in het donker. Ik heb het licht aangedaan om te ' +
      'kijken of ik het goed zag.\n\n' +
      'Hij deed de binnenkant ook. De portieren stonden open en hij spoot naar binnen. ' +
      'Dat doet niemand.\n\n' +
      'Ik heb het die maandag aan de agent verteld. Hij zei dat mensen soms \'s nachts ' +
      'niet kunnen slapen. Dat weet ik. Ik kan zelf al elf jaar niet slapen. Daarom zie ' +
      'ik ook alles."',
  },
]
