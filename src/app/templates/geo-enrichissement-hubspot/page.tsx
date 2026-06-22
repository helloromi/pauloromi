import { ContactBanner } from "@/components/ContactBanner";
import { Footer } from "@/components/Footer";
import { StripeLinkButton } from "@/components/StripeLinkButton";
import {
  geoEnrichmentTemplate,
  upcomingTemplateOffers,
} from "@/data/templates";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Géo-enrichissement HubSpot — Template Make.com",
  description:
    "Un blueprint Make.com pour ajouter automatiquement région et département à tes contacts HubSpot, avec Loom et README.",
  alternates: {
    canonical: "/templates/geo-enrichissement-hubspot",
  },
  openGraph: {
    title: "Géo-enrichissement HubSpot",
    description:
      "Ajoute région et département à tes contacts HubSpot avec un template Make.com prêt à brancher.",
    url: "/templates/geo-enrichissement-hubspot",
    siteName: "Paul Oromi",
    type: "website",
    locale: "fr_FR",
  },
};

const deliverables = [
  "Blueprint Make.com prêt à importer",
  "Tuto Loom pour comprendre le montage",
  "README avec prérequis, variables et points de vigilance",
  "Support léger par e-mail si quelque chose bloque au branchement",
];

const useCases = [
  "Segmenter par région sans normaliser les adresses à la main",
  "Router des leads ou adhérents vers la bonne personne",
  "Construire des listes HubSpot plus propres pour tes campagnes",
  "Préparer des dashboards territoriaux lisibles",
];

const faqs = [
  {
    question: "De quoi ai-je besoin ?",
    answer:
      "Un compte HubSpot, un compte Make.com et des contacts avec une donnée géographique exploitable. Le README précise les champs à adapter.",
  },
  {
    question: "Comment se passe la livraison ?",
    answer:
      "Après paiement Stripe, tu reviens sur une page de confirmation qui vérifie l'achat et génère un lien de téléchargement temporaire.",
  },
  {
    question: "Est-ce que c'est une installation sur mesure ?",
    answer:
      "Non, c'est un template autonome. Si tu veux que je l'installe ou l'adapte à ton CRM, on peut le traiter comme une mission séparée.",
  },
];

export default function GeoEnrichmentTemplatePage() {
  return (
    <div className="grain min-h-screen bg-cream text-ink">
      <header className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_20%_10%,rgba(39,121,167,0.18),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(255,147,152,0.18),transparent_32%)]" />
        <div className="relative mx-auto max-w-4xl px-6 pt-10 pb-20 sm:px-10 sm:pt-14 sm:pb-28">
          <nav
            className="label fade-up flex items-center justify-between text-ink-soft"
            style={{ "--stagger": 0 } as React.CSSProperties}
            aria-label="Navigation templates"
          >
            <Link
              href="/"
              className="link-underline tap-expand transition-colors hover:text-blue"
            >
              Paul Oromi
            </Link>
            <span className="text-blue">Template Make.com</span>
          </nav>

          <div
            className="fade-up mt-20 max-w-3xl"
            style={{ "--stagger": 1 } as React.CSSProperties}
          >
            <p className="label text-pink">{geoEnrichmentTemplate.format}</p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-ink sm:text-7xl">
              Géo-enrichissement HubSpot, sans tableur de rattrapage.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              {geoEnrichmentTemplate.description}
            </p>
          </div>

          <div
            className="fade-up mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={{ "--stagger": 2 } as React.CSSProperties}
          >
            <StripeLinkButton href={geoEnrichmentTemplate.stripePaymentLink}>
              Acheter {geoEnrichmentTemplate.priceLabel}
            </StripeLinkButton>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              Paiement par Stripe. Livraison sécurisée après confirmation du
              paiement.
            </p>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-line bg-cream-deep">
          <div className="mx-auto grid max-w-4xl gap-8 px-6 py-16 sm:px-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="label text-blue">Ce que tu reçois</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-ink">
                Un kit court, utile, branchable.
              </h2>
            </div>
            <div className="grid gap-3">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-line bg-cream px-5 py-4 text-sm leading-relaxed text-ink-soft"
                >
                  <span className="font-semibold text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-4xl gap-10 px-6 py-20 sm:px-10 md:grid-cols-2">
          <div>
            <p className="label text-pink">Pourquoi</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink">
              Le petit automatisme qui rend HubSpot plus exploitable.
            </h2>
            <p className="mt-5 text-base leading-7 text-ink-soft">
              Le but n&apos;est pas d&apos;ajouter une couche d&apos;outil.
              C&apos;est de nettoyer une donnée que tu utilises déjà, puis de la
              rendre disponible dans tes listes, pipelines et exports.
            </p>
          </div>
          <ul className="grid gap-4">
            {useCases.map((useCase) => (
              <li
                key={useCase}
                className="rounded-[1.75rem] border border-line bg-cream p-5 text-sm leading-relaxed text-ink-soft shadow-[0_12px_40px_rgba(26,46,59,0.04)]"
              >
                {useCase}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-line bg-cream-deep">
          <div className="mx-auto grid max-w-4xl gap-8 px-6 py-16 sm:px-10 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-line bg-cream p-6 shadow-[0_18px_50px_rgba(26,46,59,0.06)]">
              <div className="flex aspect-video items-center justify-center rounded-[1.5rem] border border-dashed border-blue/40 bg-[radial-gradient(circle_at_50%_10%,rgba(39,121,167,0.14),transparent_36%),#fff] p-8 text-center">
                <div>
                  <p className="label text-blue">Loom</p>
                  <p className="mt-4 font-serif text-3xl leading-tight text-ink">
                    Démo prête à intégrer.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    Je brancherai ici l&apos;embed Loom dès que l&apos;URL finale
                    est disponible.
                  </p>
                </div>
              </div>
            </div>
            <div className="self-center">
              <p className="label text-blue">Livraison</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-ink">
                Le fichier n&apos;est pas public.
              </h2>
              <p className="mt-5 text-base leading-7 text-ink-soft">
                Après Stripe, la page de confirmation vérifie la session de
                paiement côté serveur et génère un lien Supabase Storage signé,
                valable quelques minutes.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label text-pink">Ensuite</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-ink">
                Les prochains kits ops.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              Géo-enrichissement est le premier mis en ligne. Les autres briques
              servent de feuille de route.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {upcomingTemplateOffers.map((offer) => (
              <article
                key={offer.key}
                className="rounded-[1.75rem] border border-line bg-cream p-5 transition-colors hover:bg-cream-deep"
              >
                <div className="label flex items-center justify-between gap-4 text-ink-soft">
                  <span>{offer.category}</span>
                  <span>{offer.status === "premium" ? "Premium" : "Bientôt"}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-ink">
                  {offer.shortTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {offer.description}
                </p>
                <p className="label mt-5 text-blue">{offer.priceLabel}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-line bg-cream-deep">
          <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
            <p className="label text-blue">FAQ</p>
            <div className="mt-8 grid gap-5">
              {faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-[1.75rem] border border-line bg-cream p-6"
                >
                  <h3 className="font-serif text-2xl text-ink">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ContactBanner />
      <Footer />
    </div>
  );
}
