import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Hoofdstuk } from '../verhaal/types.ts'
import type { Toestand } from '../engine/zaak.ts'
import { conclusies } from '../engine/zaak.ts'

/* ─────────────────────────────────────────────────────────────
   HET BORD

   Tikken, niet slepen. Op een telefoon is een draadje trekken tussen
   twee kaartjes een kwelling; twee keer tikken werkt met een muis én met
   een duim, en je kunt er niet per ongeluk naast zitten.

   De draadjes zijn echte lijnen in een SVG-laag áchter de kaartjes. De
   posities meten we op na elke layout, want de kaartjes zitten in een
   gewoon raster dat meebeweegt met de breedte van het scherm. Zonder die
   hermeting hangen de draadjes na het draaien van je telefoon in de
   lucht.
   ───────────────────────────────────────────────────────────── */

type Lijn = { id: string; x1: number; y1: number; x2: number; y2: number }

type Props = {
  hoofdstuk: Hoofdstuk
  toestand: Toestand
  bijVerbinden: (a: string, b: string) => void
}

export default function Prikbord({ hoofdstuk, toestand, bijVerbinden }: Props) {
  const [gekozen, zetGekozen] = useState<string | null>(null)
  const [opgelicht, zetOpgelicht] = useState<string | null>(null)
  const [lijnen, zetLijnen] = useState<Lijn[]>([])

  const bord = useRef<HTMLDivElement>(null)
  const kaarten = useRef<Record<string, HTMLElement | null>>({})

  const stukken = toestand.verzameld
    .map((id) => hoofdstuk.bewijs.find((b) => b.id === id))
    .filter((b): b is NonNullable<typeof b> => b !== undefined)

  const gelegd = conclusies(hoofdstuk, toestand)

  /** Meet waar elk draadje moet lopen, in coördinaten van het bord zelf. */
  const meet = useCallback(() => {
    const doos = bord.current?.getBoundingClientRect()
    if (!doos) return

    const nieuw: Lijn[] = []
    for (const v of gelegd) {
      const a = kaarten.current[v.van]
      const b = kaarten.current[v.naar]
      if (!a || !b) continue
      const ka = a.getBoundingClientRect()
      const kb = b.getBoundingClientRect()
      nieuw.push({
        id: v.id,
        x1: ka.left - doos.left + ka.width / 2,
        y1: ka.top - doos.top + ka.height / 2,
        x2: kb.left - doos.left + kb.width / 2,
        y2: kb.top - doos.top + kb.height / 2,
      })
    }
    zetLijnen(nieuw)
  }, [gelegd])

  useLayoutEffect(meet, [meet, stukken.length])

  useEffect(() => {
    if (!bord.current) return
    const kijker = new ResizeObserver(meet)
    kijker.observe(bord.current)
    window.addEventListener('resize', meet)
    return () => {
      kijker.disconnect()
      window.removeEventListener('resize', meet)
    }
  }, [meet])

  function tik(id: string) {
    if (gekozen === null) {
      zetGekozen(id)
      return
    }
    if (gekozen === id) {
      zetGekozen(null)
      return
    }
    bijVerbinden(gekozen, id)
    zetGekozen(null)
  }

  if (stukken.length === 0) {
    return (
      <div className="paneel">
        <p className="paneelkop">Het bord</p>
        <p className="leeg">
          Nog niets. Zoek in de werkomgeving iets wat de moeite waard is en stuur
          het hierheen.
        </p>
      </div>
    )
  }

  return (
    <div className="paneel">
      <p className="paneelkop">
        Het bord · {stukken.length} stukken, {gelegd.length} verbanden
      </p>
      <p className="paneelvoet boven">
        {gekozen
          ? 'Tik nu op een tweede kaartje.'
          : 'Tik twee kaartjes aan om te kijken of ze iets met elkaar te maken hebben.'}
      </p>

      <div className="bord" ref={bord}>
        <svg className="draden" aria-hidden="true">
          {lijnen.map((l) => (
            <line
              key={l.id}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              className={opgelicht === l.id ? 'draad op' : 'draad'}
            />
          ))}
        </svg>

        {stukken.map((b) => (
          <button
            key={b.id}
            ref={(el) => {
              kaarten.current[b.id] = el
            }}
            className={
              'kaartje' +
              (gekozen === b.id ? ' gekozen' : '') +
              (opgelicht &&
              gelegd.some(
                (v) => v.id === opgelicht && (v.van === b.id || v.naar === b.id),
              )
                ? ' op'
                : '')
            }
            onClick={() => tik(b.id)}
          >
            <span className="kaartsoort">{b.soort}</span>
            <span className="kaarttitel">{b.titel}</span>
            <span className="kaartbron">
              {[b.dag, b.tijd].filter(Boolean).join(' · ') || b.bron}
            </span>
          </button>
        ))}
      </div>

      {gelegd.length > 0 && (
        <div className="conclusies">
          <h3>Wat je nu weet</h3>
          {gelegd.map((v) => (
            <button
              key={v.id}
              className={'conclusie' + (opgelicht === v.id ? ' op' : '')}
              onMouseEnter={() => zetOpgelicht(v.id)}
              onMouseLeave={() => zetOpgelicht(null)}
              onClick={() => zetOpgelicht(opgelicht === v.id ? null : v.id)}
            >
              {v.conclusie}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
