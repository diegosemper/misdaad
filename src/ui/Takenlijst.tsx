import { useState } from 'react'
import type { Hoofdstuk } from '../verhaal/types.ts'
import type { Toestand } from '../engine/zaak.ts'
import { huidigeTaak, magBeschuldigen, taken } from '../engine/zaak.ts'

/* ─────────────────────────────────────────────────────────────
   DE OPDRACHT

   Eén regel. Niet een lijst van zes, want dan lees je ze allemaal, kies
   je er niks uit en heb je alsnog het gevoel dat je niet weet waar je
   moet beginnen. Er is altijd precies één ding waar je aan werkt, en
   zodra dat af is staat het volgende er.

   Daardoor doet de volgorde in src/verhaal/h1/taken.ts er ineens toe: de
   opdracht die er staat moet met wat je nú hebt te doen zijn.
   scripts/controleer.mjs speelt de zaak na en kijkt precies dat na.

   De teller ernaast is er voor het gevoel dat het ergens heen gaat. Wie
   wil zien wat hij al gehad heeft klapt hem open; dat staat dicht, want
   het gaat om die ene regel.

   De `key` op de regel is geen detail: hij zorgt dat React het element
   opnieuw opbouwt zodra de opdracht wisselt, zodat je de nieuwe ziet
   binnenkomen in plaats van dat de tekst stilletjes verspringt.
   ───────────────────────────────────────────────────────────── */

type Props = {
  hoofdstuk: Hoofdstuk
  toestand: Toestand
}

export default function Takenlijst({ hoofdstuk, toestand }: Props) {
  const [toonAf, zetToonAf] = useState(false)

  const taak = huidigeTaak(hoofdstuk, toestand)
  const { af } = taken(hoofdstuk, toestand)
  const totaal = hoofdstuk.taken.length

  /* Er moet altijd iets staan. Is alles van deze fase gedaan maar mag je
     nog niet beschuldigen, dan wacht je op de volgende fase -- zeg dat
     dan ook, in plaats van een lege balk te tonen. */
  const tekst = taak
    ? taak.tekst
    : magBeschuldigen(hoofdstuk, toestand)
      ? 'Wijs de dader aan en onderbouw het met drie bewijsstukken'
      : 'Leg de verbanden die je nog mist — de volgende fase komt vanzelf'

  return (
    <section className="opdrachtbalk">
      <div className="opdrachtregel" key={taak?.id ?? 'einde'}>
        <span className="opdrachtvak" aria-hidden="true" />
        <span className="opdrachttekst">
          <span className="opdrachtlabel">Te doen</span>
          {tekst}
        </span>
        <button
          className="opdrachtteller"
          onClick={() => zetToonAf((x) => !x)}
          aria-expanded={toonAf}
          aria-label={`${af.length} van ${totaal} afgerond`}
        >
          {af.length}/{totaal}
        </button>
      </div>

      {toonAf && (
        <ul className="gedaanlijst">
          {af.length === 0 && <li className="gedaan leeg">Nog niets afgerond.</li>}
          {[...af].reverse().map((t) => (
            <li key={t.id} className="gedaan">
              <span className="gedaanvink" aria-hidden="true">
                ✓
              </span>
              {t.tekst}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
