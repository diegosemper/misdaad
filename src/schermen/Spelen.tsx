/* Straks: de telefoon links, het prikbord rechts. Nu nog leeg -- dit scherm
   bestaat op dit moment alleen om te bewijzen dat de weg naar GitHub Pages
   werkt. De motor komt in de volgende stap. */

export default function Spelen({ bijStoppen }: { bijStoppen: () => void }) {
  return (
    <div className="scherm">
      <div className="midden">
        <p className="stempel">Dossier 2026-0417</p>
        <h2>Het onderzoek is nog niet geopend.</h2>
        <p className="zacht klein">
          Hoofdstuk 1 wordt op dit moment samengesteld.
        </p>
      </div>

      <div className="onderaan">
        <button className="knop kaal" onClick={bijStoppen}>
          Terug
        </button>
      </div>
    </div>
  )
}
