# ZINEMA — Refonte du site

Site statique (HTML / CSS / JavaScript vanilla). Aucune dépendance, aucun build.

## Prévisualiser

Le plus simple : **double-cliquer sur `index.html`** — le site s'ouvre dans le
navigateur, animations et onglets compris (aucun serveur requis).

Pour un aperçu identique à la mise en ligne, on peut aussi le servir :

```bash
cd "site"
python3 -m http.server 8765   # puis http://localhost:8765/
```

## Mettre en ligne

Tout est statique : il suffit de déposer le dossier `site/` chez n'importe quel
hébergeur (Infomaniak, Netlify, Vercel, OVH…). Aucune configuration requise.

## Structure

```
site/
├── index.html            Page unique, sections ancrées
├── css/
│   ├── styles.css        Point d'entrée (@import des modules)
│   ├── space-grotesk.css Police locale (Space Grotesk variable)
│   ├── reset.css · base.css (variables, typo, helpers)
│   └── header / hero / films / programme / privatisation / infos / apropos / footer
├── js/
│   └── app.js            Menu mobile, header au scroll, onglets jours, apparitions
└── fonts/                Space Grotesk (.woff2)
```

## Modifier le contenu

- **Films à l'affiche** : section `#affiche` dans `index.html` (un bloc `<article class="film">` par film).
- **Programme / horaires** : section `#programme`, un `.day-panel` par jour, une ligne `.screening` par séance.
- **Infos pratiques, tarifs, contact** : sections `#infos` et `#apropos`.
- **Couleur d'accent** : variable `--accent` dans `css/base.css`.

> Les synopsis et l'organisation des séances sont des exemples crédibles à
> remplacer par les données réelles de la semaine.
