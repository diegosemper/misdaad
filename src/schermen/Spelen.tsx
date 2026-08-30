import { useEffect, useRef, useState } from 'react'
import type { Hoofdstuk } from '../verhaal/types.ts'
import type { Melding, Toestand, Uitkomst } from '../engine/zaak.ts'
import {
  huidigeLaag,
  kraak,
  magBeschuldigen,
  markeerGelezen,
  pakOp,
  verbind,
  vordering,
} from '../engine/zaak.ts'
import { wijzer as berekenWijzer } from '../engine/wijzer.ts'
import Telefoon from '../ui/Telefoon'
import Prikbord from '../ui/Prikbord'
import Takenlijst from '../ui/Takenlijst'

/* Het speelscherm. Geeft de toestand door aan de twee panelen en zet de
   meldingen om in briefjes onderin.

   Op een breed scherm staan telefoon en bord naast elkaar. Op een
   telefoon niet: dan zijn het twee tabbladen, want twee kolommen van
   180 pixels leest niemand. */

let volgnummer = 0

type Briefje = { nr: number; melding: Melding }

type Props = {
  hoofdstuk: Hoofdstuk
  toestand: Toestand
  zetToestand: (t: Toestand) => void
  bijStoppen: () => void
  bijBeschuldigen: () => void
  bijOpnieuw: () => void
}

export default function Spelen({
  hoofdstuk,
  toestand,
  zetToestand,
  bijStoppen,
  bijBeschuldigen,
  bijOpnieuw,
}: Props) {
  const [briefjes, zetBriefjes] = useState<Briefje[]>([])
  const [tab, zetTab] = useState<'telefoon' | 'bord'>('telefoon')
  const [laagKaart, zetLaagKaart] = useState(false)

  const klokken = useRef<number[]>([])

  // Aflopende briefjes netjes opruimen, ook als het scherm tussentijds weg is.
  useEffect(() => {
    const lopende = klokken.current
    return () => lopende.forEach((k) => clearTimeout(k))
  }, [])

  function toon(meldingen: Melding[]) {
    if (meldingen.length === 0) return
    const nieuwe = meldingen.map((melding) => ({ nr: volgnummer++, melding }))
    zetBriefjes((oud) => [...oud, ...nieuwe])

    for (const briefje of nieuwe) {
      const duur = briefje.melding.soort === 'verband' ? 11000 : 4500
      const klok = window.setTimeout(() => {
        zetBriefjes((oud) => oud.filter((b) => b.nr !== briefje.nr))
      }, duur)
      klokken.current.push(klok)
    }

    if (meldingen.some((m) => m.soort === 'laag')) zetLaagKaart(true)
  }

  function verwerk(uitkomst: Uitkomst) {
    zetToestand(uitkomst.toestand)
    toon(uitkomst.meldingen)
  }

  const laag = huidigeLaag(hoofdstuk, toestand)
  const wijzer = berekenWijzer(hoofdstuk, toestand)
  const magWijzen = magBeschuldigen(hoofdstuk, toestand)

  return (
    <div className="speelscherm">
      <header className="balk">
        <button className="knop kaal" onClick={bijStoppen} aria-label="Terug">
          ←
        </button>
        <div className="balkmidden">
          <span className="stempel">
            Fase {laag.nr} — {laag.titel}
          </span>
          <div className="meter" aria-hidden="true">
            <div
              className="metervulling"
              style={{ width: `${vordering(hoofdstuk, toestand)}%` }}
            />
          </div>
        </div>
        <button
          className="knop kaal"
          onClick={() => zetLaagKaart(true)}
          aria-label="Opdracht"
        >
          ?
        </button>
      </header>

      <nav className="tabs">
        <button
          className={
            'tab' +
            (tab === 'telefoon' ? ' aan' : '') +
            (wijzer.apps.length > 0 && tab !== 'telefoon' ? ' wijst' : '')
          }
          onClick={() => zetTab('telefoon')}
        >
          Werkomgeving
        </button>
        <button
          className={
            'tab' +
            (tab === 'bord' ? ' aan' : '') +
            (wijzer.bord && tab !== 'bord' ? ' wijst' : '')
          }
          onClick={() => zetTab('bord')}
        >
          Het bord
          {toestand.verzameld.length > 0 && (
            <span className="teller">{toestand.verzameld.length}</span>
          )}
        </button>
      </nav>

      <Takenlijst hoofdstuk={hoofdstuk} toestand={toestand} />

      <main className="panelen">
        <div className={'kolom' + (tab === 'telefoon' ? ' aan' : '')}>
          <Telefoon
            hoofdstuk={hoofdstuk}
            toestand={toestand}
            wijzer={wijzer}
            bijOpenen={(id) => zetToestand(markeerGelezen(toestand, id))}
            bijOppakken={(id) => verwerk(pakOp(hoofdstuk, toestand, id))}
            bijKraken={(slotId, code) => {
              const uitkomst = kraak(hoofdstuk, toestand, slotId, code)
              verwerk(uitkomst)
              return uitkomst.meldingen.some((m) => m.soort === 'slot-open')
            }}
          />
        </div>
        <div className={'kolom' + (tab === 'bord' ? ' aan' : '')}>
          <Prikbord
            hoofdstuk={hoofdstuk}
            toestand={toestand}
            bijVerbinden={(a, b) => verwerk(verbind(hoofdstuk, toestand, a, b))}
          />
          {magWijzen && (
            <div className="paneel">
              <button className="knop hoofd" onClick={bijBeschuldigen}>
                Iemand aanwijzen
              </button>
              <p className="paneelvoet">
                Je hebt genoeg om een naam te noemen. Of je genoeg hebt om hem vast te
                houden is een andere vraag.
              </p>
            </div>
          )}
        </div>
      </main>

      <div className="briefjes">
        {briefjes.map(({ nr, melding }) => (
          <div key={nr} className={`briefje ${soortVanMelding(melding)}`}>
            {tekstVanMelding(melding)}
          </div>
        ))}
      </div>

      {laagKaart && (
        <div className="overlay" onClick={() => zetLaagKaart(false)}>
          <div className="opdrachtkaart" onClick={(e) => e.stopPropagation()}>
            <p className="stempel">Fase {laag.nr} van 5</p>
            <h2>{laag.titel}</h2>
            <p>{laag.opdracht}</p>
            <button className="knop hoofd" onClick={() => zetLaagKaart(false)}>
              Aan het werk
            </button>
            <button
              className="knop gevaar"
              onClick={() => {
                if (!confirm('Alles wissen en opnieuw beginnen?')) return
                bijOpnieuw()
              }}
            >
              Zaak opnieuw beginnen
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function soortVanMelding(m: Melding): string {
  switch (m.soort) {
    case 'verband':
    case 'slot-open':
    case 'laag':
      return 'goed'
    case 'geen-verband':
    case 'slot-fout':
      return 'mis'
    default:
      return ''
  }
}

function tekstVanMelding(m: Melding): string {
  switch (m.soort) {
    case 'opgepakt':
      return `Op het bord: ${m.titel}`
    case 'verband':
      return (
        m.verband.conclusie +
        (m.nieuw.length > 0 ? '\n\nEr is iets nieuws binnengekomen.' : '')
      )
    case 'al-gelegd':
      return 'Dat draadje ligt er al.'
    case 'geen-verband':
      return 'Deze twee zeggen samen niets.'
    case 'slot-open':
      return `${m.naam} is open.`
    case 'slot-fout':
      return 'Die code klopt niet.'
    case 'laag':
      return `Fase ${m.laag.nr}: ${m.laag.titel}`
  }
}
