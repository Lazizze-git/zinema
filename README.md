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
├── index.html            Accueil, sections ancrées
├── merci.html            Le mur des remerciés
├── css/
│   ├── styles.css        Point d'entrée (@import des modules)
│   ├── space-grotesk.css Police locale (Space Grotesk variable)
│   ├── reset.css · base.css (variables, typo, helpers)
│   ├── header / hero / films / programme / privatisation / infos / apropos / footer
│   └── merci.css         Le mur de briques + la case de l'accueil
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

## Le mur (`merci.html`)

Une brique = une personne remerciée, **toutes écrites dans la même taille de
caractères** : c'est la règle posée par le cinéma, il n'y a aucune hiérarchie
entre un don de dix francs et une institution.

Le cinéma ne veut qu'**un seul mot** pour désigner cette page : « Merci ».
Ni « Remerciements », ni « Wall of fame » — c'était redondant. La case de
l'accueil (après la section « Le lieu ») et le lien du footer portent donc
tous les deux ce mot, et la page ne le répète pas dans un sur-titre.

Pour mettre la liste à jour, éditer le `<ul class="wall">` — une ligne par
contributeur :

```html
<li class="brick">Prénom Nom</li>
```

- L'ordre du fichier est l'ordre d'affichage ; les rangées se recomposent
  toutes seules selon la largeur de l'écran.
- Le compteur « X noms sur le mur » se recalcule tout seul (`data-brick-count`).
- Garder `<li class="brick brick--cta">` en **dernière** position : cette brique
  renvoie vers la section « Rejoindre le mur » et absorbe l'espace restant de la
  dernière rangée.
- Ne pas réintroduire de titre « Remerciements » sur la page : voir ci-dessus.
- **Ne jamais** ajouter de `font-size`, de `style` ou de classe de mise en avant
  sur une brique : cela casserait la règle de la taille unique.

> ⚠️ Les noms actuellement en place sont **fictifs** : ils servent uniquement à
> juger le rendu du mur et doivent être remplacés par la liste réelle des
> personnes remerciées avant la mise en ligne.
