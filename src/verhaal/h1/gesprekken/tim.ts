import type { Gesprek } from '../../types.ts'

/* Vals spoor 1. Tim is achttien, dronken en vernederd, en hij schrijft
   dingen die er in een moordonderzoek verschrikkelijk uitzien. Precies
   daarom moet hij er zijn: de speler moet hem eerst willen hebben. */

export const tim: Gesprek = {
  id: 'g-tim',
  app: 'app-berichten',
  met: 'Tim',
  vooruitblik: 'je gaat er nog spijt van krijgen',
  berichten: [
    { kop: 'zondag 31 augustus', van: 'tim', tekst: 'meen je dit nou', tijd: '22:10' },
    { van: 'tim', tekst: 'na anderhalf jaar', tijd: '22:10' },
    { van: 'tim', tekst: 'via de app', tijd: '22:11' },
    { van: 'ik', tekst: 'ik wist niet hoe anders', tijd: '22:30' },
    { van: 'tim', tekst: 'door het te zeggen??', tijd: '22:30' },

    { kop: 'donderdag 11 september', van: 'tim', tekst: 'is er iemand anders', tijd: '01:12' },
    { van: 'tim', tekst: 'gewoon eerlijk zeggen', tijd: '01:12' },
    { van: 'tim', tekst: 'ik hoor dingen', tijd: '01:14' },
    { van: 'ik', tekst: 'wat voor dingen', tijd: '08:40' },
    { van: 'tim', tekst: 'laat maar', tijd: '08:52' },

    { kop: 'zaterdag 27 september', van: 'tim', tekst: 'ik zag je met joost praten bij de achterdeur', tijd: '23:44' },
    { van: 'tim', tekst: 'die is bijna 40 marit', tijd: '23:44' },
    { van: 'ik', tekst: 'hou je bek tim', tijd: '23:51' },
    { van: 'ik', tekst: 'echt hou gewoon je bek', tijd: '23:51' },
    { van: 'tim', tekst: 'wow', tijd: '23:52' },
    { van: 'tim', tekst: 'dus het is zo', tijd: '23:52' },

    { kop: 'zaterdag 11 oktober', van: 'tim', tekst: 'ben je er', tijd: '20:40' },
    { van: 'tim', tekst: 'ik wil even praten', tijd: '20:41' },
    { van: 'tim', tekst: 'gewoon 2 minuten', tijd: '20:55' },

    {
      van: 'tim',
      tekst: 'je hoeft niet zo te doen waar iedereen bij is',
      tijd: '21:24',
      levert: ['b-tim-dreiging'],
    },
    { van: 'tim', tekst: 'ik wou gewoon praten', tijd: '21:24' },
    { van: 'tim', tekst: 'MARIT', tijd: '21:25' },
    { van: 'tim', tekst: 'weet je wat, laat ook maar', tijd: '21:28' },
    { van: 'tim', tekst: 'je gaat er nog spijt van krijgen', tijd: '21:29' },

    { van: 'tim', tekst: 'sorry', tijd: '22:33' },
    { van: 'tim', tekst: 'ik ben dronken en ik ben een lul', tijd: '22:34' },
    { van: 'tim', tekst: 'vergeet wat ik zei', tijd: '22:34' },
    { van: 'tim', tekst: 'ik ga naar huis', tijd: '22:39' },

    { kop: 'maandag 13 oktober', van: 'tim', tekst: 'ze zeggen dat ik het gedaan heb', tijd: '16:02' },
    { van: 'tim', tekst: 'in de app van de klas', tijd: '16:02' },
    { van: 'tim', tekst: 'marit waar ben je', tijd: '16:03' },
    { van: 'tim', tekst: 'kom gewoon terug dan zeg ik nooit meer iets', tijd: '16:04' },
  ],
}
