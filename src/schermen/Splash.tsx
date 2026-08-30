import { useEffect, useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   HET OPSTARTSCHERM

   Een gang die je niet in wilt. De deur staat op een kier, er zit een
   handafdruk op, en in het donker erachter staat iemand.

   Wat het werk doet:

   · De ogen. Ze komen niet meteen. Je kijkt eerst naar de deur, naar de
     handafdruk, naar de posters op de vloer -- en pas als je bijna
     doorhebt dat er iets mist, staan ze er. Eén keer knipperen is genoeg.
   · De tl-buis. Onregelmatig, nooit fel, met lange stukken rust ertussen.
     Een lamp die stabiel knippert is een effect; een lamp die je niet
     kunt voorspellen is een gang.
   · De klok. Begint op zestien uur -- zo lang is ze weg als jij het
     dossier krijgt -- en loopt door zolang je kijkt.

   Alles is CSS en inline SVG. Er zit nog steeds geen enkel plaatje in dit
   project; de handafdruk is een handvol ellipsen.

   Eén tik ergens in beeld zet de hele opbouw meteen op het eindbeeld, en
   onder prefers-reduced-motion staat het er stil vanaf de eerste frame.
   ───────────────────────────────────────────────────────────── */

/** Zestien uur, in seconden. Zo lang is ze weg als het dossier bij jou komt. */
const VOORSPRONG = 16 * 3600

/** Wat er op de vloer ligt. Vier keer hetzelfde meisje, vier keer verwaaid. */
const POSTERS = [
  { links: "2%", onder: "4%", draai: -14, schaal: 1 },
  { links: "13%", onder: "17%", draai: 8, schaal: 0.8 },
  { links: "24%", onder: "2%", draai: -5, schaal: 0.9 },
  { links: "62%", onder: "3%", draai: 12, schaal: 0.92 },
  { links: "74%", onder: "16%", draai: -8, schaal: 0.78 },
  { links: "86%", onder: "5%", draai: 17, schaal: 0.86 },
]

function klokTekst(seconden: number): string {
  const twee = (n: number) => String(n).padStart(2, '0')
  return [
    twee(Math.floor(seconden / 3600)),
    twee(Math.floor((seconden % 3600) / 60)),
    twee(seconden % 60),
  ].join(':')
}

export default function Splash({ bijVerder }: { bijVerder: () => void }) {
  const rustig =
    typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches

  const [nu, zetNu] = useState(rustig)
  const [waarschuwing, zetWaarschuwing] = useState(false)
  const [tellen, zetTellen] = useState(VOORSPRONG)

  useEffect(() => {
    if (rustig) return
    const klok = setTimeout(() => zetNu(true), 7000)
    return () => clearTimeout(klok)
  }, [rustig])

  useEffect(() => {
    const tik = setInterval(() => zetTellen((n) => n + 1), 1000)
    return () => clearInterval(tik)
  }, [])

  return (
    <div
      className={'gang' + (nu ? ' nu' : '')}
      onClick={() => zetNu(true)}
      role="presentation"
    >
      <div className="gangklok">
        <span className="gangklok-stip" aria-hidden="true" />
        VERMIST SINDS {klokTekst(tellen)}
      </div>

      {/* ── De gang zelf ────────────────────────────────── */}
      <div className="gang-vloer" aria-hidden="true" />
      <div className="gang-wand links" aria-hidden="true">
        <span className="gang-plek" />
        <span className="gang-plek twee" />
      </div>
      <div className="gang-wand rechts" aria-hidden="true">
        <span className="gang-plek" />
      </div>
      <div className="gang-tl" aria-hidden="true" />
      <div className="gang-schijn" aria-hidden="true" />

      {/* ── Wat er op de vloer ligt ─────────────────────── */}
      <div className="posters" aria-hidden="true">
        {POSTERS.map((p, i) => (
          <div
            key={i}
            className="poster"
            style={{
              left: p.links,
              bottom: p.onder,
              transform: `rotate(${p.draai}deg) scale(${p.schaal})`,
            }}
          >
            <span className="poster-kop">VERMIST</span>
            <span className="poster-vlak" />
            <span className="poster-regel" />
            <span className="poster-regel kort" />
          </div>
        ))}
      </div>

      {/* ── De deuropening ──────────────────────────────── */}
      <div className="deurblok">
        <div className="deurgat" aria-hidden="true">
          <div className="gezicht">
            <span className="oog links" />
            <span className="oog rechts" />
          </div>
        </div>

        <div className="deur" aria-hidden="true">
          <span className="paneel-boven" />
          <span className="paneel-onder" />
          <span className="kruk" />

          <svg className="handafdruk" viewBox="0 0 100 120" aria-hidden="true">
            <g fill="currentColor">
              <ellipse cx="50" cy="92" rx="30" ry="23" />
              <rect x="25" y="30" width="13" height="50" rx="6.5" transform="rotate(-7 31 55)" />
              <rect x="43" y="22" width="14" height="58" rx="7" />
              <rect x="62" y="30" width="13" height="50" rx="6.5" transform="rotate(7 68 55)" />
              <rect x="78" y="46" width="11" height="38" rx="5.5" transform="rotate(19 83 65)" />
              <rect x="4" y="58" width="12" height="36" rx="6" transform="rotate(-36 10 76)" />
            </g>
          </svg>

          <span className="druppel een" />
          <span className="druppel twee" />
          <span className="druppel drie" />
        </div>
      </div>

      {/* ── Titel en menu ───────────────────────────────── */}
      <div className="voorgrond">
        <h1 className="bloedtitel">
          {'MISDAAD'.split('').map((letter, i) => (
            <span key={i} style={{ ['--n' as string]: i }}>
              {letter}
            </span>
          ))}
        </h1>
        <p className="bloedonder">EEN ZAAK IN WESTERVELD</p>

        <div className="menu">
          <button
            className="menuknop"
            onClick={(e) => {
              e.stopPropagation()
              bijVerder()
            }}
          >
            START
          </button>
          <button
            className="menuknop klein"
            onClick={(e) => {
              e.stopPropagation()
              zetWaarschuwing(true)
            }}
          >
            WAARSCHUWING
          </button>
        </div>

      </div>

      {waarschuwing && (
        <div
          className="overlay"
          onClick={(e) => {
            e.stopPropagation()
            zetWaarschuwing(false)
          }}
        >
          <div className="opdrachtkaart" onClick={(e) => e.stopPropagation()}>
            <p className="stempel">Voor je begint</p>
            <h2>Waar dit over gaat</h2>
            <p>
              Dit spel gaat over de dood van een minderjarige. Het bevat geweld,
              seksueel misbruik van een minderjarige door een volwassene, misbruik
              van vertrouwen en grof taalgebruik. Er is geen expliciet beeld — wel
              expliciete tekst.
            </p>
            <p>Het is bedoeld voor volwassen spelers.</p>
            <button className="knop hoofd" onClick={() => zetWaarschuwing(false)}>
              Begrepen
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
