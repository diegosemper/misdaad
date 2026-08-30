import { useState } from 'react'
import type { Bewijs } from '../../verhaal/types.ts'
import type { Toestand } from '../../engine/zaak.ts'
import type { Wijzer } from '../../engine/wijzer.ts'
import Beeld from '../Beeld'

/* Alles wat geen chat is: dossierstukken, foto's, oproepen, notities,
   verhoren. Eén weergave voor allemaal, want een verhoor lezen en een
   camerabeeld bekijken is voor de speler dezelfde handeling.

   Foto's en camerabeelden laten een echt bestand zien als dat er is
   (public/bewijs/<id>.jpg) en anders een getekende beeldkaart met de
   bron en de tijdcode erop. Zie Beeld.tsx. De beschrijving eronder
   blijft in beide gevallen staan -- die doet het eigenlijke werk. */

const TEKENS: Record<string, string> = {
  bericht: '💬',
  foto: '🖼',
  document: '📄',
  verklaring: '🎙',
  oproep: '📞',
  notitie: '📝',
  object: '📦',
}

type Props = {
  stukken: Bewijs[]
  wijzer: Wijzer
  toestand: Toestand
  bijOppakken: (bewijsId: string) => void
}

export default function Stukken({ stukken, toestand, wijzer, bijOppakken }: Props) {
  const [open, zetOpen] = useState<string | null>(null)
  const stuk = stukken.find((s) => s.id === open)

  if (stukken.length === 0) {
    return <p className="leeg">Hier ligt nog niets.</p>
  }

  if (!stuk) {
    return (
      <ul className="lijst">
        {stukken.map((s) => (
          <li key={s.id}>
            <button
              className={"lijstregel" + (wijzer.stukken.includes(s.id) ? " wijst" : "")}
              onClick={() => zetOpen(s.id)}
            >
              <span className="rondje">{TEKENS[s.soort] ?? '📄'}</span>
              <span className="lijsttekst">
                <span className="lijsttitel">{s.titel}</span>
                <span className="lijstregeltje">
                  {[s.dag, s.tijd].filter(Boolean).join(' · ') || s.bron}
                </span>
              </span>
              {toestand.verzameld.includes(s.id) && (
                <span className="vinkje" aria-label="op het bord">
                  ✓
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  const opgepakt = toestand.verzameld.includes(stuk.id)

  return (
    <div className="stuk">
      <button className="knop kaal terug" onClick={() => zetOpen(null)}>
        ← Terug
      </button>

      <article className={stuk.soort === 'foto' ? 'papier beeld' : 'papier'}>
        <p className="papier-stempel">
          {stuk.bron}
          {stuk.dag ? ` · ${stuk.dag}` : ''}
          {stuk.tijd ? ` · ${stuk.tijd}` : ''}
        </p>
        <h2 className="papier-titel">{stuk.titel}</h2>
        {stuk.soort === 'foto' && <Beeld stuk={stuk} />}
        {stuk.inhoud.split('\n\n').map((alinea, i) => (
          <p key={i} className="papier-tekst">
            {alinea}
          </p>
        ))}
      </article>

      <button
        className="knop hoofd"
        disabled={opgepakt}
        onClick={() => bijOppakken(stuk.id)}
      >
        {opgepakt ? 'Ligt op het bord' : '+ Naar het bord'}
      </button>
    </div>
  )
}
