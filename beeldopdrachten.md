# Beeldopdrachten

Het spel tekent zijn beelden nu zelf in SVG. Dat zijn vectorvormen: sfeer, geen
foto's. Wil je dat het eruitziet alsof het echt gebeurd is, dan moet er echt
beeldmateriaal in — en dat moet van buiten komen, want in dit project zit niets
dat foto's of video kan maken.

Hieronder staat per beeld een opdracht die je in een beeldgenerator kunt
plakken, en waar het bestand heen moet. Zodra het er staat pakt de app het op;
er hoeft niets in de code te veranderen.

## Waar het heen moet

| Bestand | Wat het wordt |
|---|---|
| `public/gang.jpg` | de achtergrond van het opstartscherm |
| `public/bewijs/d-camera-2312.jpg` of `.mp4` | camerabeeld 23:12 |
| `public/bewijs/f-selfie-1938.jpg` | selfie met Sanne |
| `public/bewijs/f-botsauto.jpg` | botsauto's |
| `public/bewijs/f-zweefmolen.jpg` | bij de zweefmolen |

Video kan alleen als `.mp4`, en gaat vóór een foto met dezelfde naam. Hij
speelt automatisch, in herhaling, zonder geluid — zoals een camerabeeld hoort.

Voor de schermafdruk van 2 mei is géén bestand nodig: die wordt als echte chat
opgebouwd en is daardoor scherp en leesbaar op elk scherm. Een foto van een
scherm zou daar alleen maar slechter zijn.

## Eén ding vooraf

Marit is zeventien. Houd haar gezicht uit beeld: van achteren, op afstand, in
tegenlicht, of onscherp. Dat is niet alleen netter — het is ook beter beeld. Een
onherkenbaar meisje op een camerabeeld is precies wat een dossier laat zien, en
het is onheilspellender dan een gezicht.

## De opdrachten

Achter elke opdracht hoort dezelfde staart, want de vijf beelden moeten op
elkaar lijken:

> *documentary photograph, rural Netherlands, October, cold damp night, available
> light only, muted desaturated colours, heavy grain, slightly underexposed, no
> text, no watermark, 4:3*

### `public/gang.jpg` — het opstartscherm

> Abandoned institutional corridor at night, peeling paint, graffiti on the
> walls, debris and scattered missing-person flyers on the floor, one flickering
> fluorescent tube, a heavy weathered wooden door standing ajar in the centre, a
> bloody handprint smeared on the door, total darkness in the gap behind it,
> deep shadows, cinematic horror still

Houd het midden en de onderkant rustig: daar komen de titel en het menu
overheen te staan.

### `d-camera-2312` — camerabeeld, 23:12

> Grainy black and white CCTV still from a camera mounted high across the road,
> looking at the entrance gate of a small-town funfair at night, ferris wheel
> lit in the background, metal fence, one streetlight, a lone teenage figure in
> a dark coat standing still at the gate seen from behind and above, face not
> visible, lit only by the phone in her hands, empty wet road, no bicycle, no
> backpack

De tijdcode hoef je er niet in te zetten: de app legt `CAM 02 — VAN ELST` en de
datum er zelf overheen, en maakt het beeld zwart-wit.

Als `.mp4`: acht tot vijftien seconden, vaste camera, zij staat vrijwel stil en
loopt aan het eind naar links uit beeld.

### `f-selfie-1938` — selfie met Sanne, 19:38

> Amateur flash selfie taken from below on a dark country road, two teenage
> girls, faces turned away from the lens and overexposed by the flash so they
> are not identifiable, harsh flash falloff into complete darkness behind them,
> bare trees, one distant streetlight, a heavy grey backpack strap over the
> right girl's shoulder, slight motion blur, phone camera quality

### `f-botsauto` — botsauto's, 21:02

> Blurred phone photo of bumper cars at a village funfair at night, coloured
> ceiling lights smeared by camera movement, wet reflective floor, at the left
> edge and half out of frame a young man in a green bomber jacket gripping
> someone's wrist, only a dark sleeve of the other person visible, no faces in
> focus

### `f-zweefmolen` — bij de zweefmolen, 21:07

> Phone photo of a chain swing carousel at a village funfair at night, warm
> bulbs along the canopy, a teenage girl in the foreground seen as a backlit
> silhouette holding a red plastic cup, face not visible, and behind her at the
> control panel a young man in a high-visibility orange vest with a radio,
> looking towards the camera

## Praktisch

Sla ze op als JPEG onder de 300 kB per stuk, en video onder de 3 MB. Dit wordt
op telefoons gespeeld, vaak over mobiel internet, en GitHub Pages serveert alles
in één keer mee.

Je kunt ze een voor een toevoegen. Wat er niet staat, valt terug op de getekende
scène, dus het spel gaat er nooit tussentijds stuk van.
