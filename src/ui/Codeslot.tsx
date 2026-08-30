import { useState } from 'react'
import type { Slot } from '../verhaal/types.ts'

/* Het enige moment waarop de speler zelf iets moet bedenken.

   Na drie mislukte pogingen komt het duwtje tevoorschijn. Niet eerder:
   wie het meteen weet moet dat gevoel houden. En niet later: vastzitten
   op een code is de saaiste manier om een avond te verliezen. */

type Props = {
  slot: Slot
  bijKraken: (code: string) => boolean
}

export default function Codeslot({ slot, bijKraken }: Props) {
  const [code, zetCode] = useState('')
  const [mis, zetMis] = useState(0)

  function probeer() {
    if (code.trim() === '') return
    const goed = bijKraken(code)
    if (!goed) {
      zetMis((n) => n + 1)
      zetCode('')
    }
  }

  return (
    <div className="slot">
      <span className="slot-teken" aria-hidden="true">
        🔒
      </span>
      <h2>{slot.naam}</h2>
      <p className="zacht">{slot.vraag}</p>

      <form
        className="slot-invoer"
        onSubmit={(e) => {
          e.preventDefault()
          probeer()
        }}
      >
        <input
          className="codeveld"
          value={code}
          onChange={(e) => zetCode(e.target.value)}
          placeholder="· · · · · ·"
          inputMode="numeric"
          autoComplete="off"
          aria-label="Code"
        />
        <button className="knop hoofd" type="submit" disabled={code.trim() === ''}>
          Ontgrendel
        </button>
      </form>

      {mis > 0 && (
        <p className="slot-mis">
          {mis === 1
            ? 'Onjuist.'
            : `Onjuist. ${mis} pogingen.`}
        </p>
      )}

      {mis >= 3 && (
        <p className="slot-duwtje">
          <strong>Aanwijzing</strong>
          {slot.duwtje}
        </p>
      )}
    </div>
  )
}
