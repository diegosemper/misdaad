import { useEffect, useState } from 'react'
import { hoofdstuk1 } from './verhaal/h1/index.ts'
import type { Oordeel } from './engine/beschuldiging.ts'
import type { Toestand } from './engine/zaak.ts'
import { beginToestand } from './engine/zaak.ts'
import { bewaar, laad, wis } from './opslag/voortgang.ts'
import Start from './schermen/Start'
import Spelen from './schermen/Spelen'
import Beschuldiging from './schermen/Beschuldiging'
import Slotscherm from './schermen/Slotscherm'

/* De hele app is één schakelaar. Geen router: er zijn vier schermen en
   een adresbalk met /zaak/hoofdstuk-1 erin voegt niets toe -- je speelt
   dit van begin tot eind in één tabblad.

   De toestand van de zaak staat hier en niet in Spelen, omdat het
   beschuldigingsscherm hem ook nodig heeft: je kunt alleen bewijs
   aandragen dat je daadwerkelijk op het bord hebt liggen. */

export type Fase = 'start' | 'spelen' | 'beschuldiging' | 'slot'

export type Uitspraak = {
  persoon: string
  bewijs: string[]
  oordeel: Oordeel
}

export default function App() {
  const [fase, zetFase] = useState<Fase>('start')
  const [toestand, zetToestand] = useState<Toestand>(
    () => laad() ?? beginToestand(hoofdstuk1),
  )
  const [uitspraak, zetUitspraak] = useState<Uitspraak | null>(null)

  // Na élke wijziging bewaren. Je speelt hier uren aan, dus opslaan mag
  // geen handeling zijn die je kunt vergeten.
  useEffect(() => {
    bewaar(toestand)
  }, [toestand])

  function opnieuw() {
    wis()
    zetToestand(beginToestand(hoofdstuk1))
    zetUitspraak(null)
    zetFase('start')
  }

  switch (fase) {
    case 'spelen':
      return (
        <Spelen
          hoofdstuk={hoofdstuk1}
          toestand={toestand}
          zetToestand={zetToestand}
          bijStoppen={() => zetFase('start')}
          bijBeschuldigen={() => zetFase('beschuldiging')}
          bijOpnieuw={opnieuw}
        />
      )
    case 'beschuldiging':
      return (
        <Beschuldiging
          hoofdstuk={hoofdstuk1}
          toestand={toestand}
          bijTerug={() => zetFase('spelen')}
          bijUitspraak={(u) => {
            zetUitspraak(u)
            zetFase('slot')
          }}
        />
      )
    case 'slot':
      return uitspraak ? (
        <Slotscherm
          hoofdstuk={hoofdstuk1}
          uitspraak={uitspraak}
          bijTerug={() => zetFase('spelen')}
          bijOpnieuw={opnieuw}
        />
      ) : (
        <Start bijBeginnen={() => zetFase('spelen')} />
      )
    default:
      return <Start bijBeginnen={() => zetFase('spelen')} />
  }
}
