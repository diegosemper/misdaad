# MISDAAD

Een rechercheurspel in de geest van *An Elmwood Trail*. Je pluist een telefoon
door — chats, foto's, mail, vergrendelde accounts — en legt op een prikbord
verbanden tussen bewijsstukken. Klopt een verband, dan komt er nieuwe inhoud
vrij. Aan het eind wijs je een dader aan en moet je die met drie bewijsstukken
staven.

Zaak 1: **Westerveld**. Marit de Vries, zeventien, komt zaterdagnacht niet thuis
van de kermis.

> Het spel gaat over de dood van een minderjarige en bevat geweld, misbruik van
> vertrouwen en grof taalgebruik. Bedoeld voor volwassen spelers.

Online: **https://diegosemper.github.io/misdaad/**

---

## Zelf draaien

```
npm install
npm run dev
```

Open `http://localhost:5174`.

Op je eigen telefoon, over je eigen wifi:

```
npm run telefoon
```

Vite drukt dan een adres af dat begint met je eigen ip. Dat typ je op je
telefoon over. Het spel is mobiel-eerst ontworpen, dus dit is de echte test.

Controleren of alles klopt:

```
npm run build
```

Dat doet drie dingen achter elkaar: de types nakijken, de záák nakijken, en
pas dan bouwen. Er zijn geen losse tests — deze drie zijn het.

---

## Online zetten

Pushen naar `main` is genoeg. `.github/workflows/deploy.yml` bouwt de app en
zet hem op GitHub Pages. Twee minuten later staat het er.

---

## Hoe het in elkaar zit

Drie lagen, streng gescheiden:

```
src/verhaal/   de zaak als data — wie, wat, welk bewijs. Geen logica.
src/engine/    de regels — welk draadje klopt, wat komt vrij. Geen React.
src/ui/        hoe het eruitziet. Weet niets van de zaak.
```

Alles wat de speler doet is: een bewijsstuk vinden, twee bewijsstukken aan
elkaar knopen, of een code intypen. De opgeslagen voortgang is niet meer dan
drie lijstjes id's in `localStorage`.

Door die scheiding is een nieuw hoofdstuk toevoegen puur een map erbij in
`src/verhaal/`, zonder één regel motor aan te raken.

### `WAARHEID.md`

In `src/verhaal/h1/WAARHEID.md` staat minuut voor minuut wat er die avond echt
gebeurde, en wat elk personage weet, verzwijgt en denkt. Alle bewijsstukken
worden daaruit afgeleid. **Lees dat niet als je nog wilt spelen.**

### `npm run controleer`

Kijkt de zaak na: verwijst elk verband naar bestaand bewijs, is elke laag
bereikbaar, staat de hint van een code niet achter het slot dat hij opent, en
is er materiaal dat de speler nooit kan vinden. Draait mee in `npm run build`.

Dit script leest de TypeScript-data rechtstreeks in — node 22 haalt de types er
vanzelf uit. Daarom schrijven de bestanden in `src/verhaal/` en `src/engine/`
hun imports voluit mét `.ts` erachter: node zoekt niet zelf naar bestanden
zoals een bundelaar dat doet.

---

## Gereedschap

Node en Git staan in `%LOCALAPPDATA%\rondje-tools`, gedeeld met het
DORST!-project.
