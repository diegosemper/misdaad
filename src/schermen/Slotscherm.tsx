import type { Hoofdstuk } from '../verhaal/types.ts'
import { persoon } from '../verhaal/h1/personen.ts'
import type { Uitspraak } from '../App'

/* Het einde. Drie mogelijke, en geen ervan is een felicitatie.

   Wie het mis heeft mag terug naar het onderzoek -- niet om de uitspraak
   over te doen, maar om te zien wat hij gemist heeft. Het spel liegt daar
   niet over: als je ernaast zat, staat er wie het wél was. Een detective
   die je in het ongewisse laat is geen mysterie maar een grap. */

type Props = {
  hoofdstuk: Hoofdstuk
  uitspraak: Uitspraak
  bijTerug: () => void
  bijOpnieuw: () => void
}

export default function Slotscherm({
  hoofdstuk,
  uitspraak,
  bijTerug,
  bijOpnieuw,
}: Props) {
  const { oordeel } = uitspraak
  const einde = hoofdstuk.eindes[oordeel.einde]
  const beschuldigde = persoon(uitspraak.persoon)
  const dader = persoon(hoofdstuk.dader.persoon)

  const tekst = einde.tekst.replaceAll('{naam}', beschuldigde.naam)

  return (
    <div className="scherm">
      <div className="slotinhoud">
        <p className="stempel">Zaak 2026-0417 — afdoening</p>
        <h1 className="slottitel">{einde.titel}</h1>

        <p className="slotregel">
          Je beschuldigde <strong>{beschuldigde.naam}</strong> en droeg{' '}
          {oordeel.sterkte} van de drie dragende bewijsstukken aan.
        </p>

        {tekst.split('\n\n').map((alinea, i) => (
          <p key={i} className="slottekst">
            {alinea}
          </p>
        ))}

        {oordeel.einde !== 'sluitend' && (
          <div className="onthulling">
            <h3>Wat er werkelijk gebeurde</h3>
            <p>
              Marit de Vries is om het leven gebracht door{' '}
              <strong>{dader.naam}</strong>, haar stiefvader, in zijn bus aan de
              Kolkweg, tussen kwart voor twaalf en twintig over twaalf.
            </p>
            <p>
              De drie stukken die het sluitend maken zijn de mastgegevens van zijn
              toestel, de tweede verklaring van Ineke Slot, en haar eigen notitie
              "boodschappen".
            </p>
            {oordeel.einde === 'zwak' && (
              <p className="zacht">
                Je had de juiste man. Je droeg alleen niet aan waarmee je hem kon
                houden.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="onderaan">
        <button className="knop" onClick={bijTerug}>
          Terug naar het dossier
        </button>
        <button className="knop kaal" onClick={bijOpnieuw}>
          De zaak opnieuw beginnen
        </button>
      </div>
    </div>
  )
}
