import { ContactBanner } from "@/components/ContactBanner";
import { Footer } from "@/components/Footer";
import { PixelSurfer } from "@/components/PixelSurfer";
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
    "Un modèle Make.com pour ajouter automatiquement région et département à tes contacts HubSpot, avec une vidéo d'explication.",
  alternates: {
    canonical: "/templates/geo-enrichissement-hubspot",
  },
  openGraph: {
    title: "Géo-enrichissement HubSpot",
    description:
      "Ajoute région et département à tes contacts HubSpot avec un modèle Make.com prêt à adapter.",
    url: "/templates/geo-enrichissement-hubspot",
    siteName: "Paul Oromi",
    type: "website",
    locale: "fr_FR",
  },
};

const deliverables = [
  "Un modèle Make.com prêt à importer",
  "Une vidéo courte pour voir comment l'utiliser",
  "Un guide simple avec les étapes à suivre",
  "Un e-mail de support si quelque chose bloque",
];

const useCases = [
  "Classer tes contacts par région ou département",
  "Éviter les copier-coller dans un tableur",
  "Préparer des listes plus propres pour tes e-mails",
  "Mieux comprendre d'où viennent tes contacts",
];

const faqs = [
  {
    question: "Comment recevoir les templates ?",
    answer:
      "Une page de conformation apparaîtra après paiement et vous génère un lien de téléchargement temporaire.",
  },
  {
    question: "Comment être accompagné ?",
    answer:
      "Si vous avez besoin d'aide pour installer ou utiliser le modèle, je peux vous accompagner. Nous discuterons ensemble des options qui vous conviennent le mieux.",
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
              Enrichis ton CRM.
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
              Téléchargement direct après paiement.
            </p>
          </div>
        </div>
      </header>

      <main>


        <section className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label text-pink">A venir</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-ink">
                Les prochains produits.
              </h2>
            </div>
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
      <PixelSurfer />
      <Footer />
    </div>
  );
}
