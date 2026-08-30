import { useEffect, useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   HET OPSTARTSCHERM

   Volledig zwart, en het blijft even zwart -- langer dan comfortabel is.
   Dan komt er regel voor regel een dossierkop binnen, alsof ergens een
   oud politiesysteem staat in te loggen. Daarna slaat de titel erin.

   Drie dingen doen het werk:

   1. Het ademen. Een rode gloed in de randen die traag op- en afzwelt.
      Nooit fel, nooit snel -- je merkt het pas als je erop let, en dan
      kun je het niet meer níet zien.

   2. De storing. Twee keer, heel kort, springt de statusregel om naar
      wat er over een week op staat. Je weet niet zeker of je het gezien
      hebt. Dat is precies de bedoeling: het spel weet al hoe dit afloopt
      en jij nog niet.

   3. De klok. Hij begint op zestien uur -- zo lang is ze weg als jij het
      dossier krijgt -- en loopt door zolang je kijkt. Terwijl jij nadenkt
      over of je wel zin hebt, loopt hij door.

   Geen geflits, geen stroboscoop: twee storingen van een tiende seconde
   in vijf seconden, en de rest beweegt traag. Alles is te overslaan met
   één tik, en wie prefers-reduced-motion aan heeft staan krijgt het
   eindbeeld meteen en stil. Een opstartscherm dat je niet weg kunt
   klikken is geen sfeer maar een sta-in-de-weg.
   ───────────────────────────────────────────────────────────── */

const REGELS: Array<[string, string]> = [
  ['DOSSIER', '2026-0417'],
  ['STATUS', 'VERMISSING — MINDERJARIG'],
  ['BETREFT', 'DE VRIES, MARIT — 17 JAAR'],
  ['LAATST GEZIEN', 'ZA 11 OKT 23:12 — KERMISVELD'],
  ['TOEGEWEZEN AAN', 'U'],
]

/** Wat er over een week op die regel staat. Even. */
const STORING = 'OVERLEDEN — NIET GEVONDEN'

/** Zestien uur, in seconden. Zo lang is ze weg als het dossier bij jou komt. */
const VOORSPRONG = 16 * 3600

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

  const [klaar, zetKlaar] = useState(rustig)
  const [storing, zetStoring] = useState(false)
  const [tellen, zetTellen] = useState(VOORSPRONG)

  useEffect(() => {
    if (rustig) return

    const klokken: number[] = []
    const zet = (ms: number, doe: () => void) =>
      klokken.push(window.setTimeout(doe, ms))

    // Twee korte storingen. Kort genoeg om aan jezelf te twijfelen.
    zet(3100, () => zetStoring(true))
    zet(3210, () => zetStoring(false))
    zet(4700, () => zetStoring(true))
    zet(4790, () => zetStoring(false))

    zet(6200, () => zetKlaar(true))

    return () => klokken.forEach(clearTimeout)
  }, [rustig])

  useEffect(() => {
    const tik = setInterval(() => zetTellen((n) => n + 1), 1000)
    return () => clearInterval(tik)
  }, [])

  return (
    <div
      className={'splash' + (rustig ? ' rustig' : '')}
      onClick={bijVerder}
      role="button"
      tabIndex={0}
      aria-label="Begin"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') bijVerder()
      }}
    >
      <div className="splash-adem" aria-hidden="true" />
      <div className="splash-korrel" aria-hidden="true" />
      <div className="splash-lijnen" aria-hidden="true" />

      <div className="splash-inhoud">
        <p className="splash-eenheid">POLITIE · EENHEID OOST-NEDERLAND</p>

        <dl className="splash-kop">
          {REGELS.map(([label, waarde], i) => {
            const isStatus = label === 'STATUS'
            return (
              <div
                key={label}
                className="splash-regel"
                style={{ animationDelay: `${0.9 + i * 0.44}s` }}
              >
                <dt>{label}</dt>
                <dd className={isStatus && storing ? 'splash-storing' : undefined}>
                  {isStatus && storing ? STORING : waarde}
                </dd>
              </div>
            )
          })}
        </dl>

        <div className="splash-titelblok">
          <h1 className="splash-titel" data-tekst="MISDAAD">
            MISDAAD
          </h1>
          <div className="splash-streep" aria-hidden="true" />
          <p className="splash-onder">een zaak in Westerveld</p>
        </div>

        <div className="splash-klok">
          <span className="splash-kloklabel">
            <span className="splash-stip" aria-hidden="true" />
            VERMIST SINDS
          </span>
          <span className="splash-kloktijd">{klokTekst(tellen)}</span>
        </div>
      </div>

      <p className={'splash-verder' + (klaar ? ' aan' : '')}>tik om te beginnen</p>
    </div>
  )
}
