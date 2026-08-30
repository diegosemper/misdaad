import type { Gesprek } from '../../types.ts'

/* Vals spoor 2, en meteen het thema van het hele hoofdstuk: een dorp dat
   binnen twee uur weet wie het gedaan heeft, op grond van één foto en een
   achternaam die het niet kan uitspreken. Marit zat in deze groep omdat
   iedereen erin zit. */

export const buurtapp: Gesprek = {
  id: 'g-buurtapp',
  app: 'app-berichten',
  met: 'Buurtapp Westerveld (312)',
  vooruitblik: 'Ria: dit kan toch niet in ons dorp',
  berichten: [
    { kop: 'zondag 12 oktober', van: 'ria', tekst: 'Is er iets aan de hand bij de Bemmelseweg? Politie.', tijd: '12:02' },
    { van: 'henk', tekst: 'Fiets gevonden geloof ik', tijd: '12:09' },
    { van: 'ria', tekst: 'Van wie', tijd: '12:09' },
    { van: 'henk', tekst: 'Weet ik niet', tijd: '12:11' },
    { van: 'ria', tekst: 'Het dochtertje van Ellen van de Molenweg zeggen ze', tijd: '13:40' },
    { van: 'gerda', tekst: '🙏🙏🙏', tijd: '13:41' },
    { van: 'henk', tekst: 'Die is 17 hoor, geen dochtertje', tijd: '13:44' },
    { van: 'ria', tekst: 'Ook een kind van iemand Henk', tijd: '13:45' },

    { van: 'gerda', tekst: 'Vraag: is het niet toevallig dat de kermis er staat', tijd: '15:12' },
    { van: 'ria', tekst: 'Dat dacht ik dus ook', tijd: '15:13' },
    { van: 'henk', tekst: 'De kermis staat er elk jaar', tijd: '15:15' },
    { van: 'gerda', tekst: 'Ja en elk jaar is er gedoe', tijd: '15:16' },
    { van: 'gerda', tekst: 'Vorig jaar die scooter', tijd: '15:16' },

    {
      van: 'ria',
      tekst: '[foto] Kijk. Die achter haar. Die stond de hele avond naar de meisjes te kijken.',
      tijd: '15:47',
      levert: ['b-buurtapp-rachid'],
    },
    { van: 'gerda', tekst: 'Oh mijn god', tijd: '15:48' },
    { van: 'gerda', tekst: 'Die heb ik gezien ja', tijd: '15:48' },
    { van: 'ria', tekst: 'Ze kwamen donderdag pas binnen', tijd: '15:49' },
    { van: 'wim', tekst: 'Weet iemand hoe hij heet', tijd: '15:52' },
    { van: 'ria', tekst: 'Nee maar dat maakt niet uit', tijd: '15:53' },
    { van: 'henk', tekst: 'Ria dat is een jongen die daar werkt', tijd: '15:55' },
    { van: 'ria', tekst: 'Henk ik zeg niks ik stel een vraag', tijd: '15:56' },
    { van: 'wim', tekst: 'Doorgestuurd naar de app van de voetbal', tijd: '16:20' },
    { van: 'gerda', tekst: 'Goed zo', tijd: '16:21' },

    { kop: 'maandag 13 oktober', van: 'wim', tekst: 'Vanavond om 8 uur zoeken we het Kolkgebied af. Verzamelen bij t Anker.', tijd: '09:30' },
    { van: 'ria', tekst: 'Joost regelt koffie ❤️', tijd: '09:31' },
    { van: 'gerda', tekst: 'Wat een goede man is dat toch', tijd: '09:33' },
    { van: 'henk', tekst: 'Kolkweg heeft geen zin daar wordt gebouwd, daar kan je niet lopen', tijd: '09:40' },
    {
      van: 'wim',
      tekst: 'Kolthof zegt dat het terrein afgezet is ivm de stort morgen',
      tijd: '09:44',
      levert: ['b-buurtapp-kolkweg'],
    },
    { van: 'wim', tekst: 'We doen het bos dan', tijd: '09:44' },
    { van: 'ria', tekst: 'Prima', tijd: '09:45' },

    { kop: 'dinsdag 14 oktober', van: 'gerda', tekst: 'Is die jongen nou opgepakt of niet', tijd: '11:02' },
    { van: 'wim', tekst: 'Verhoord staat in de krant', tijd: '11:10' },
    { van: 'ria', tekst: 'Verhoord. Nou dan weet je het toch.', tijd: '11:12' },
    { van: 'henk', tekst: 'Nee Ria dan weet je helemaal niks', tijd: '11:20' },
    { van: 'henk', tekst: 'Ik ga uit deze groep', tijd: '11:21' },
  ],
}
