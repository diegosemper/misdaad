import { useState } from 'react'
import type { Hoofdstuk } from '../verhaal/types.ts'
import type { Toestand } from '../engine/zaak.ts'
import { taken } from '../engine/zaak.ts'

/* Wat je nu moet uitzoeken. Staat altijd in beeld en werkt bij op het
   moment dat je een draadje legt -- je ziet een regel doorstrepen
   terwijl je kijkt.

   Alleen open taken staan er standaard, want een lijst waar ook alle
   afgeronde regels op blijven staan wordt binnen een uur langer dan het
   scherm. De afgeronde zitten achter één regel, zodat je wel kunt
   terugzien wat je al gehad hebt.

   Taken uit eerdere fases krijgen hun fasenummer mee. Ze houden je
   nergens tegen; ze staan er zodat een zijspoor dat je hebt laten liggen
   niet stilletjes uit beeld verdwijnt. */

type Props = {
  hoofdstuk: Hoofdstuk
  toestand: Toestand
}

export default function Takenlijst({ hoofdstuk, toestand }: Props) {
  const [uitgeklapt, zetUitgeklapt] = useState(true)
  const [toonAf, zetToonAf] = useState(false)

  const { open, af } = taken(hoofdstuk, toestand)

  return (
    <section className="takenlijst">
      <button
        className="takenkop"
        onClick={() => zetUitgeklapt((x) => !x)}
        aria-expanded={uitgeklapt}
      >
        <span className="takenpijl" aria-hidden="true">
          {uitgeklapt ? '▾' : '▸'}
        </span>
        <span className="takentitel">Te doen</span>
        <span className="takenteller">{open.length}</span>
        {!uitgeklapt && open.length > 0 && (
          <span className="takenvoorproefje">{open[0].tekst}</span>
        )}
      </button>

      {uitgeklapt && (
        <>
          <ul className="taken">
            {open.map((taak) => (
              <li key={taak.id} className="taak">
                <span className="taakvak" aria-hidden="true" />
                <span className="taaktekst">
                  {taak.laag < toestand.laag && (
                    <span className="taakfase">fase {taak.laag}</span>
                  )}
                  {taak.tekst}
                </span>
              </li>
            ))}
            {open.length === 0 && (
              <li className="taak leeg">
                Alles van deze fase is uitgezocht. Er komt iets binnen zodra je
                verder bent.
              </li>
            )}
          </ul>

          {af.length > 0 && (
            <>
              <button className="takenaf" onClick={() => zetToonAf((x) => !x)}>
                {toonAf ? 'Verberg' : 'Toon'} {af.length} afgerond
              </button>
              {toonAf && (
                <ul className="taken">
                  {af.map((taak) => (
                    <li key={taak.id} className="taak gedaan">
                      <span className="taakvak vol" aria-hidden="true">
                        ✓
                      </span>
                      <span className="taaktekst">{taak.tekst}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </section>
  )
}
