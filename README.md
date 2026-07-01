# EpiVerse — Nova static website

Vitrine multipage statique, conçue pour être publiée sur GitHub Pages **sans installation npm, sans build et sans dépendance JavaScript externe**.

## Structure

```text
EpiVerse-Nova/
├── index.html                 # Accueil
├── produit.html               # Parcours et système produit
├── campus.html                # Campus spatial 2D interactif
├── impact.html                # Trajectoire et valeur
├── equipe.html                # Organisation, méthode et qualité
├── 404.html                   # Page d'erreur GitHub Pages
├── assets/
│   ├── app.js                 # Animations et interactions
│   ├── styles.css             # Direction artistique responsive
│   └── epiverse-logo.png      # Logo officiel EpiVerse
├── .github/workflows/
│   └── deploy-pages.yml       # Déploiement GitHub Pages automatique
├── .nojekyll
└── site.webmanifest
```

## Publication sur `estellegiroud/epiverse-recruitment`

1. Dézipper l'archive.
2. Copier **le contenu** du dossier `EpiVerse-Nova` à la racine du dépôt `epiverse-recruitment`.
3. Faire un commit puis un push vers `main`.
4. Dans GitHub : **Settings → Pages → Build and deployment → Source → GitHub Actions**.
5. Attendre la fin du workflow **Deploy EpiVerse static site to GitHub Pages** dans l'onglet **Actions**.

L'URL attendue est :

```text
https://estellegiroud.github.io/epiverse-recruitment/
```

## Ce qui est inclus

- cinq pages indépendantes, avec une navigation contextuelle par page ;
- canvas étoilé, orbites CSS, cartes flottantes, animations scroll, menus mobiles, compteurs et interactions de tabs ;
- carte campus interactive en 2D HTML/CSS/JS : aucun WebGL, aucune dépendance lourde ;
- responsive desktop / mobile et respect de `prefers-reduced-motion` ;
- direction artistique EpiVerse : bleu nuit, cyan, violet, blanc cassé ;
- contenu aligné au positionnement campus d'engagement et d'opportunités, sans présenter l'IA ou le campus 3D/XR comme déjà livrés.

## Édition rapide

- Tous les textes sont dans les fichiers HTML.
- La direction artistique est centralisée dans `assets/styles.css`.
- Les interactions sont dans `assets/app.js`.
- Ne pas renommer les fichiers HTML sans mettre à jour les liens de navigation.
