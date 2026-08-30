import type { Gesprek } from '../../types.ts'

/* Het langste gesprek van de zaak, en het belangrijkste om te lézen. Sanne
   weet meer dan ze in haar verhoor zegt -- niet omdat ze liegt, maar omdat
   ze zelf niet doorhad wat ze wist. Wie dit gesprek van boven naar beneden
   leest ziet Marit in zes weken veranderen. */

export const sanne: Gesprek = {
  id: 'g-sanne',
  app: 'app-berichten',
  met: 'Sanne',
  vooruitblik: 'ga jij maar vast',
  berichten: [
    { kop: 'maandag 1 september', van: 'sanne', tekst: 'HOE WAS DE EERSTE DAG', tijd: '15:40' },
    { van: 'ik', tekst: 'saai', tijd: '15:41' },
    { van: 'ik', tekst: 'berger is wel leuk', tijd: '15:41' },
    { van: 'sanne', tekst: 'nederlands?? leuk???', tijd: '15:42' },
    { van: 'ik', tekst: 'ze vroeg of het goed ging thuis', tijd: '15:44' },
    { van: 'sanne', tekst: 'en?', tijd: '15:44' },
    { van: 'ik', tekst: 'ik zei ja natuurlijk', tijd: '15:45' },

    { kop: 'zaterdag 13 september', van: 'sanne', tekst: 'kom je nog langs na je werk', tijd: '22:10' },
    { van: 'sanne', tekst: 'marit', tijd: '23:30' },
    { van: 'sanne', tekst: '???', tijd: '00:12' },
    { van: 'ik', tekst: 'sorry lag al', tijd: '09:02' },
    { van: 'sanne', tekst: 'je bent de laatste tijd altijd al in slaap', tijd: '09:15' },

    { kop: 'dinsdag 16 september', van: 'ik', tekst: 'san', tijd: '23:51' },
    { van: 'ik', tekst: 'als iemand iets doet wat niet mag', tijd: '23:52' },
    { van: 'ik', tekst: 'en je vertelt het aan iemand die het kan oplossen', tijd: '23:52' },
    { van: 'ik', tekst: 'en die persoon doet niks', tijd: '23:53' },
    { van: 'ik', tekst: 'is het dan nog steeds alleen die eerste zn schuld', tijd: '23:53' },
    { van: 'sanne', tekst: 'wat', tijd: '23:55' },
    { van: 'sanne', tekst: 'gaat dit over jou', tijd: '23:55' },
    { van: 'ik', tekst: 'nee', tijd: '23:58' },
    { van: 'ik', tekst: 'laat maar ik ben moe', tijd: '23:58' },

    { kop: 'zondag 28 september', van: 'sanne', tekst: 'je was gister zo raar tegen joost', tijd: '13:20' },
    { van: 'sanne', tekst: 'je keek hem niet eens aan', tijd: '13:20' },
    { van: 'ik', tekst: 'ik werk daar gewoon', tijd: '13:44' },
    { van: 'sanne', tekst: 'je vond het altijd leuk daar', tijd: '13:45' },
    { van: 'ik', tekst: 'ja nou niet meer', tijd: '13:47' },
    { van: 'sanne', tekst: 'heeft hij iets gezegd', tijd: '13:48' },
    { van: 'ik', tekst: 'san', tijd: '13:52' },
    { van: 'ik', tekst: 'wat er bij jou gebeurde vorig jaar', tijd: '13:52' },
    { van: 'ik', tekst: 'je hoeft niks te zeggen', tijd: '13:53' },
    { van: 'ik', tekst: 'ik weet het al', tijd: '13:53' },
    { van: 'sanne', tekst: 'ik wil het er niet over hebben', tijd: '14:31' },
    { van: 'sanne', tekst: 'alsjeblieft', tijd: '14:31' },
    { van: 'ik', tekst: 'oke', tijd: '14:32' },
    { van: 'ik', tekst: 'sorry', tijd: '14:32' },

    { kop: 'woensdag 8 oktober', van: 'ik', tekst: 'ik ga het doen', tijd: '21:04' },
    { van: 'sanne', tekst: 'wat gaan doen', tijd: '21:05' },
    { van: 'ik', tekst: 'aangifte', tijd: '21:06' },
    { van: 'sanne', tekst: 'MARIT', tijd: '21:06' },
    { van: 'sanne', tekst: 'weet je wel wat dat betekent hier', tijd: '21:07' },
    { van: 'sanne', tekst: 'iedereen komt daar', tijd: '21:07' },
    { van: 'sanne', tekst: 'mijn ouders trouwden daar', tijd: '21:07' },
    { van: 'ik', tekst: 'dat weet ik', tijd: '21:09' },
    { van: 'ik', tekst: 'ik heb alles opgeschreven', tijd: '21:09' },
    { van: 'ik', tekst: 'data en alles', tijd: '21:10' },
    { van: 'ik', tekst: 'en niet alleen over hem', tijd: '21:10' },
    { van: 'sanne', tekst: 'hoezo niet alleen over hem', tijd: '21:11' },
    { van: 'ik', tekst: 'maandag vertel ik het je', tijd: '21:14' },
    { van: 'ik', tekst: 'niet via app', tijd: '21:14' },

    { kop: 'zaterdag 11 oktober', van: 'sanne', tekst: 'ben je er bijna', tijd: '19:26' },
    { van: 'ik', tekst: 'ja loop al', tijd: '19:27' },
    { van: 'sanne', tekst: 'waarom heb je je rugzak bij je lol', tijd: '19:40' },
    { van: 'ik', tekst: 'gewoon', tijd: '19:41' },

    { van: 'sanne', tekst: 'gaat het', tijd: '21:26' },
    { van: 'sanne', tekst: 'hij is echt een zielenpoot', tijd: '21:26' },
    { van: 'ik', tekst: 'ja het gaat', tijd: '21:31' },

    {
      van: 'ik',
      tekst: 'ga jij maar vast',
      tijd: '22:14',
      levert: ['b-sanne-2214'],
    },
    { van: 'ik', tekst: 'ik moet nog iets doen', tijd: '22:14' },
    { van: 'sanne', tekst: 'wat dan', tijd: '22:15' },
    { van: 'ik', tekst: 'gewoon iets', tijd: '22:15' },
    { van: 'ik', tekst: 'duurt niet lang', tijd: '22:16' },
    { van: 'sanne', tekst: 'zal ik meelopen', tijd: '22:16' },
    { van: 'sanne', tekst: 'marit?', tijd: '22:24' },
    { van: 'sanne', tekst: 'ok ik ga naar huis', tijd: '22:41' },
    { van: 'sanne', tekst: 'appen als je thuis bent', tijd: '22:41' },

    { kop: 'zondag 12 oktober', van: 'sanne', tekst: 'je moeder belde net', tijd: '09:21' },
    { van: 'sanne', tekst: 'waar ben je', tijd: '09:21' },
    { van: 'sanne', tekst: 'marit dit is niet grappig', tijd: '10:03' },
    { van: 'sanne', tekst: 'ik loop nu naar de bemmelseweg ze zeggen dat je fiets daar staat', tijd: '12:15' },
    { van: 'sanne', tekst: 'ik had moeten meelopen', tijd: '18:40' },
    { van: 'sanne', tekst: 'ik had gewoon moeten meelopen', tijd: '18:40' },
  ],
}
