import { useState } from 'react'
import Start from './schermen/Start'
import Spelen from './schermen/Spelen'

/* De hele app is één schakelaar. Geen router: er zijn maar een handvol
   schermen en een adresbalk met /zaak/hoofdstuk-1 erin voegt niets toe --
   je speelt dit van begin tot eind in één tabblad. */
export type Fase = 'start' | 'spelen'

export default function App() {
  const [fase, zetFase] = useState<Fase>('start')

  switch (fase) {
    case 'spelen':
      return <Spelen bijStoppen={() => zetFase('start')} />
    default:
      return <Start bijBeginnen={() => zetFase('spelen')} />
  }
}
