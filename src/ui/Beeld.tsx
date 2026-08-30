import { useEffect, useState } from 'react'
import type { Bewijs } from '../verhaal/types.ts'
import { BEELDEN, SchermJoost } from './beelden'

/* ─────────────────────────────────────────────────────────────
   BEELDMATERIAAL

   Vier mogelijkheden, in deze volgorde. De eerste die er is, wint.

   1. public/bewijs/<id>.mp4   — een echte videoclip
   2. public/bewijs/<id>.jpg   — een echte foto (of .png)
   3. een getekende scène uit beelden.tsx
   4. een kale beeldkaart met alleen de bron en de tijdcode

   Zo kan echt beeldmateriaal er stuk voor stuk in zonder dat er ooit
   iets kapotgaat: wat er niet is, valt terug op de laag eronder.

   Waarom niet gewoon een bestand aanroepen en klaar? Omdat we pas weten
   of het er is als de browser het geprobeerd heeft. Vandaar dat we het
   materiaal eerst stilletjes laden en pas daarna kiezen wat we tonen --
   anders knippert de tekening even in beeld voordat de foto hem
   overneemt.

   Bij camerabeeld leggen we de tijdcode over de video heen, ook als het
   een echte clip is. Dan ziet elk aangeleverd fragment eruit als een
   uitdraai uit het dossier, zonder dat je die tekst in het bestand hoeft
   te branden.
   ───────────────────────────────────────────────────────────── */

type Soort = 'zoekt' | 'video' | 'foto' | 'geen'

function url(id: string, ext: string): string {
  return `${import.meta.env.BASE_URL}bewijs/${id}.${ext}`
}

/** Bestaat dit bestand? Eén keer proberen te laden, meer is het niet. */
function laadt(adres: string, video: boolean): Promise<boolean> {
  return new Promise((klaar) => {
    if (video) {
      const el = document.createElement('video')
      el.preload = 'metadata'
      el.onloadedmetadata = () => klaar(true)
      el.onerror = () => klaar(false)
      el.src = adres
    } else {
      const el = new Image()
      el.onload = () => klaar(true)
      el.onerror = () => klaar(false)
      el.src = adres
    }
  })
}

export default function Beeld({ stuk }: { stuk: Bewijs }) {
  const [soort, zetSoort] = useState<Soort>('zoekt')
  const [adres, zetAdres] = useState<string | null>(null)

  useEffect(() => {
    let levend = true
    zetSoort('zoekt')
    zetAdres(null)

    async function zoek() {
      const mp4 = url(stuk.id, 'mp4')
      if (await laadt(mp4, true)) {
        if (!levend) return
        zetAdres(mp4)
        zetSoort('video')
        return
      }
      for (const ext of ['jpg', 'png']) {
        const beeld = url(stuk.id, ext)
        if (await laadt(beeld, false)) {
          if (!levend) return
          zetAdres(beeld)
          zetSoort('foto')
          return
        }
      }
      if (levend) zetSoort('geen')
    }

    void zoek()
    return () => {
      levend = false
    }
  }, [stuk.id])

  const stempel = [stuk.dag, stuk.tijd].filter(Boolean).join('  ')
  const isCamera = /camera|beveiliging/i.test(stuk.bron + stuk.titel)

  if (soort === 'video' && adres) {
    return (
      <figure className="beeld">
        <div className={'mediavlak' + (isCamera ? ' camera' : '')}>
          <video
            className="beeld-video"
            src={adres}
            autoPlay
            loop
            muted
            playsInline
            controls
          />
          {isCamera && (
            <span className="camerastempel" aria-hidden="true">
              <span>CAM 02 — VAN ELST</span>
              <span>
                {stuk.dag} {stuk.tijd}
              </span>
            </span>
          )}
        </div>
        {stempel && <figcaption className="beeld-tijd">{stempel}</figcaption>}
      </figure>
    )
  }

  if (soort === 'foto' && adres) {
    return (
      <figure className="beeld">
        <div className={'mediavlak' + (isCamera ? ' camera' : '')}>
          <img className="beeld-foto" src={adres} alt={stuk.titel} />
          {isCamera && (
            <span className="camerastempel" aria-hidden="true">
              <span>CAM 02 — VAN ELST</span>
              <span>
                {stuk.dag} {stuk.tijd}
              </span>
            </span>
          )}
        </div>
        {stempel && <figcaption className="beeld-tijd">{stempel}</figcaption>}
      </figure>
    )
  }

  if (stuk.id === 'f-scherm-joost') {
    return (
      <figure className="beeld">
        <SchermJoost />
      </figure>
    )
  }

  const Scene = BEELDEN[stuk.id]
  if (Scene) {
    return (
      <figure className="beeld">
        <div className="scenevlak">
          <Scene id={stuk.id} />
        </div>
      </figure>
    )
  }

  return (
    <div className={'beeldkaart' + (isCamera ? ' camera' : '')}>
      <span className="beeld-hoek linksboven" aria-hidden="true" />
      <span className="beeld-hoek rechtsboven" aria-hidden="true" />
      <span className="beeld-hoek linksonder" aria-hidden="true" />
      <span className="beeld-hoek rechtsonder" aria-hidden="true" />
      <span className="beeld-lijnen" aria-hidden="true" />

      <span className="beeld-strip boven">
        <span>{isCamera ? 'CAM' : 'IMG'}</span>
        <span>{stempel}</span>
      </span>

      <span className="beeld-midden" />

      <span className="beeld-strip onder">
        <span>{stuk.bron}</span>
        <span className="beeld-geen">beschrijving hieronder</span>
      </span>
    </div>
  )
}
