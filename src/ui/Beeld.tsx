import { useEffect, useState } from 'react'
import type { Bewijs } from '../verhaal/types.ts'

/* ─────────────────────────────────────────────────────────────
   BEELDMATERIAAL

   Foto's en camerabeelden werken hetzelfde als het opstartscherm:
   bestaat het bestand, dan zie je het, en anders zie je een lijst.

   Zet een bestand neer als public/bewijs/<id>.jpg -- dus bijvoorbeeld
   public/bewijs/d-camera-2312.jpg -- en dat beeld verschijnt vanzelf bij
   dat bewijsstuk. Er hoeft niets in de code te veranderen.

   Zonder bestand krijg je geen leeg grijs vlak meer maar een echte
   beeldkaart: een donkere still met beeldlijnen, hoekhaken, de bron en de
   tijdcode erbij. Dat leest als een uitdraai uit een dossier in plaats
   van als iets wat niet geladen is. De beschrijving eronder blijft
   staan; die dóet het werk.
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

  const isCamera = /camera|beveiliging/i.test(stuk.bron + stuk.titel)
  const stempel = [stuk.dag, stuk.tijd].filter(Boolean).join('  ')

  if (staat === 'ja') {
    return (
      <figure className="beeld">
        <img className="beeld-foto" src={pad(stuk.id)} alt={stuk.titel} />
        {stempel && <figcaption className="beeld-tijd">{stempel}</figcaption>}
      </figure>
    )
  }

  // Nog aan het laden, of er is geen bestand: in beide gevallen de
  // getekende beeldkaart. Tussenstand overslaan zou een flikkering geven.
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

      <span className="beeld-midden">
        {isCamera && (
          <span className="beeld-rec">
            <span className="beeld-stip" aria-hidden="true" />
            REC
          </span>
        )}
      </span>

      <span className="beeld-strip onder">
        <span>{stuk.bron}</span>
        <span className="beeld-geen">beschrijving hieronder</span>
      </span>
    </div>
  )
}
