import { useState } from 'react'
import type { Hoofdstuk, Verband } from '../verhaal/types.ts'
import type { Toestand } from '../engine/zaak.ts'

/* ─────────────────────────────────────────────────────────────
   HET BORD

   Tikken, niet slepen. Op een telefoon is een draadje trekken tussen
   twee kaartjes een kwelling; twee keer tikken werkt met een muis én met
   een duim, en je kunt er niet per ongeluk naast zitten.

   Hier stonden eerst echte draadjes: een SVG-laag die lijnen trok tussen
   de kaartjes waar ze ook lagen. Dat zag er goed uit bij drie verbanden
   en werd bij tien een wirwar waarin je niets meer kon aflezen -- en dat
   is precies het omgekeerde van waar een prikbord voor is.

   Nu ligt het in twee delen:

   · Bovenaan al je bewijs, met de nog niet gekoppelde stukken vóóraan en
     de gebruikte erachter, gedempt en met een vinkje. In één oogopslag
     zie je wat er nog los ligt.
   · Daaronder elk gelegd verband als een paar naast elkaar, met de
     conclusie eronder. Geen kruisende lijnen meer, want er is per
     verband maar één streepje van tien pixels nodig.

   Een gebruikt kaartje blijft aanklikbaar: veel stukken horen bij meer
   dan één verband, en dan moet je er nog een keer bij kunnen.
   ───────────────────────────────────────────────────────────── */

type Props = {
  hoofdstuk: Hoofdstuk
  toestand: Toestand
  bijVerbinden: (a: string, b: string) => void
}

export default function Prikbord({ hoofdstuk, toestand, bijVerbinden }: Props) {
  const [gekozen, zetGekozen] = useState<string | null>(null)

  const stukken = toestand.verzameld
    .map((id) => hoofdstuk.bewijs.find((b) => b.id === id))
    .filter((b): b is NonNullable<typeof b> => b !== undefined)

  const gelegd = toestand.gelegd
    .map((id) => hoofdstuk.verbanden.find((v) => v.id === id))
    .filter((v): v is Verband => v !== undefined)

  const gebruikt = new Set(gelegd.flatMap((v) => [v.van, v.naar]))
  const los = stukken.filter((s) => !gebruikt.has(s.id))
  const vast = stukken.filter((s) => gebruikt.has(s.id))

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

  function kaartje(b: (typeof stukken)[number], klein = false) {
    return (
      <button
        key={b.id + (klein ? '-klein' : '')}
        className={
          'kaartje' +
          (klein ? ' klein' : '') +
          (gekozen === b.id ? ' gekozen' : '') +
          (!klein && gebruikt.has(b.id) ? ' gebruikt' : '')
        }
        onClick={() => tik(b.id)}
      >
        <span className="kaartsoort">
          {b.soort}
          {!klein && gebruikt.has(b.id) && <span className="kaartvink">✓</span>}
        </span>
        <span className="kaarttitel">{b.titel}</span>
        <span className="kaartbron">
          {[b.dag, b.tijd].filter(Boolean).join(' · ') || b.bron}
        </span>
      </button>
    )
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
        Het bord · {los.length} nog te koppelen, {gelegd.length}{' '}
        {gelegd.length === 1 ? 'verband' : 'verbanden'}
      </p>
      <p className="paneelvoet boven">
        {gekozen
          ? 'Tik nu op een tweede kaartje.'
          : 'Tik twee kaartjes aan om te kijken of ze iets met elkaar te maken hebben.'}
      </p>

      <div className="bord">
        {los.map((b) => kaartje(b))}
        {vast.map((b) => kaartje(b))}
      </div>

      {los.length === 0 && vast.length > 0 && (
        <p className="paneelvoet">
          Alles op je bord is ergens aan gekoppeld. Meestal hoort een stuk bij meer
          dan één verband, dus je kunt gerust nog eens iets aantikken.
        </p>
      )}

      {gelegd.length > 0 && (
        <div className="koppelingen">
          <h3>Wat je nu weet</h3>
          {gelegd.map((v) => {
            const a = hoofdstuk.bewijs.find((b) => b.id === v.van)
            const b = hoofdstuk.bewijs.find((x) => x.id === v.naar)
            if (!a || !b) return null
            return (
              <div key={v.id} className="koppel">
                <div className="koppelpaar">
                  {kaartje(a, true)}
                  <span className="koppeldraad" aria-hidden="true" />
                  {kaartje(b, true)}
                </div>
                <p className="koppeltekst">{v.conclusie}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
