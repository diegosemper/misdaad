import type { Gesprek } from '../../types.ts'

/* Vals spoor 3, en het zwaarste. Joost Bakker is écht schuldig -- aan
   iets anders. Alles aan dit gesprek wijst naar hem: hij liegt, hij wist
   berichten, hij heeft een motief dat je in één zin kunt uitleggen.

   Wat hij niet heeft is de tijd. Dat staat in de kassa-uitdraai, en die
   ligt in een andere app. Wie deze chat leest en meteen naar het
   beschuldigingsscherm loopt, klaagt de verkeerde aan.

   De ingetrokken berichten staan er als `hersteld`. Zo ziet de speler
   letterlijk wat iemand had willen wissen. */

export const joost: Gesprek = {
  id: 'g-joost',
  app: 'app-berichten',
  met: "Werk 't Anker",
  vooruitblik: 'ben je er nog',
  berichten: [
    { kop: 'zaterdag 12 april', van: 'joost', tekst: 'Marit kun jij zaterdag een uurtje eerder', tijd: '11:20' },
    { van: 'ik', tekst: 'ja hoor', tijd: '11:44' },
    { van: 'joost', tekst: 'top. je bent m\'n beste', tijd: '11:45' },

    { kop: 'vrijdag 2 mei', van: 'joost', tekst: 'ben je er nog', tijd: '00:52', hersteld: true },
    { van: 'joost', tekst: 'ik zat te denken aan vanavond', tijd: '00:58', hersteld: true },
    { van: 'joost', tekst: 'je bent echt anders dan de rest hier', tijd: '01:03', hersteld: true },
    { van: 'ik', tekst: 'ik ga slapen joost', tijd: '01:11' },
    {
      van: 'joost',
      tekst: 'niet aan je moeder vertellen he. dan wordt het raar op het werk en dat wil jij ook niet.',
      tijd: '01:14',
      hersteld: true,
      levert: ['b-joost-gewist'],
    },

    { kop: 'zondag 22 juni', van: 'joost', tekst: 'je stiefvader kwam langs', tijd: '13:02', hersteld: true },
    { van: 'joost', tekst: 'we hebben het uitgepraat', tijd: '13:02', hersteld: true },
    { van: 'joost', tekst: 'dus je hoeft je nergens druk over te maken', tijd: '13:03', hersteld: true },
    { van: 'ik', tekst: 'wat hebben jullie uitgepraat', tijd: '14:20' },
    { van: 'ik', tekst: 'joost', tijd: '15:02' },
    { van: 'ik', tekst: 'WAT hebben jullie uitgepraat', tijd: '16:30' },
    { van: 'joost', tekst: 'zakelijk. laat maar los.', tijd: '18:44', hersteld: true },

    { kop: 'donderdag 3 juli', van: 'joost', tekst: 'kolthof begint maandag aan de zaal', tijd: '09:10' },
    { van: 'joost', tekst: 'dus het is allemaal goed gekomen', tijd: '09:10', hersteld: true },
    { van: 'ik', tekst: 'je hebt hem betaald', tijd: '09:31' },
    { van: 'joost', tekst: 'ik heb hem een opdracht gegeven', tijd: '09:33', hersteld: true },
    { van: 'joost', tekst: 'dat is wat anders', tijd: '09:33', hersteld: true },

    { kop: 'zaterdag 27 september', van: 'joost', tekst: 'je kijkt me niet meer aan', tijd: '01:40', hersteld: true },
    { van: 'joost', tekst: 'dat valt mensen op', tijd: '01:41', hersteld: true },
    { van: 'joost', tekst: 'denk daar even over na', tijd: '01:41', hersteld: true },

    { kop: 'donderdag 9 oktober', van: 'ik', tekst: 'ik ga maandag naar de politie', tijd: '23:58' },
    { van: 'joost', tekst: 'doe niet zo raar', tijd: '00:04', hersteld: true },
    { van: 'joost', tekst: 'marit', tijd: '00:31', hersteld: true },
    { van: 'joost', tekst: 'je gaat dit niet kapotmaken', tijd: '01:12', hersteld: true },
    { van: 'joost', tekst: 'wie denk je dat ze geloven', tijd: '01:40', hersteld: true },
    {
      van: 'joost',
      tekst: 'ik heb je ouders erbij gehaald, denk daar maar eens over na',
      tijd: '01:47',
      hersteld: true,
    },

    { kop: 'zaterdag 11 oktober', van: 'ik', tekst: 'ik kom vanavond langs. achterom.', tijd: '18:12' },
    { van: 'joost', tekst: 'goed', tijd: '18:40' },

    { kop: 'zondag 12 oktober', van: 'joost', tekst: 'Ik hoor net van Marit. Verschrikkelijk. Laat weten of ik iets kan doen.', tijd: '16:20' },
  ],
}
