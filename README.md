# pauloromi.com

Un index minimaliste de mini-projets web, façon cabinet de curiosités. Chaque entrée pointe vers un projet déjà en ligne ailleurs.

## Ajouter un projet ou un article

Le contenu est piloté par des tableaux typés ; l'ordre du tableau est l'ordre d'affichage.

- **Projets** → [`src/data/projects.ts`](src/data/projects.ts)
- **Articles (section « Écriture »)** → [`src/data/writing.ts`](src/data/writing.ts)

Chaque entrée suit le type `IndexItem` ([`src/data/index-item.ts`](src/data/index-item.ts)) : `title`, `description`, `url`, `tag`, `year`, et `color` (`"blue"` ou `"pink"`, couleur du sweep au clic).

## Développement

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint (flat config, eslint-config-next)
npm run typecheck  # tsc --noEmit
```

## Stack

- Next.js 16 (App Router) + React 19 + Tailwind CSS 4
- Fonts : Fraunces (titres) et Instrument Sans (texte), via `next/font`
- Image de partage Open Graph / Twitter générée à la volée par
  [`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx) (polices dans `assets/fonts/`)
- `sitemap.xml` et `robots.txt` générés par l'App Router
- Déployé sur Vercel (CI GitHub Actions : typecheck + lint + build)

## Déploiement

```bash
npx vercel --prod
```
