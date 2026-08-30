/* ─────────────────────────────────────────────────────────────
   DE VORM VAN EEN ZAAK

   Alles wat de speler doet komt neer op drie handelingen: een bewijsstuk
   oppakken, twee bewijsstukken aan elkaar knopen, of een code intypen.
   Dit bestand beschrijft de onderdelen waaruit een zaak bestaat, en verder
   niets -- geen logica, geen React. Een tweede hoofdstuk is straks een
   nieuwe map met dezelfde vormen erin.

   Let op de imports elders in src/verhaal/ en src/engine/: die schrijven hun
   .ts-extensie voluit, zodat scripts/controleer.mjs deze data rechtstreeks
   met node kan inlezen.
   ───────────────────────────────────────────────────────────── */

/** Wat voor soort ding is dit bewijsstuk? Bepaalt hoe het getekend wordt. */
export type BewijsSoort =
  | 'bericht' // een chatbericht dat je gemarkeerd hebt
  | 'foto'
  | 'document' // rapport, uitdraai, gunning
  | 'verklaring' // wat iemand tegen de politie zei
  | 'oproep' // regel uit de belgeschiedenis
  | 'notitie'
  | 'object' // een ding: een fiets, een rugzak

export type Bewijs = {
  id: string
  soort: BewijsSoort
  titel: string
  /** De hoofdtekst. Bij een foto: wat je erop ziet. */
  inhoud: string
  /** Waar het vandaan komt. Staat klein op het kaartje. */
  bron: string
  /** In welke app het te vinden is. Leeg = het komt uit een gesprek. */
  app?: string
  /** 'HH:MM' -- alleen als het op de tijdlijn thuishoort. */
  tijd?: string
  dag?: string
}

/** Eén regel in een gesprek. */
export type Bericht = {
  /** Persoon-id, of 'ik' voor de eigenaar van de telefoon. */
  van: string
  tekst: string
  tijd?: string
  /** Bewijs-id's die vrijkomen als de speler dit bericht markeert. */
  levert?: string[]
  /** Een kop boven het bericht, bijvoorbeeld een datum. */
  kop?: string
  /** Dit bericht is gewist en met forensische software teruggehaald. */
  hersteld?: boolean
}

export type Gesprek = {
  id: string
  /** Welke app dit gesprek bevat. */
  app: string
  /** Titel boven het gesprek: een naam of een groep. */
  met: string
  /** Regeltje in de lijst, voordat je hem opent. */
  vooruitblik?: string
  berichten: Bericht[]
}

/** Een app op het scherm van de rechercheur. */
export type App = {
  id: string
  naam: string
  /** Het pictogram. Eén teken, geen bestand -- dit project heeft geen plaatjes. */
  teken: string
  /** Hoe de inhoud getoond wordt. */
  soort: 'gesprekken' | 'stukken'
  /** Korte uitleg bovenaan de app. */
  onderschrift?: string
  /** Zit er een slot op, dan is de app dicht tot dat slot gekraakt is. */
  slot?: string
}

/** Een geldig draadje tussen twee bewijsstukken. */
export type Verband = {
  id: string
  van: string
  naar: string
  /** Wat je nu weet. Komt als conclusiekaartje op het bord. */
  conclusie: string
  /** Id's van inhoud die hierdoor vrijkomt. */
  opent?: string[]
}

/** Iets met een code ervoor. */
export type Slot = {
  id: string
  naam: string
  /** Wat de speler ziet als hij ervoor staat. */
  vraag: string
  code: string
  /** In welk bewijsstuk de code te vinden is. Voor de zaakcontrole. */
  hintIn: string
  /** Een duwtje, zichtbaar na een paar mislukte pogingen. */
  duwtje: string
  opent: string[]
}

/** Een fase van het onderzoek. Gaat pas open als je genoeg gelegd hebt. */
export type Laag = {
  nr: number
  titel: string
  /** Verband-, slot- of bewijs-id's die je gehad moet hebben. */
  eist: string[]
  opent: string[]
  /** Wat de recherche je nu opdraagt. Staat bovenaan het bord. */
  opdracht: string
}

export type Persoon = {
  id: string
  naam: string
  /** Twee letters voor het rondje in een gesprek. */
  letters: string
  rol: string
}

/** Hoe het afloopt. */
export type Einde = {
  titel: string
  /** Alinea's. `{naam}` wordt vervangen door wie je beschuldigd hebt. */
  tekst: string
}

export type Hoofdstuk = {
  id: string
  titel: string
  personen: Persoon[]
  apps: App[]
  bewijs: Bewijs[]
  gesprekken: Gesprek[]
  verbanden: Verband[]
  sloten: Slot[]
  lagen: Laag[]
  /** Id's die vanaf het begin beschikbaar zijn. */
  begin: string[]
  /** Wie je mag aanwijzen. Volgorde is de volgorde op het scherm. */
  verdachten: string[]
  /** Wie het deed, en waarmee je dat sluitend maakt. */
  dader: {
    persoon: string
    bewijsA: string
    bewijsB: string
    bewijsC: string
  }
  eindes: {
    /** Juiste dader, alle drie de dragende stukken. */
    sluitend: Einde
    /** Juiste dader, te weinig om het hard te maken. */
    zwak: Einde
    /** De verkeerde aangewezen. */
    mis: Einde
  }
}
