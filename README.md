# B&A Veld

Kaart van het veld en drie spellen om alle locaties te leren kennen. Werkt op telefoon en computer, ook als app op het beginscherm.

## Online zetten met GitHub Pages

1. Ga naar github.com, log in en kies **New repository**.
2. Geef hem een naam, bijvoorbeeld `ba-veld`, zet hem op **Public** en klik **Create repository**.
3. Klik op **uploading an existing file** (of **Add file → Upload files**).
4. Sleep alle bestanden en mappen uit deze zip erin: `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, `README.md` en de mappen `fonts` en `icons`. Klik **Commit changes**.
5. Ga naar **Settings → Pages**. Kies bij *Source* **Deploy from a branch**, bij *Branch* **main** en **/(root)**, en klik **Save**.
6. Na een minuut of twee staat de app op `https://<jouw-gebruikersnaam>.github.io/ba-veld/`. Die link deel je met iedereen.

## Op de telefoon zetten

Open de link en kies **Toevoegen aan beginscherm** (iPhone: deelknop in Safari; Android: menu in Chrome). De app opent dan schermvullend en werkt daarna ook zonder bereik. De 3D-luchtfoto heeft wel internet nodig, behalve de stukken die je al eens bekeken hebt.

## Een nieuwe versie zetten

Upload de nieuwe bestanden opnieuw in dezelfde repository en overschrijf de oude. Telefoons halen de nieuwe versie zelf op de volgende keer dat de app opent met bereik.

## Ranglijst

- Er zijn twee soorten potjes: **Vrij spel** (10 willekeurige locaties, om te oefenen) en **Competitie** (alle 34). Elk heeft per spel een eigen ranglijst; per speler telt de beste score, bij een gelijke score wint de snelste.
- Achter elke naam staat een icoontje van het toestel waarop gespeeld is: telefoon, tablet of computer. In de competitiestand staan de toestellen van alle drie de spellen.
- **Competitiestand:** per speler de beste competitiescores van de drie spellen opgeteld. Een spel dat iemand nog niet speelde telt als 0, dus ook wie één of twee spellen speelde staat erin.
- Namen met "Raymond" erin tellen niet mee voor de plekken; die beste score staat apart onder elke lijst als "Score van de maker".
- Scores gaan zonder account via openbare MQTT-servers (EMQX, HiveMQ en Mosquitto). Elke telefoon stuurt bij het openen zijn eigen beste scores opnieuw, zodat de lijst zich herstelt als een server iets kwijtraakt.
- Zonder bereik speel je gewoon door; je score gaat mee zodra er weer verbinding is.
- Onder de ranglijst staat **Scores van dit toestel uit de ranglijst halen**. Dat haalt alle scores die op dat toestel gespeeld zijn uit de ranglijst, voor iedereen; scores van andere toestellen blijven staan. Werkt alleen met verbinding.
- **Beheer:** open `#beheer` achter het adres van de app (bijvoorbeeld `https://acc-tnrl.github.io/BA-Airsoft/#beheer`), vul de beheercode in en kies **Alle scores wissen**. De ranglijst wordt dan voor iedereen leeg. Toestellen die op dat moment offline zijn, wissen hun scores zodra ze weer verbinding hebben. Zonder de beheercode kan niemand dit; bewaar de code dus goed en deel hem niet.
- De lijst is openbaar en niet beveiligd: iemand met verstand van zaken kan er een nepscore in zetten. Voor een vriendengroep is dat prima. Wil je het later dichtzetten, dan kan de opslag worden vervangen door bijvoorbeeld Supabase.

## Wat er in zit

| Bestand | Inhoud |
| --- | --- |
| `index.html` | De pagina |
| `app.js` | De hele app: kaart, spellen, ranglijst |
| `styles.css` | Vormgeving, licht en donker |
| `sw.js` | Zorgt dat de app offline werkt |
| `manifest.webmanifest` + `icons/` | Naam en icoon op het beginscherm |
| `fonts/archivo.woff2` | Het lettertype |

Luchtfoto: PDOK / Beeldmateriaal Nederland. 3D-kaart: MapLibre.
