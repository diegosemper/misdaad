import { useState } from 'react'
import type { Hoofdstuk } from '../verhaal/types.ts'
import type { Toestand } from '../engine/zaak.ts'
import { beoordeel } from '../engine/beschuldiging.ts'
import { persoon } from '../verhaal/h1/personen.ts'
import type { Uitspraak } from '../App'

/* Een naam noemen is niet genoeg. Je legt er drie bewijsstukken bij, en
   die moeten het dragen.

   Twee dingen doet dit scherm met opzet niet. Het zegt niet welk bewijs
   sterk is -- dat is precies de vraag. En het waarschuwt je niet als je
   er naast zit, ook niet als je overduidelijk de verkeerde aanwijst.
   Eén keer indrukken en het is gebeurd, net als in het echt. */

type Props = {
  hoofdstuk: Hoofdstuk
  toestand: Toestand
  bijTerug: () => void
  bijUitspraak: (uitspraak: Uitspraak) => void
}

export default function Beschuldiging({
  hoofdstuk,
  toestand,
  bijTerug,
  bijUitspraak,
}: Props) {
  const [wie, zetWie] = useState<string | null>(null)
  const [gekozen, zetGekozen] = useState<string[]>([])
  const [zeker, zetZeker] = useState(false)

  const stukken = toestand.verzameld
    .map((id) => hoofdstuk.bewijs.find((b) => b.id === id))
    .filter((b): b is NonNullable<typeof b> => b !== undefined)

  const compleet = wie !== null && gekozen.length === 3

  function wissel(id: string) {
    zetGekozen((oud) => {
      if (oud.includes(id)) return oud.filter((x) => x !== id)
      if (oud.length >= 3) return oud
      return [...oud, id]
    })
  }

  return (
    <div className="scherm">
      <button className="knop kaal terug" onClick={bijTerug}>
        ← Terug naar het onderzoek
      </button>

      <p className="stempel">Zaak 2026-0417 — vordering</p>
      <h2>Wie heeft Marit de Vries om het leven gebracht?</h2>

      <div className="verdachten">
        {hoofdstuk.verdachten.map((id) => {
          const p = persoon(id)
          return (
            <button
              key={id}
              className={'verdachte' + (wie === id ? ' gekozen' : '')}
              onClick={() => zetWie(id)}
            >
              <span className="rondje">{p.letters}</span>
              <span className="lijsttekst">
                <span className="lijsttitel">{p.naam}</span>
                <span className="lijstregeltje">{p.rol}</span>
              </span>
            </button>
          )
        })}
      </div>

      <h3>Drie bewijsstukken die het dragen — {gekozen.length} van 3</h3>
      <p className="paneelvoet">
        Alleen wat op je bord ligt. Kies verkeerd en de zaak houdt geen stand, ook
        niet als je de juiste persoon aanwijst.
      </p>

      <div className="bewijskeuze">
        {stukken.map((b) => (
          <button
            key={b.id}
            className={'kaartje' + (gekozen.includes(b.id) ? ' gekozen' : '')}
            onClick={() => wissel(b.id)}
            disabled={gekozen.length >= 3 && !gekozen.includes(b.id)}
          >
            <span className="kaartsoort">{b.soort}</span>
            <span className="kaarttitel">{b.titel}</span>
            <span className="kaartbron">{b.bron}</span>
          </button>
        ))}
      </div>

      <div className="onderaan">
        {!zeker ? (
          <button
            className="knop hoofd"
            disabled={!compleet}
            onClick={() => zetZeker(true)}
          >
            {compleet
              ? `Beschuldig ${persoon(wie).naam}`
              : wie === null
                ? 'Wijs eerst iemand aan'
                : `Nog ${3 - gekozen.length} bewijsstuk${gekozen.length === 2 ? '' : 'ken'}`}
          </button>
        ) : (
          <>
            <p className="waarschuwing">
              <strong>Dit is definitief</strong>
              Zodra je dit indient wordt er niets meer onderzocht. Er is geen tweede
              poging.
            </p>
            <button
              className="knop hoofd"
              onClick={() =>
                bijUitspraak({
                  persoon: wie!,
                  bewijs: gekozen,
                  oordeel: beoordeel(hoofdstuk, wie!, gekozen),
                })
              }
            >
              Dien in
            </button>
            <button className="knop kaal" onClick={() => zetZeker(false)}>
              Toch nog niet
            </button>
          </>
        )}
      </div>
    </div>
  )
}
