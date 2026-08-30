/* ─────────────────────────────────────────────────────────────
   DE BEELDEN

   Vijf getekende scènes, één per bewijsstuk met beeld. Geen bestanden:
   dit zijn vormen, verlopen en silhouetten in SVG.

   Eén regel houdt alles overeind: GEEN GETEKENDE GEZICHTEN. Ogen en
   monden in vectorvorm worden op dit formaat onherroepelijk emoji, en
   twee lachende smileys in een zaak over een dood meisje is niet grimmig
   maar gênant. Dus: silhouetten waar het donker is, en overbelichte
   vlekken met een zweem van schaduw waar een flits op valt. Vaag en
   korrelig, zoals een telefoonfoto in het donker er werkelijk uitziet.

   Wat elk beeld moet laten zien staat in WAARHEID.md en in de inhoud van
   het bewijsstuk zelf; de tekening mag daar niets aan toevoegen en niets
   uit weglaten. Op het camerabeeld van 23:12 heeft ze géén fiets en géén
   rugzak bij zich, en dat moet je kunnen zien.

   Zet je een echt bestand neer als public/bewijs/<id>.jpg, dan wint dat
   hiervan. Zie Beeld.tsx.
   ───────────────────────────────────────────────────────────── */

type SceneProps = { id: string }

/** Korrel, en bij bewegend beeld ook beeldlijnen. */
function Ruis({
  id,
  sterk = 0.2,
  lijnen = false,
}: {
  id: string
  sterk?: number
  lijnen?: boolean
}) {
  return (
    <>
      <defs>
        <filter id={`korrel-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
        </filter>
      </defs>
      <rect
        width="400"
        height="300"
        filter={`url(#korrel-${id})`}
        opacity={sterk}
        style={{ mixBlendMode: 'overlay' }}
      />
      {lijnen && (
        <g opacity="0.3">
          {Array.from({ length: 75 }, (_, i) => (
            <rect key={i} x="0" y={i * 4} width="400" height="1" fill="#000" />
          ))}
        </g>
      )}
    </>
  )
}

/** Het donker dat vanaf de randen naar binnen kruipt. */
function Vignet({ id }: { id: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`vig-${id}`} cx="50%" cy="46%" r="72%">
          <stop offset="45%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#vig-${id})`} />
    </>
  )
}

/* ── Camerabeeld snackbar Van Elst, 23:12 ─────────────────────
   Zwart-wit, hoog geplaatste camera aan de overkant van de weg. Ze
   staat stil bij het hek en kijkt naar haar telefoon. Geen fiets,
   geen rugzak -- dat is precies wat dit beeld bewijst. */

export function CameraTerrein({ id }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" className="scene" role="img">
      <defs>
        <linearGradient id={`lucht-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#181c1f" />
          <stop offset="100%" stopColor="#0c0f11" />
        </linearGradient>
        <radialGradient id={`lamp-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dfe6ea" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#dfe6ea" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`tel-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8eef2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#e8eef2" stopOpacity="0" />
        </radialGradient>
        <filter id={`zacht-${id}`}>
          <feGaussianBlur stdDeviation="0.9" />
        </filter>
      </defs>

      <rect width="400" height="300" fill={`url(#lucht-${id})`} />

      {/* Het reuzenrad op de achtergrond, ver weg en half uit. */}
      <g stroke="#2a3134" strokeWidth="1.5" fill="none">
        <circle cx="86" cy="96" r="54" />
        <circle cx="86" cy="96" r="30" />
        {Array.from({ length: 12 }, (_, i) => {
          const hoek = (i / 12) * Math.PI * 2
          return (
            <line
              key={i}
              x1="86"
              y1="96"
              x2={86 + Math.cos(hoek) * 54}
              y2={96 + Math.sin(hoek) * 54}
            />
          )
        })}
      </g>
      {Array.from({ length: 12 }, (_, i) => {
        const hoek = (i / 12) * Math.PI * 2
        return (
          <circle
            key={i}
            cx={86 + Math.cos(hoek) * 54}
            cy={96 + Math.sin(hoek) * 54}
            r="2"
            fill="#9aa4a8"
            opacity={i % 3 === 0 ? 1 : 0.45}
          />
        )
      })}

      {/* De weg. */}
      <rect y="214" width="400" height="86" fill="#14181a" />
      <rect y="214" width="400" height="2" fill="#232a2d" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={12 + i * 60} y="262" width="26" height="3" fill="#20262a" />
      ))}

      {/* Het hek van het kermisterrein. */}
      <g fill="#1f262a">
        <rect x="236" y="150" width="164" height="4" />
        <rect x="236" y="206" width="164" height="4" />
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={240 + i * 12} y="150" width="3" height="60" />
        ))}
      </g>

      {/* Lantaarn en zijn lichtkegel. */}
      <rect x="322" y="70" width="4" height="146" fill="#232a2e" />
      <rect x="310" y="66" width="28" height="5" rx="2" fill="#333b3f" />
      <ellipse cx="324" cy="70" rx="60" ry="46" fill={`url(#lamp-${id})`} />
      <path d="M324 72 L286 216 L362 216 Z" fill="#c9d3d8" opacity="0.08" />

      {/* Zij. Stilstaand, hoofd omlaag, telefoon in haar hand. Geen
          fiets naast haar, en niets over haar schouder. Silhouet met
          een randje licht -- geen gezicht. */}
      <g filter={`url(#zacht-${id})`}>
        <ellipse cx="196" cy="242" rx="18" ry="4" fill="#000" opacity="0.6" />
        <path
          d="M186 140 q10 -12 20 0 q3 12 -2 17 q-8 4 -16 0 q-5 -5 -2 -17 z"
          fill="#2a3134"
        />
        <path d="M184 138 q12 -14 24 0 q-12 -6 -24 0 z" fill="#161a1c" />
        <path d="M185 160 q11 -6 22 0 l5 46 q-16 5 -32 0 z" fill="#191d20" />
        <rect x="187" y="204" width="8" height="36" fill="#161a1c" />
        <rect x="197" y="204" width="8" height="36" fill="#161a1c" />
        <path d="M190 176 q5 9 9 7" stroke="#1f2528" strokeWidth="5" fill="none" />
      </g>
      {/* Het schermlicht op haar kin en handen: het enige wat oplicht. */}
      <ellipse cx="200" cy="180" rx="22" ry="17" fill={`url(#tel-${id})`} />
      <rect x="197" y="176" width="7" height="10" rx="1" fill="#e2ecf1" opacity="0.9" />
      <ellipse cx="196" cy="152" rx="7" ry="5" fill="#8f9ca1" opacity="0.35" />

      <Ruis id={id} sterk={0.3} lijnen />
      <Vignet id={id} />

      {/* De tijdcode staat in het beeld, zoals bij zo'n camera hoort. */}
      <g fontFamily="monospace" fontSize="11" fill="#9aa4a8" opacity="0.8">
        <text x="12" y="20">CAM 02 — VAN ELST</text>
        <text x="388" y="20" textAnchor="end">
          11-10-2026 23:12:04
        </text>
        <text x="12" y="290">REC</text>
      </g>
      <circle cx="45" cy="286" r="3.5" fill="#c8352b" />
    </svg>
  )
}

/* ── Selfie met Sanne, 19:38 ──────────────────────────────────
   Een flits van dichtbij in het donker: twee gezichten die overbelicht
   wegvallen, de rest zwart. Geen getrokken ogen of monden -- alleen wat
   een flits ervan overlaat. Over Marits schouder de rugzak. */

export function SelfieWeg({ id }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" className="scene" role="img">
      <defs>
        <linearGradient id={`nacht-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1016" />
          <stop offset="100%" stopColor="#141a21" />
        </linearGradient>
        <radialGradient id={`huid-${id}`} cx="50%" cy="72%" r="62%">
          <stop offset="0%" stopColor="#f4ece2" />
          <stop offset="55%" stopColor="#cfbfae" />
          <stop offset="100%" stopColor="#4a4038" />
        </radialGradient>
        <filter id={`flits-${id}`}>
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id={`ver-${id}`}>
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <rect width="400" height="300" fill={`url(#nacht-${id})`} />

      {/* Bomen en een lantaarn ver weg, buiten het bereik van de flits. */}
      <g fill="#080c10" filter={`url(#ver-${id})`}>
        <path d="M0 300 L0 116 q32 -42 60 6 L72 300 Z" />
        <path d="M400 300 L400 104 q-36 -48 -68 8 L320 300 Z" />
      </g>
      <circle cx="200" cy="92" r="22" fill="#e7d9b6" opacity="0.09" filter={`url(#ver-${id})`} />
      <rect x="199" y="92" width="2" height="66" fill="#0d1216" />

      {/* Sanne: dichter bij de lens, dus groter en harder uitgeblazen. */}
      <g filter={`url(#flits-${id})`}>
        <path d="M84 300 q4 -78 68 -84 q64 6 68 84 Z" fill="#20272e" />
        <ellipse cx="152" cy="178" rx="47" ry="53" fill={`url(#huid-${id})`} />
        <path d="M106 158 q46 -56 92 0 q-46 -26 -92 0 z" fill="#1d1712" opacity="0.94" />
        <ellipse cx="110" cy="192" rx="11" ry="38" fill="#1d1712" opacity="0.9" />
        <ellipse cx="194" cy="192" rx="11" ry="38" fill="#1d1712" opacity="0.9" />
        <ellipse cx="136" cy="174" rx="8" ry="4" fill="#6b5b4d" opacity="0.34" />
        <ellipse cx="168" cy="174" rx="8" ry="4" fill="#6b5b4d" opacity="0.34" />
        <ellipse cx="152" cy="206" rx="10" ry="5" fill="#7a5148" opacity="0.3" />
      </g>

      {/* Marit: iets verder naar achteren, en donkerder. */}
      <g filter={`url(#flits-${id})`}>
        <path d="M198 300 q4 -70 62 -76 q58 6 62 76 Z" fill="#171d24" />
        <ellipse cx="260" cy="186" rx="43" ry="48" fill={`url(#huid-${id})`} opacity="0.88" />
        <path d="M218 166 q42 -52 84 0 q-42 -24 -84 0 z" fill="#241c14" opacity="0.95" />
        <ellipse cx="222" cy="200" rx="10" ry="36" fill="#241c14" opacity="0.92" />
        <ellipse cx="298" cy="200" rx="10" ry="36" fill="#241c14" opacity="0.92" />
        <ellipse cx="246" cy="184" rx="8" ry="4" fill="#5e5044" opacity="0.3" />
        <ellipse cx="274" cy="184" rx="8" ry="4" fill="#5e5044" opacity="0.3" />
        <ellipse cx="260" cy="212" rx="8" ry="4" fill="#6d4a42" opacity="0.26" />
      </g>

      {/* De rugzak: één band over haar schouder, en hij hangt zwaar. */}
      <g filter={`url(#flits-${id})`}>
        <path d="M292 240 q24 8 28 44" stroke="#2e353d" strokeWidth="10" fill="none" />
        <path d="M304 300 q8 -42 36 -46 q24 22 20 46 z" fill="#262d34" />
      </g>

      <Ruis id={id} sterk={0.24} />
      <Vignet id={id} />
      <text x="388" y="290" textAnchor="end" fontFamily="monospace" fontSize="11" fill="#8c9299" opacity="0.65">
        19:38
      </text>
    </svg>
  )
}

/* ── Botsauto's, 21:02 ────────────────────────────────────────
   Onscherp, want de fotograaf bewoog. Links half buiten beeld de
   jongen in de groene bomberjack die een arm vasthoudt. Silhouet:
   je ziet wát er gebeurt, niet wie het is. */

export function Botsautos({ id }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" className="scene" role="img">
      <defs>
        <filter id={`vaag-${id}`}>
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
        <filter id={`vaager-${id}`}>
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={`half-${id}`}>
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      <rect width="400" height="300" fill="#0a0a10" />

      {/* Lampen aan het plafond, uitgesmeerd door de beweging. */}
      <g filter={`url(#vaager-${id})`} opacity="0.9">
        {[
          ['#e0483c', 40, 44],
          ['#e8b23c', 108, 30],
          ['#3ca0e0', 178, 48],
          ['#e0483c', 250, 32],
          ['#8ce03c', 320, 46],
          ['#e8b23c', 376, 34],
        ].map(([kleur, x, y], i) => (
          <rect
            key={i}
            x={x as number}
            y={y as number}
            width="46"
            height="7"
            rx="3"
            fill={kleur as string}
          />
        ))}
      </g>

      {/* De vloer, glimmend. */}
      <rect y="196" width="400" height="104" fill="#121218" />
      <g filter={`url(#vaager-${id})`} opacity="0.42">
        {[
          ['#e0483c', 60],
          ['#e8b23c', 150],
          ['#3ca0e0', 240],
          ['#8ce03c', 330],
        ].map(([kleur, x], i) => (
          <rect key={i} x={x as number} y="200" width="40" height="70" fill={kleur as string} />
        ))}
      </g>

      {/* Botsauto's, in de smeer. */}
      <g filter={`url(#vaag-${id})`}>
        <g>
          <rect x="150" y="150" width="80" height="34" rx="16" fill="#b8332a" />
          <rect x="176" y="132" width="30" height="24" rx="8" fill="#8f2820" />
          <rect x="186" y="112" width="5" height="24" fill="#4b4b55" />
          <circle cx="188" cy="110" r="4" fill="#9fa4b0" />
        </g>
        <g opacity="0.9">
          <rect x="252" y="164" width="74" height="30" rx="15" fill="#2f6fae" />
          <rect x="276" y="148" width="28" height="22" rx="8" fill="#255789" />
          <rect x="286" y="130" width="4" height="20" fill="#4b4b55" />
        </g>
        <g opacity="0.75">
          <rect x="80" y="172" width="66" height="26" rx="13" fill="#c9a02c" />
          <rect x="100" y="158" width="26" height="20" rx="7" fill="#9c7a1f" />
        </g>
      </g>

      {/* Tim. Groene bomberjack, hand om een pols. Tegenlicht, dus je
          ziet de vorm en niet het gezicht -- en dat is genoeg. */}
      <g filter={`url(#half-${id})`}>
        <path d="M0 300 L0 148 q32 -24 70 4 L78 300 Z" fill="#263a24" />
        <path d="M0 300 L0 148 q10 -8 20 -10 L26 300 Z" fill="#33502f" opacity="0.7" />
        <circle cx="34" cy="118" r="31" fill="#14170f" />
        <path d="M6 108 q28 -34 56 0 q-4 -30 -28 -30 q-24 0 -28 30 z" fill="#0d0f0a" />
        <path d="M62 196 q40 -14 66 -6" stroke="#263a24" strokeWidth="21" strokeLinecap="round" fill="none" />
        <path d="M120 188 q16 -4 26 2" stroke="#584336" strokeWidth="15" strokeLinecap="round" fill="none" />
        {/* Haar mouw. Meer heeft de foto niet gevangen. */}
        <path d="M142 190 q34 -10 62 -30" stroke="#1c232a" strokeWidth="17" strokeLinecap="round" fill="none" />
      </g>

      <Ruis id={id} sterk={0.2} />
      <Vignet id={id} />
      <text x="388" y="290" textAnchor="end" fontFamily="monospace" fontSize="11" fill="#8c9299" opacity="0.65">
        21:02
      </text>
    </svg>
  )
}

/* ── Bij de zweefmolen, 21:07 ─────────────────────────────────
   Marit staat vóór de verlichte molen, dus tegenlicht: een silhouet met
   een beker. Achter haar, bij het bedieningspaneel, de jongen in het
   oranje hesje -- de enige in het beeld die echt licht vangt, en
   precies daarom wijst het dorp hem later aan. */

export function Zweefmolen({ id }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" className="scene" role="img">
      <defs>
        <radialGradient id={`gloed-${id}`} cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#e8c07a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e8c07a" stopOpacity="0" />
        </radialGradient>
        <filter id={`zw-${id}`}>
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      <rect width="400" height="300" fill="#0c1016" />
      <rect width="400" height="300" fill={`url(#gloed-${id})`} />

      {/* De zweefmolen: mast, dak, kettingen, stoeltjes. */}
      <rect x="196" y="40" width="8" height="200" fill="#252c34" />
      <path d="M120 74 L200 40 L280 74 Z" fill="#2d353e" />
      <path d="M120 74 L200 40 L280 74 Z" fill="none" stroke="#404a55" strokeWidth="1.5" />
      {Array.from({ length: 9 }, (_, i) => {
        const x = 118 + i * 21
        const y = 76 + Math.abs(4 - i) * 2.5
        return (
          <g key={i}>
            <line x1="200" y1="66" x2={x} y2={y + 54} stroke="#3d4650" strokeWidth="1" />
            <rect x={x - 6} y={y + 54} width="12" height="9" rx="2" fill="#4a3f36" />
            <circle cx={x} cy={y + 48} r="5" fill="#1c222a" />
          </g>
        )
      })}
      {Array.from({ length: 14 }, (_, i) => (
        <circle
          key={i}
          cx={124 + i * 12}
          cy={60 + Math.abs(6.5 - i) * 2.2}
          r="2.6"
          fill="#f4d68f"
          opacity={i % 2 ? 1 : 0.55}
        />
      ))}

      {/* Het bedieningspaneel, en de man in het oranje hesje. Hij vangt
          het licht van de molen: het enige echt heldere in dit beeld. */}
      <rect x="298" y="176" width="42" height="52" rx="3" fill="#1c222a" />
      <rect x="304" y="184" width="30" height="14" rx="2" fill="#2e3844" />
      <circle cx="310" cy="210" r="3" fill="#c8352b" />
      <circle cx="322" cy="210" r="3" fill="#3ea968" />
      <g>
        <circle cx="352" cy="162" r="13" fill="#6d5546" />
        <path d="M339 160 q13 -17 26 0 q0 -15 -13 -15 q-13 0 -13 15 z" fill="#1c1611" />
        <path d="M338 178 q14 -6 28 0 l6 50 q-20 6 -40 0 z" fill="#d4691e" />
        <path d="M344 178 l4 50 M360 178 l-4 50" stroke="#f4f4ea" strokeWidth="3" opacity="0.8" />
        <rect x="366" y="192" width="7" height="13" rx="2" fill="#1c222a" />
      </g>

      {/* Marit, in tegenlicht: silhouet met een beker in haar hand. */}
      <g filter={`url(#zw-${id})`}>
        <path d="M92 300 q0 -84 58 -90 q58 6 58 90 Z" fill="#0f141a" />
        <ellipse cx="150" cy="166" rx="35" ry="39" fill="#0f141a" />
        <path
          d="M114 162 q36 -48 72 0 q5 40 -5 56 q-7 -46 -31 -46 q-24 0 -31 46 q-10 -16 -5 -56 z"
          fill="#0b0f14"
        />
        {/* Randlicht van de molen langs haar wang en schouder. */}
        <path d="M116 150 q10 -32 34 -34" stroke="#c9a86e" strokeWidth="2.5" fill="none" opacity="0.45" />
        <path d="M100 244 q10 -34 40 -40" stroke="#c9a86e" strokeWidth="2" fill="none" opacity="0.3" />
        <path d="M196 226 q22 -2 26 -26" stroke="#0f141a" strokeWidth="15" strokeLinecap="round" fill="none" />
      </g>
      <rect x="212" y="182" width="20" height="26" rx="2" fill="#a83a33" />
      <rect x="210" y="180" width="24" height="5" rx="2" fill="#cdc7bb" />

      <Ruis id={id} sterk={0.18} />
      <Vignet id={id} />
      <text x="388" y="290" textAnchor="end" fontFamily="monospace" fontSize="11" fill="#8c9299" opacity="0.65">
        21:07
      </text>
    </svg>
  )
}

/* ── Schermafdruk, 2 mei 01:14 ────────────────────────────────
   Geen tekening maar een echte schermafdruk: dit is er een van de
   veertien die zij bewaarde nadat hij ze had ingetrokken. Daarom
   staat de tijd erbij, en daarom is de laatste regel oplichtend. */

export function SchermJoost() {
  return (
    <div className="schermafdruk">
      <div className="schermafdruk-balk">
        <span>01:14</span>
        <span className="schermafdruk-naam">Werk 't Anker</span>
        <span>vr 2 mei</span>
      </div>
      <div className="schermafdruk-chat">
        <p className="sa-bel">ben je er nog</p>
        <p className="sa-bel">ik zat te denken aan vanavond</p>
        <p className="sa-bel">je bent echt anders dan de rest hier</p>
        <p className="sa-bel mijn">ik ga slapen joost</p>
        <p className="sa-bel uit">
          niet aan je moeder vertellen he. dan wordt het raar op het werk en dat wil
          jij ook niet.
        </p>
      </div>
      <p className="schermafdruk-voet">
        schermafdruk gemaakt 02-05-2026 01:16 — bericht later ingetrokken
      </p>
    </div>
  )
}

/** Welke tekening hoort bij welk bewijsstuk? */
export const BEELDEN: Record<string, (p: SceneProps) => JSX.Element> = {
  'd-camera-2312': CameraTerrein,
  'f-selfie-1938': SelfieWeg,
  'f-botsauto': Botsautos,
  'f-zweefmolen': Zweefmolen,
}
