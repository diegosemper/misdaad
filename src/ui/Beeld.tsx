import { useEffect, useState } from 'react'
import type { Bewijs } from '../verhaal/types.ts'
import { BEELDEN, SchermJoost } from './beelden'

/* ─────────────────────────────────────────────────────────────
   BEELDMATERIAAL

   Drie mogelijkheden, in deze volgorde:

   1. Staat er een echt bestand als public/bewijs/<id>.jpg, dan wint dat.
      Er hoeft niets in de code te veranderen om er een toe te voegen.
   2. Is er een getekende scène voor dit bewijsstuk (zie beelden.tsx),
      dan zie je die. Dat geldt voor alle vijf de beelden in hoofdstuk 1.
   3. Anders een beeldkaart met de bron en de tijdcode erop -- voor
      nieuwe bewijsstukken die nog geen tekening hebben.

   Punt 1 en 2 door elkaar heen kan: je kunt de scènes een voor een
   vervangen door echte foto's zonder dat er iets stukgaat.
   ───────────────────────────────────────────────────────────── */

function pad(id: string): string {
  return `${import.meta.env.BASE_URL}bewijs/${id}.jpg`
}

export default function Beeld({ stuk }: { stuk: Bewijs }) {
  const [staat, zetStaat] = useState<'zoekt' | 'ja' | 'nee'>('zoekt')

  useEffect(() => {
    let levend = true
    const beeld = new Image()
    beeld.onload = () => levend && zetStaat('ja')
    beeld.onerror = () => levend && zetStaat('nee')
    beeld.src = pad(stuk.id)
    return () => {
      levend = false
      beeld.onload = null
      beeld.onerror = null
    }
  }, [stuk.id])

  const stempel = [stuk.dag, stuk.tijd].filter(Boolean).join('  ')

  if (staat === 'ja') {
    return (
      <figure className="beeld">
        <img className="beeld-foto" src={pad(stuk.id)} alt={stuk.titel} />
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

  // Nog geen tekening voor dit stuk: dan de kale beeldkaart.
  const isCamera = /camera|beveiliging/i.test(stuk.bron + stuk.titel)

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
