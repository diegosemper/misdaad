import { useEffect, useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   HET OPSTARTSCHERM

   Twee versies van hetzelfde scherm.

   Staat er een bestand in public/gang.jpg, dan is dát de achtergrond en
   zetten we alleen de titel en het menu erover. Dat is de bedoelde
   versie: een echte foto van een gang met een deur op een kier.

   Is dat bestand er niet, dan tekent dit scherm de gang zelf met
   kleurvlakken -- een deur, een handafdruk, posters op de vloer, twee
   ogen in het donker. Nooit zo goed als een foto, maar het spel start
   wel en het staat er niet leeg bij.

   De keuze valt hier en niet in de CSS, omdat we pas weten of de foto
   bestaat als de browser hem geprobeerd heeft. Tot dat antwoord er is
   tonen we geen van beide, anders zie je de getekende versie een fractie
   oplichten voordat de foto hem overneemt.

   Geen stroboscoop: de lamp is zwak en traag, de ogen knipperen eens per
   zes seconden, en onder prefers-reduced-motion staat alles stil. Eén
   tik slaat de hele opbouw over.
   ───────────────────────────────────────────────────────────── */

/** Waar de achtergrondfoto mag staan. Zie LEESMIJ.md. */
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

  // Bestaat de achtergrondfoto? Dat weten we pas als de browser hem
  // geprobeerd heeft, dus dat vragen we hier en niet in de CSS.
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

  if (foto === 'zoekt') return <div className="gang wacht" />

  const metFoto = foto === 'ja'

  return (
    <div
      className={'gang' + (nu ? ' nu' : '') + (metFoto ? ' metfoto' : '')}
      style={metFoto ? { backgroundImage: `url("${FOTO}")` } : undefined}
      onClick={() => zetNu(true)}
      role="presentation"
    >
      <div className="gangklok">
        <span className="gangklok-stip" aria-hidden="true" />
        VERMIST SINDS {klokTekst(tellen)}
      </div>

      {/* ── De getekende gang. Valt weg zodra er een foto is. ── */}
      {!metFoto && (
        <>
          <div className="gang-vloer" aria-hidden="true" />
          <div className="gang-wand links" aria-hidden="true">
            <span className="gang-plek" />
            <span className="gang-plek twee" />
            <span className="graffiti een" />
            <span className="graffiti twee" />
          </div>
          <div className="gang-wand rechts" aria-hidden="true">
            <span className="gang-plek" />
            <span className="graffiti drie" />
          </div>
          <div className="gang-tl" aria-hidden="true" />
          <div className="gang-schijn" aria-hidden="true" />

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
        </>
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
