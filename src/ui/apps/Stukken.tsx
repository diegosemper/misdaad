import { useState } from 'react'
import type { Bewijs } from '../../verhaal/types.ts'
import type { Toestand } from '../../engine/zaak.ts'

/* Alles wat geen chat is: dossierstukken, foto's, oproepen, notities,
   verhoren. Eén weergave voor allemaal, want een verhoor lezen en een
   camerabeeld bekijken is voor de speler dezelfde handeling.

   Foto's hebben geen bestand -- er bestaat geen enkel plaatje in dit
   project. Wat je ziet is een lijst met een beschrijving, zoals een
   rechercheur een beeld in een dossier beschreven krijgt. Dat leest
   trouwens onheilspellender dan een plaatje ooit zou doen. */

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
  toestand: Toestand
  bijOppakken: (bewijsId: string) => void
}

export default function Stukken({ stukken, toestand, bijOppakken }: Props) {
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
            <button className="lijstregel" onClick={() => zetOpen(s.id)}>
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
        {stuk.soort === 'foto' && <div className="beeldvlak" aria-hidden="true" />}
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
