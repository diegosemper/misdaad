import type { Persoon } from '../types.ts'

/* De veertien mensen van Westerveld. 'ik' is Marit zelf: haar telefoon is
   uitgelezen, dus in elk gesprek is zij de rechterkant. */

export const personen: Persoon[] = [
  { id: 'ik', naam: 'Marit de Vries', letters: 'MV', rol: 'slachtoffer, 17 jaar' },
  { id: 'ellen', naam: 'Ellen de Vries', letters: 'EV', rol: 'moeder, 43' },
  { id: 'ruud', naam: 'Ruud Kolthof', letters: 'RK', rol: 'stiefvader, 49, aannemer' },
  { id: 'dylan', naam: 'Dylan Kolthof', letters: 'DK', rol: 'stiefbroer, 20' },
  { id: 'peter', naam: 'Peter de Vries', letters: 'PV', rol: 'vader, 46, woont in Zutphen' },
  { id: 'sanne', naam: 'Sanne Bosma', letters: 'SB', rol: 'beste vriendin, 17' },
  { id: 'joost', naam: 'Joost Bakker', letters: 'JB', rol: "uitbater café 't Anker, 38" },
  { id: 'tim', naam: 'Tim Wielinga', letters: 'TW', rol: 'ex, 18' },
  { id: 'rachid', naam: 'Rachid El Amrani', letters: 'RE', rol: 'kermisexploitant, 19' },
  { id: 'ineke', naam: 'Ineke Slot', letters: 'IS', rol: 'buurvrouw Molenweg 14, 61' },
  { id: 'wouter', naam: 'Wouter Prins', letters: 'WP', rol: 'wethouder, 52' },
  { id: 'nadia', naam: 'Nadia Berger', letters: 'NB', rol: 'lerares Nederlands, 34' },
  { id: 'gerrit', naam: 'Gerrit Hoving', letters: 'GH', rol: 'boer Bemmelseweg, 58' },
  { id: 'karin', naam: 'Karin Nijhof', letters: 'KN', rol: 'boekhouder Kolthof Bouw, 40' },

  /* Randfiguren uit de buurtapp. Ze doen niets in de zaak en dat is precies
     wat ze doen: ze praten. */
  { id: 'ria', naam: 'Ria', letters: 'R', rol: 'buurtapp' },
  { id: 'henk', naam: 'Henk', letters: 'H', rol: 'buurtapp' },
  { id: 'gerda', naam: 'Gerda', letters: 'G', rol: 'buurtapp' },
  { id: 'wim', naam: 'Wim', letters: 'W', rol: 'buurtapp' },
]

export function persoon(id: string): Persoon {
  return (
    personen.find((p) => p.id === id) ?? {
      id,
      naam: id,
      letters: '??',
      rol: '',
    }
  )
}
