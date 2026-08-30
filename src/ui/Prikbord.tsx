import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Hoofdstuk, Verband } from '../verhaal/types.ts'
import type { Toestand } from '../engine/zaak.ts'

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

   Let op bij het aanpassen van `meet`: hij hangt uitsluitend aan
   `toestand.gelegd` en `toestand.verzameld`, en dat zijn arrays die
   alleen van identiteit veranderen als er echt iets bijkomt. Hier stond
   eerst een afgeleide lijst die elke render opnieuw werd gemaakt, en dat
   leverde precies één ding op: meet werd elke render een nieuwe functie,
   de layout-effect draaide elke render, zette nieuwe lijnen, en dat gaf
   weer een render. Oneindige lus, React eruit, zwart scherm.
   ───────────────────────────────────────────────────────────── */

type Lijn = { id: string; x1: number; y1: number; x2: number; y2: number }

type Props = {
  hoofdstuk: Hoofdstuk
  toestand: Toestand
  bijVerbinden: (a: string, b: string) => void
}

/** Zijn dit dezelfde draadjes op dezelfde plek? Scheelt een render. */
function zelfde(a: Lijn[], b: Lijn[]): boolean {
  if (a.length !== b.length) return false
  return a.every((l, i) => {
    const m = b[i]
    return (
      l.id === m.id && l.x1 === m.x1 && l.y1 === m.y1 && l.x2 === m.x2 && l.y2 === m.y2
    )
  })
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

  const gelegd = toestand.gelegd
    .map((id) => hoofdstuk.verbanden.find((v) => v.id === id))
    .filter((v): v is Verband => v !== undefined)

  /** Meet waar elk draadje moet lopen, in coördinaten van het bord zelf. */
  const meet = useCallback(() => {
    const doos = bord.current?.getBoundingClientRect()
    if (!doos) return

    const nieuw: Lijn[] = []
    for (const id of toestand.gelegd) {
      const v = hoofdstuk.verbanden.find((x) => x.id === id)
      if (!v) continue
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

    zetLijnen((oud) => (zelfde(oud, nieuw) ? oud : nieuw))
  }, [hoofdstuk, toestand.gelegd])

  useLayoutEffect(meet, [meet, toestand.verzameld])

  useEffect(() => {
    const vlak = bord.current
    if (!vlak) return
    const kijker = new ResizeObserver(meet)
    kijker.observe(vlak)
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
