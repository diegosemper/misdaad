/* Het eerste dat je ziet. Dit scherm doet drie dingen: het zet de toon,
   het waarschuwt eerlijk voor de inhoud, en het vertelt je in vier regels
   wie je bent en wat er is gebeurd. Meer niet -- de rest ontdek je zelf. */

export default function Start({ bijBeginnen }: { bijBeginnen: () => void }) {
  return (
    <div className="scherm">
      <div className="midden">
        <p className="stempel">Politie eenheid Oost-Nederland</p>
        <h1>MISDAAD</h1>
        <p className="zacht">Een zaak in Westerveld</p>

        <div className="dossier">
          <dl>
            <dt>Dossier</dt>
            <dd>2026-0417</dd>
            <dt>Melding</dt>
            <dd>Vermissing minderjarige</dd>
            <dt>Betreft</dt>
            <dd>Marit de Vries, 17 jaar</dd>
            <dt>Laatst gezien</dt>
            <dd>Zaterdag 11 oktober, 23:12 — kermisterrein</dd>
            <dt>Toegewezen</dt>
            <dd>U</dd>
          </dl>
        </div>

        <div className="waarschuwing">
          <strong>Let op</strong>
          Dit spel gaat over de dood van een minderjarige en bevat geweld,
          misbruik van vertrouwen en grof taalgebruik. Het is bedoeld voor
          volwassen spelers.
        </div>
      </div>

      <div className="onderaan">
        <button className="knop hoofd" onClick={bijBeginnen}>
          Open het dossier
        </button>
        <p className="versie">bouw {__BUILD__}</p>
      </div>
    </div>
  )
}
