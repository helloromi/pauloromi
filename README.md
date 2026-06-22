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

## Livraison des templates

La page `/templates/geo-enrichissement-hubspot` utilise Stripe Checkout puis
Supabase Storage privé pour livrer un lien signé après paiement.

À configurer avant production :

- Dans Stripe, régler l'URL de succès du Payment Link vers
  `https://pauloromi.com/templates/geo-enrichissement-hubspot/success?session_id={CHECKOUT_SESSION_ID}`.
- Dans Supabase, créer le bucket privé `template-deliveries` et y déposer le
  fichier `hubspot-geo-enrichment/geo-enrichissement-hubspot.zip`.
- Appliquer la migration Supabase dans `supabase/migrations`.
- Renseigner les variables listées dans `.env.example`, notamment
  `STRIPE_SECRET_KEY`, `STRIPE_GEO_ENRICHMENT_PRICE_ID` ou `STRIPE_GEO_ID`,
  `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`.

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
