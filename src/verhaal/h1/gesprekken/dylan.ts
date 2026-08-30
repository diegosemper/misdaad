import type { Gesprek } from '../../types.ts'

/* Dylan is twintig en werkt voor zijn vader. Hij weet geen enkel geheim
   en hij vertelt per ongeluk alles: dat de bus twee keer schoongemaakt
   werd, dat zijn vader zelf bij de stort stond, dat er die zomer ineens
   geld was.

   Zijn laatste bericht is het enige moment in de zaak waarop iemand
   hardop denkt wat de speler al weet. */

export const dylan: Gesprek = {
  id: 'g-dylan',
  app: 'app-berichten',
  met: 'Dylan',
  vooruitblik: 'op een zondag',
  berichten: [
    { kop: 'woensdag 6 augustus', van: 'dylan', tekst: 'we hebben de kolkweg', tijd: '17:30' },
    { van: 'dylan', tekst: 'pa is er stil van', tijd: '17:30' },
    { van: 'ik', tekst: 'gefeliciteerd zeker', tijd: '18:04' },
    { van: 'dylan', tekst: 'wat is er met jou', tijd: '18:05' },
    { van: 'ik', tekst: 'niks', tijd: '18:09' },
    { van: 'dylan', tekst: 'jullie doen allebei raar sinds juni', tijd: '18:11' },
    { van: 'dylan', tekst: 'hij ook', tijd: '18:11' },

    { kop: 'zaterdag 11 oktober', van: 'dylan', tekst: 'ga je naar de kermis', tijd: '18:50' },
    { van: 'ik', tekst: 'ja', tijd: '18:52' },
    { van: 'dylan', tekst: 'ik moet werken. veel plezier', tijd: '18:53' },

    {
      kop: 'zondag 12 oktober',
      van: 'dylan',
      tekst: 'pa vroeg of ik zondagochtend de bus wou stofzuigen',
      tijd: '08:02',
      levert: ['b-dylan-loods'],
    },
    { van: 'dylan', tekst: 'hij had m al schoongemaakt maar hij wou m nog een keer', tijd: '08:02' },
    { van: 'dylan', tekst: 'op een zondag', tijd: '08:03' },
    { van: 'dylan', tekst: 'en toen ging hij mee zoeken alsof er niks was', tijd: '08:03' },
    { van: 'dylan', tekst: 'sorry ik zeur. kom je vanmiddag langs', tijd: '08:05' },

    { kop: 'dinsdag 14 oktober', van: 'dylan', tekst: 'ze hebben pa verhoord', tijd: '19:40' },
    { van: 'dylan', tekst: 'gewoon standaard zegt hij', tijd: '19:40' },
    { van: 'dylan', tekst: 'marit ik weet dat je dit niet leest', tijd: '23:12' },
    { van: 'dylan', tekst: 'maar hij heeft maandag zelf bij de stort gestaan', tijd: '23:13' },
    { van: 'dylan', tekst: 'dat doet hij nooit', tijd: '23:13' },
    { van: 'dylan', tekst: 'dat laat hij altijd aan mij over', tijd: '23:14' },
    { van: 'dylan', tekst: 'ik denk de hele dag iets wat ik niet mag denken', tijd: '23:20' },
  ],
}
