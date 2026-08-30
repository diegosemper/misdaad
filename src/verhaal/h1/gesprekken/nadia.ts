import type { Gesprek } from '../../types.ts'

/* Kort en verwoestend. Marit had één volwassene op het oog die ze nog
   vertrouwde, en die lag om half twaalf 's nachts te slapen. */

export const nadia: Gesprek = {
  id: 'g-nadia',
  app: 'app-berichten',
  met: 'N. Berger (school)',
  vooruitblik: 'het gaat niet over school',
  berichten: [
    { kop: 'dinsdag 23 september', van: 'nadia', tekst: 'Marit, je essay was echt goed. Wel drie dagen te laat. Alles ok?', tijd: '16:30' },
    { van: 'ik', tekst: 'ja hoor dank u', tijd: '19:12' },
    { van: 'nadia', tekst: 'Als er iets is weet je me te vinden.', tijd: '19:20' },
    { van: 'ik', tekst: '👍', tijd: '19:22' },

    {
      kop: 'zaterdag 11 oktober',
      van: 'ik',
      tekst: 'mevrouw sorry dat ik zo laat app',
      tijd: '23:26',
      levert: ['b-nadia-2326'],
    },
    { van: 'ik', tekst: 'mag ik u maandag spreken', tijd: '23:26' },
    { van: 'ik', tekst: 'het is belangrijk en het gaat niet over school', tijd: '23:27' },
    { van: 'ik', tekst: 'en ik wil het niet aan mijn moeder vragen', tijd: '23:27' },

    { kop: 'maandag 13 oktober', van: 'nadia', tekst: 'Marit, ik zie dit nu pas. Natuurlijk. Kom in de eerste pauze.', tijd: '07:41' },
    { van: 'nadia', tekst: 'Ik hoor net wat er is. Ik hoop zo dat je dit leest.', tijd: '08:15' },
    { van: 'nadia', tekst: 'Ik heb zaterdagavond mijn telefoon op stil gezet omdat ik uit eten was.', tijd: '23:50' },
  ],
}
