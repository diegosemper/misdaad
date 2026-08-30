import { useState } from 'react'
import type { Gesprek, Hoofdstuk } from '../../verhaal/types.ts'
import type { Toestand } from '../../engine/zaak.ts'
import { persoon } from '../../verhaal/h1/personen.ts'

/* De chat-app. Twee weergaven: de lijst met gesprekken, en één gesprek
   opengeslagen.

   Berichten met `levert` zijn de enige waar je op kunt tikken. Ze krijgen
   een dun randje, verder niets -- wie ze allemaal wil vinden moet lezen.
   Dat is precies de bedoeling: het spel beloont lezen, niet klikken. */

type Props = {
  hoofdstuk: Hoofdstuk
  toestand: Toestand
  gesprekken: Gesprek[]
  bijOpenen: (gesprekId: string) => void
  bijOppakken: (bewijsId: string) => void
}

export default function Gesprekken({
  hoofdstuk,
  toestand,
  gesprekken,
  bijOpenen,
  bijOppakken,
}: Props) {
  const [open, zetOpen] = useState<string | null>(null)
  const gesprek = gesprekken.find((g) => g.id === open)

  if (!gesprek) {
    return (
      <ul className="lijst">
        {gesprekken.map((g) => {
          const gelezen = toestand.geopend.includes(g.id)
          return (
            <li key={g.id}>
              <button
                className="lijstregel"
                onClick={() => {
                  zetOpen(g.id)
                  bijOpenen(g.id)
                }}
              >
                <span className={`rondje ${gelezen ? '' : 'nieuw'}`}>
                  {persoon(g.berichten[0]?.van ?? 'ik').letters}
                </span>
                <span className="lijsttekst">
                  <span className="lijsttitel">{g.met}</span>
                  <span className="lijstregeltje">{g.vooruitblik ?? ''}</span>
                </span>
                {!gelezen && <span className="stip" aria-label="ongelezen" />}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="gesprek">
      <button className="knop kaal terug" onClick={() => zetOpen(null)}>
        ← Alle gesprekken
      </button>
      <h3 className="gesprekskop">{gesprek.met}</h3>

      <div className="berichten">
        {gesprek.berichten.map((bericht, i) => {
          const vanMarit = bericht.van === 'ik'
          const oplevert = (bericht.levert ?? []).filter(
            (id) => !toestand.verzameld.includes(id),
          )
          const alGehad =
            (bericht.levert ?? []).length > 0 && oplevert.length === 0

          return (
            <div key={i}>
              {bericht.kop && <p className="datumkop">{bericht.kop}</p>}
              <div className={`bel-rij ${vanMarit ? 'van-mij' : ''}`}>
                <div
                  className={
                    'bel' +
                    (vanMarit ? ' mijn' : '') +
                    (bericht.hersteld ? ' hersteld' : '') +
                    (bericht.levert ? ' markeerbaar' : '') +
                    (alGehad ? ' gemarkeerd' : '')
                  }
                >
                  {!vanMarit && gesprek.met.includes('(') && (
                    <span className="afzender">{persoon(bericht.van).naam}</span>
                  )}
                  {bericht.hersteld && (
                    <span className="hersteld-label">teruggehaald · gewist</span>
                  )}
                  <span className="beltekst">{bericht.tekst}</span>
                  {bericht.tijd && <span className="beltijd">{bericht.tijd}</span>}
                </div>
              </div>

              {oplevert.length > 0 && (
                <div className={`bel-rij ${vanMarit ? 'van-mij' : ''}`}>
                  <button
                    className="knop markeer"
                    onClick={() => oplevert.forEach(bijOppakken)}
                  >
                    + naar het bord
                    <span className="markeer-wat">
                      {oplevert
                        .map((id) => hoofdstuk.bewijs.find((b) => b.id === id)?.titel)
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
