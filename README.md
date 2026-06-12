# pauloromi.com

Un index minimaliste de mini-projets web, façon cabinet de curiosités. Chaque entrée pointe vers un projet déjà en ligne ailleurs.

## Ajouter un projet

Tout se passe dans [`src/data/projects.ts`](src/data/projects.ts) : ajouter une entrée au tableau `projects` (titre, description, URL, étiquette, année). L'ordre du tableau est l'ordre d'affichage.

## Développement

```bash
npm install
npm run dev
```

Le site est sur [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js (App Router) + Tailwind CSS
- Fonts : Fraunces (titres) et Instrument Sans (texte), via `next/font`
- Déployé sur Vercel

## Déploiement

```bash
npx vercel --prod
```
