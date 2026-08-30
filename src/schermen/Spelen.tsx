import { useEffect, useRef, useState } from 'react'
import { hoofdstuk1 } from '../verhaal/h1/index.ts'
import type { Melding, Toestand, Uitkomst } from '../engine/zaak.ts'
import {
  beginToestand,
  huidigeLaag,
  kraak,
  markeerGelezen,
  pakOp,
  verbind,
  vordering,
} from '../engine/zaak.ts'
import { bewaar, laad, wis } from '../opslag/voortgang.ts'
import Telefoon from '../ui/Telefoon'
import Prikbord from '../ui/Prikbord'

/* Het speelscherm. Houdt de toestand vast, geeft hem door aan de twee
   panelen, en bewaart hem na élke wijziging -- je speelt hier uren aan,
   dus "opslaan" mag geen handeling zijn die je kunt vergeten.

   Op een breed scherm staan telefoon en bord naast elkaar. Op een
   telefoon niet: dan zijn het twee tabbladen, want twee kolommen van
   180 pixels leest niemand. */

let volgnummer = 0

type Briefje = { nr: number; melding: Melding }

export default function Spelen({ bijStoppen }: { bijStoppen: () => void }) {
  const [toestand, zetToestand] = useState<Toestand>(
    () => laad() ?? beginToestand(hoofdstuk1),
  )
  const [briefjes, zetBriefjes] = useState<Briefje[]>([])
  const [tab, zetTab] = useState<'telefoon' | 'bord'>('telefoon')
  const [laagKaart, zetLaagKaart] = useState(false)

  const klokken = useRef<number[]>([])

  useEffect(() => {
    bewaar(toestand)
  }, [toestand])

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
      const duur = briefje.melding.soort === 'verband' ? 9000 : 4500
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

  const laag = huidigeLaag(hoofdstuk1, toestand)

  return (
    <div className="speelscherm">
      <header className="balk">
        <button className="knop kaal" onClick={bijStoppen}>
          ←
        </button>
        <div className="balkmidden">
          <span className="stempel">
            Zaak 2026-0417 · fase {laag.nr} — {laag.titel}
          </span>
          <div className="meter" aria-hidden="true">
            <div className="metervulling" style={{ width: `${vordering(hoofdstuk1, toestand)}%` }} />
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
          className={'tab' + (tab === 'telefoon' ? ' aan' : '')}
          onClick={() => zetTab('telefoon')}
        >
          Werkomgeving
        </button>
        <button
          className={'tab' + (tab === 'bord' ? ' aan' : '')}
          onClick={() => zetTab('bord')}
        >
          Het bord
          {toestand.verzameld.length > 0 && (
            <span className="teller">{toestand.verzameld.length}</span>
          )}
        </button>
      </nav>

      <main className="panelen">
        <div className={'kolom' + (tab === 'telefoon' ? ' aan' : '')}>
          <Telefoon
            hoofdstuk={hoofdstuk1}
            toestand={toestand}
            bijOpenen={(id) => zetToestand((t) => markeerGelezen(t, id))}
            bijOppakken={(id) => verwerk(pakOp(hoofdstuk1, toestand, id))}
            bijKraken={(slotId, code) => {
              const uitkomst = kraak(hoofdstuk1, toestand, slotId, code)
              verwerk(uitkomst)
              return uitkomst.meldingen.some((m) => m.soort === 'slot-open')
            }}
          />
        </div>
        <div className={'kolom' + (tab === 'bord' ? ' aan' : '')}>
          <Prikbord
            hoofdstuk={hoofdstuk1}
            toestand={toestand}
            bijVerbinden={(a, b) => verwerk(verbind(hoofdstuk1, toestand, a, b))}
          />
        </div>
      </main>

      <div className="briefjes">
        {briefjes.map(({ nr, melding }) => (
          <div key={nr} className={`briefje ${soortvanMelding(melding)}`}>
            {tekstVanMelding(melding)}
          </div>
        ))}
      </div>

      {laagKaart && (
        <div className="overlay" onClick={() => zetLaagKaart(false)}>
          <div className="opdrachtkaart" onClick={(e) => e.stopPropagation()}>
            <p className="stempel">Fase {laag.nr}</p>
            <h2>{laag.titel}</h2>
            <p>{laag.opdracht}</p>
            <button className="knop hoofd" onClick={() => zetLaagKaart(false)}>
              Aan het werk
            </button>
            <button
              className="knop gevaar"
              onClick={() => {
                if (!confirm('Alles wissen en opnieuw beginnen?')) return
                wis()
                zetToestand(beginToestand(hoofdstuk1))
                zetLaagKaart(false)
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

function soortvanMelding(m: Melding): string {
  switch (m.soort) {
    case 'verband':
      return 'goed'
    case 'slot-open':
      return 'goed'
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
