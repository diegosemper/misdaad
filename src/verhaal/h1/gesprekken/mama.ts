import type { Gesprek } from '../../types.ts'

/* Ellen. Wat hier staat is bijna niets, en dat is het punt: moeder en
   dochter woonden in hetzelfde huis en spraken elkaar via boodschappen
   en wasmachines. In het laatste stuk zie je iemand die te laat wakker
   wordt en het nooit meer inhaalt. */

export const mama: Gesprek = {
  id: 'g-mama',
  app: 'app-berichten',
  met: 'Mama',
  vooruitblik: 'waar BEN je',
  berichten: [
    { kop: 'donderdag 18 september', van: 'ellen', tekst: 'wil je brood meenemen', tijd: '16:20' },
    { van: 'ik', tekst: 'ok', tijd: '16:44' },

    { kop: 'zondag 21 september', van: 'ellen', tekst: 'ruud vraagt of je zaterdag kan helpen bij de loods', tijd: '11:02' },
    { van: 'ik', tekst: 'nee', tijd: '11:30' },
    { van: 'ellen', tekst: 'hij vraagt het netjes', tijd: '11:31' },
    { van: 'ik', tekst: 'ik zei nee', tijd: '11:33' },
    { van: 'ellen', tekst: 'wat is er toch met jou de laatste tijd', tijd: '11:35' },

    { kop: 'dinsdag 30 september', van: 'ik', tekst: 'mam', tijd: '22:40' },
    { van: 'ik', tekst: 'ben je wakker', tijd: '22:40' },
    { van: 'ik', tekst: 'ik wil iets vragen', tijd: '22:41' },
    { van: 'ik', tekst: 'over ruud', tijd: '22:52' },
    { van: 'ellen', tekst: 'sorry ik was in slaap gevallen', tijd: '07:10' },
    { van: 'ellen', tekst: 'wat was er', tijd: '07:10' },
    { van: 'ik', tekst: 'niks', tijd: '07:41' },

    { kop: 'zaterdag 11 oktober', van: 'ellen', tekst: 'niet te laat he', tijd: '19:30' },
    { van: 'ik', tekst: 'nee', tijd: '19:31' },
    { van: 'ellen', tekst: 'ik ga zo liggen ik ben kapot', tijd: '21:14' },

    {
      kop: 'zondag 12 oktober',
      van: 'ellen',
      tekst: 'waar ben je',
      tijd: '09:11',
      levert: ['b-mama-zondag'],
    },
    { van: 'ellen', tekst: 'neem je telefoon op', tijd: '09:11' },
    { van: 'ellen', tekst: 'marit alsjeblieft', tijd: '09:13' },
    { van: 'ellen', tekst: 'ik heb sanne gebeld die zegt dat je om kwart over tien wegging', tijd: '09:20' },
    { van: 'ellen', tekst: 'waar BEN je', tijd: '09:20' },
    { van: 'ellen', tekst: 'ruud zegt dat ik rustig moet doen', tijd: '10:40' },
    { van: 'ellen', tekst: 'ik kan niet rustig doen', tijd: '10:40' },

    { kop: 'maandag 13 oktober', van: 'ellen', tekst: 'je had me dinsdag iets willen vragen', tijd: '02:14' },
    { van: 'ellen', tekst: 'ik lag te slapen', tijd: '02:14' },
    { van: 'ellen', tekst: 'ik lig altijd te slapen', tijd: '02:15' },
    { van: 'ellen', tekst: 'kom alsjeblieft naar huis dan mag je alles vragen', tijd: '02:18' },
  ],
}
