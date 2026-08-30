import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   HET OPSTARTSCHERM

   Twee versies van hetzelfde scherm. Staat er een bestand in
   public/gang.jpg, dan is dát de achtergrond en zetten we alleen de
   titel en het menu erover. Is dat er niet, dan tekent dit scherm de
   gang zelf.

   Wat het levend houdt -- want een stilstaand plaatje is geen gang:

   · Parallax. Beweeg je muis of veeg over het scherm en de wanden
     schuiven anders mee dan de deur. Eén ingreep, en het wordt ineens
     een ruimte in plaats van een plaat. Dat gebeurt met CSS-variabelen
     die rechtstreeks op het element worden gezet, niet via state --
     anders hertekent React zestig keer per seconde mee.

   · Een camera die drijft. Heel traag in- en uitzoomen, 46 seconden per
     kant. Je ziet het niet gebeuren, je merkt alleen dat het beeld leeft.

   · De deur kruipt verder open. Zes graden over een minuut, heen en
     terug. Kijk je weg en weer terug, dan staat hij anders.

   · Iemand komt dichterbij. Het gezicht in het donker schuift over vijftig
     seconden naar voren, verdwijnt halverwege even, en staat er daarna
     grόter weer. Dat is de enige echte schrik in dit scherm.

   · Stof in het licht van de tl-buis, want doodstille lucht bestaat niet.

   Geen stroboscoop, en onder prefers-reduced-motion staat alles stil --
   inclusief de parallax. Eén tik slaat de hele opbouw over.
   ───────────────────────────────────────────────────────────── */

/** Waar de achtergrondfoto mag staan. Zie beeldopdrachten.md. */
const FOTO = `${import.meta.env.BASE_URL}gang.jpg`

/** Zestien uur, in seconden. Zo lang is ze weg als het dossier bij jou komt. */
const VOORSPRONG = 16 * 3600

/** Wat er op de vloer ligt, in de getekende versie. */
const POSTERS = [
  { links: '2%', onder: '4%', draai: -14, schaal: 1 },
  { links: '13%', onder: '17%', draai: 8, schaal: 0.8 },
  { links: '24%', onder: '2%', draai: -5, schaal: 0.9 },
  { links: '62%', onder: '3%', draai: 12, schaal: 0.92 },
  { links: '74%', onder: '16%', draai: -8, schaal: 0.78 },
  { links: '86%', onder: '5%', draai: 17, schaal: 0.86 },
]

/** Stofdeeltjes in de lichtbundel. Elk met een eigen traagheid. */
const STOF = [
  { links: '7%', boven: '22%', duur: 19, wacht: 0, maat: 2 },
  { links: '12%', boven: '38%', duur: 26, wacht: 3, maat: 1.5 },
  { links: '18%', boven: '17%', duur: 22, wacht: 7, maat: 2.5 },
  { links: '9%', boven: '52%', duur: 31, wacht: 1, maat: 1.5 },
  { links: '22%', boven: '44%', duur: 24, wacht: 11, maat: 2 },
  { links: '15%', boven: '61%', duur: 28, wacht: 5, maat: 1.5 },
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

  const [foto, zetFoto] = useState<'zoekt' | 'ja' | 'nee'>('zoekt')
  const [nu, zetNu] = useState(rustig)
  const [opties, zetOpties] = useState(false)
  const [tellen, zetTellen] = useState(VOORSPRONG)

  const vlak = useRef<HTMLDivElement>(null)
  const wacht = useRef(0)

  useEffect(() => {
    const beeld = new Image()
    beeld.onload = () => zetFoto('ja')
    beeld.onerror = () => zetFoto('nee')
    beeld.src = FOTO
    return () => {
      beeld.onload = null
      beeld.onerror = null
    }
  }, [])

  useEffect(() => {
    if (rustig) return
    const klok = setTimeout(() => zetNu(true), 7000)
    return () => clearTimeout(klok)
  }, [rustig])

  useEffect(() => {
    const tik = setInterval(() => zetTellen((n) => n + 1), 1000)
    return () => clearInterval(tik)
  }, [])

  /* De parallax schrijft rechtstreeks op het element. Dat scheelt zestig
     hertekeningen per seconde, en de waarden hoeven nergens anders heen. */
  function beweeg(e: React.PointerEvent<HTMLDivElement>) {
    if (rustig || !vlak.current) return
    if (wacht.current) return
    wacht.current = requestAnimationFrame(() => {
      wacht.current = 0
      const el = vlak.current
      if (!el) return
      const doos = el.getBoundingClientRect()
      const x = (e.clientX - doos.left) / doos.width - 0.5
      const y = (e.clientY - doos.top) / doos.height - 0.5
      el.style.setProperty('--px', String(Math.max(-0.5, Math.min(0.5, x))))
      el.style.setProperty('--py', String(Math.max(-0.5, Math.min(0.5, y))))
    })
  }

  useEffect(() => () => cancelAnimationFrame(wacht.current), [])

  if (foto === 'zoekt') return <div className="gang wacht" />

  const metFoto = foto === 'ja'

  return (
    <div
      ref={vlak}
      className={'gang' + (nu ? ' nu' : '') + (metFoto ? ' metfoto' : '')}
      style={metFoto ? { backgroundImage: `url("${FOTO}")` } : undefined}
      onClick={() => zetNu(true)}
      onPointerMove={beweeg}
      role="presentation"
    >
      <div className="gangklok">
        <span className="gangklok-stip" aria-hidden="true" />
        VERMIST SINDS {klokTekst(tellen)}
      </div>

      {/* ── De getekende gang. Valt weg zodra er een foto is. ── */}
      {!metFoto && (
        <div className="tafereel" aria-hidden="true">
          <div className="gang-vloer" />
          <div className="gang-wand links">
            <span className="gang-plek" />
            <span className="gang-plek twee" />
            <span className="graffiti een" />
            <span className="graffiti twee" />
          </div>
          <div className="gang-wand rechts">
            <span className="gang-plek" />
            <span className="graffiti drie" />
          </div>
          <div className="gang-tl" />
          <div className="gang-schijn" />

          <div className="stof">
            {STOF.map((s, i) => (
              <span
                key={i}
                style={{
                  left: s.links,
                  top: s.boven,
                  width: s.maat,
                  height: s.maat,
                  animationDuration: `${s.duur}s`,
                  animationDelay: `${s.wacht}s`,
                }}
              />
            ))}
          </div>

          <div className="posters">
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

          <div className="deurblok">
            <div className="deurgat">
              <div className="gezicht">
                <span className="oog links" />
                <span className="oog rechts" />
              </div>
            </div>

            <div className="deur">
              <span className="paneel-boven" />
              <span className="paneel-onder" />
              <span className="kruk" />

              <svg className="handafdruk" viewBox="0 0 100 120">
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
        </div>
      )}

      {/* ── Titel bovenaan, menu eronder ────────────────────── */}
      <div className="voorgrond">
        <div className="kopblok">
          <h1 className="bloedtitel">
            {'MISDAAD'.split('').map((letter, i) => (
              <span key={i}>{letter}</span>
            ))}
          </h1>
          <p className="bloedonder">EEN PSYCHOLOGISCHE THRILLER</p>
        </div>

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
            className="menuknop"
            onClick={(e) => {
              e.stopPropagation()
              zetOpties(true)
            }}
          >
            OPTIES
          </button>
        </div>
      </div>

      {opties && (
        <div
          className="overlay"
          onClick={(e) => {
            e.stopPropagation()
            zetOpties(false)
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
            <p className="versie">bouw {__BUILD__}</p>
            <button className="knop hoofd" onClick={() => zetOpties(false)}>
              Terug
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
