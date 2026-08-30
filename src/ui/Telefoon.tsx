import { useState } from 'react'
import type { Hoofdstuk } from '../verhaal/types.ts'
import type { Toestand } from '../engine/zaak.ts'
import type { Wijzer } from '../engine/wijzer.ts'
import Gesprekken from './apps/Gesprekken'
import Stukken from './apps/Stukken'
import Codeslot from './Codeslot'

/* Het linkerpaneel: de werkomgeving van de rechercheur. Een raster met
   apps, en zodra je er een opent neemt die het hele paneel over.

   Apps verschijnen naarmate het onderzoek vordert. Een app die er
   gisteren nog niet was is daardoor zelf een beloning -- je ziet dat er
   iets nieuws binnen is voordat je weet wat. */

type Props = {
  hoofdstuk: Hoofdstuk
  toestand: Toestand
  wijzer: Wijzer
  bijOpenen: (gesprekId: string) => void
  bijOppakken: (bewijsId: string) => void
  bijKraken: (slotId: string, code: string) => boolean
}

export default function Telefoon({
  hoofdstuk,
  toestand,
  wijzer,
  bijOpenen,
  bijOppakken,
  bijKraken,
}: Props) {
  const [openApp, zetOpenApp] = useState<string | null>(null)

  const zichtbaar = hoofdstuk.apps.filter((a) => toestand.beschikbaar.includes(a.id))
  const app = zichtbaar.find((a) => a.id === openApp)

  if (!app) {
    return (
      <div className="paneel">
        <p className="paneelkop">Werkomgeving · zaak 2026-0417</p>
        <div className="appraster">
          {zichtbaar.map((a) => {
            const opSlot = a.slot !== undefined && !toestand.gekraakt.includes(a.slot)
            return (
              <button
                key={a.id}
                className={"appknop" + (wijzer.apps.includes(a.id) ? " wijst" : "")}
                onClick={() => zetOpenApp(a.id)}
              >
                <span className="apppictogram" aria-hidden="true">
                  {opSlot ? '🔒' : a.teken}
                </span>
                <span className="appnaam">{a.naam}</span>
              </button>
            )
          })}
        </div>
        <p className="paneelvoet">
          Alles wat je hier vindt kun je naar het bord sturen. Wat niet op het bord
          ligt, kun je niet gebruiken.
        </p>
      </div>
    )
  }

  const opSlot = app.slot !== undefined && !toestand.gekraakt.includes(app.slot)
  const slot = hoofdstuk.sloten.find((s) => s.id === app.slot)

  return (
    <div className="paneel">
      <button className="knop kaal terug" onClick={() => zetOpenApp(null)}>
        ← Alle apps
      </button>
      <p className="paneelkop">
        {app.teken} {app.naam}
      </p>
      {app.onderschrift && <p className="paneelvoet boven">{app.onderschrift}</p>}

      {opSlot && slot ? (
        <Codeslot slot={slot} bijKraken={(code) => bijKraken(slot.id, code)} />
      ) : app.soort === 'gesprekken' ? (
        <Gesprekken
          hoofdstuk={hoofdstuk}
          toestand={toestand}
          wijzer={wijzer}
          gesprekken={hoofdstuk.gesprekken.filter(
            (g) => g.app === app.id && toestand.beschikbaar.includes(g.id),
          )}
          bijOpenen={bijOpenen}
          bijOppakken={bijOppakken}
        />
      ) : (
        <Stukken
          wijzer={wijzer}
          stukken={hoofdstuk.bewijs.filter(
            (b) => b.app === app.id && toestand.beschikbaar.includes(b.id),
          )}
          toestand={toestand}
          bijOppakken={bijOppakken}
        />
      )}
    </div>
  )
}
