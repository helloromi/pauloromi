import { BoussoleIaEss } from "@/components/BoussoleIaEss";
import { ContactBanner } from "@/components/ContactBanner";
import { Footer } from "@/components/Footer";
import { PixelSurfer } from "@/components/PixelSurfer";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Boussole IA · ESS — décider quand utiliser l'IA",
  description:
    "Un outil gratuit pour les structures ESS : décider quand utiliser l'IA, quand s'abstenir, et accéder à une bibliothèque de prompts avec garde-fous.",
  alternates: {
    canonical: "/boussole-ia-ess",
  },
  openGraph: {
    title: "Boussole IA · ESS",
    description:
      "Décide quand utiliser l'IA dans une structure ESS, avec une bibliothèque de prompts orientés terrain.",
    url: "/boussole-ia-ess",
    siteName: "Paul Oromi",
    type: "website",
    locale: "fr_FR",
  },
};

export default function BoussoleIaEssPage() {
  return (
    <div className="grain min-h-screen bg-cream text-ink">
      <header className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_15%_12%,rgba(39,121,167,0.16),transparent_34%),radial-gradient(circle_at_88%_20%,rgba(255,147,152,0.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-5xl px-6 pt-10 pb-16 sm:px-10 sm:pt-14 sm:pb-24">
          <nav
            className="label fade-up flex items-center justify-between text-ink-soft"
            style={{ "--stagger": 0 } as React.CSSProperties}
            aria-label="Navigation Boussole IA ESS"
          >
            <Link
              href="/"
              className="link-underline tap-expand transition-colors hover:text-blue"
            >
              Paul Oromi
            </Link>
            <span className="text-blue">Outil gratuit</span>
          </nav>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div
              className="fade-up max-w-3xl"
              style={{ "--stagger": 1 } as React.CSSProperties}
            >
              <p className="label text-pink">Boussole IA · ESS</p>
              <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-ink sm:text-7xl">
                Savoir quand sortir l’IA.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
                Un décideur simple et une bibliothèque de prompts pour les
                associations, collectifs et structures de l’économie sociale et
                solidaire. L’objectif : gagner du temps sans perdre le cadre.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#boussole"
                  className="rounded-full border border-ink bg-ink px-6 py-3 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
                >
                  Lancer la boussole
                </a>
                <a
                  href="#bibliotheque"
                  className="rounded-full border border-line bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
                >
                  Voir les prompts
                </a>
              </div>
            </div>

            <aside
              className="fade-up rounded-[2rem] border border-line bg-cream/80 p-6 shadow-sm backdrop-blur"
              style={{ "--stagger": 2 } as React.CSSProperties}
            >
              <p className="label text-blue">Pourquoi cet outil</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-ink-soft">
                <p>
                  Dans l’ESS, le vrai sujet n’est pas de tout automatiser. C’est
                  de choisir les bons usages, de protéger les personnes et de
                  garder une équipe capable de vérifier.
                </p>
                <p>
                  Les prompts sont utiles seulement s’ils viennent avec leurs
                  limites. Chaque fiche indique aussi quand ne pas l’utiliser.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14 sm:px-10 sm:py-20">
        <BoussoleIaEss />
      </main>

      <ContactBanner />
      <PixelSurfer />
      <Footer />
    </div>
  );
}
