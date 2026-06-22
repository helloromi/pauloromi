import { Footer } from "@/components/Footer";
import { TemplateDeliveryPanel } from "@/components/TemplateDeliveryPanel";
import { geoEnrichmentTemplate } from "@/data/templates";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Téléchargement — Géo-enrichissement HubSpot",
  description:
    "Page de confirmation et de téléchargement sécurisé du template Géo-enrichissement HubSpot.",
  robots: {
    index: false,
    follow: false,
  },
};

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function GeoEnrichmentSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  return (
    <div className="grain flex min-h-screen flex-col bg-cream text-ink">
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 pt-10 pb-20 sm:px-10 sm:pt-14">
          <nav
            className="label fade-up flex items-center justify-between text-ink-soft"
            style={{ "--stagger": 0 } as React.CSSProperties}
            aria-label="Navigation téléchargement"
          >
            <Link
              href="/templates/geo-enrichissement-hubspot"
              className="link-underline tap-expand transition-colors hover:text-blue"
            >
              Retour au template
            </Link>
            <span className="text-blue">Téléchargement</span>
          </nav>

          <header
            className="fade-up mt-20 max-w-3xl"
            style={{ "--stagger": 1 } as React.CSSProperties}
          >
            <p className="label text-pink">
              {geoEnrichmentTemplate.shortTitle}
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-ink sm:text-7xl">
              Merci, on prépare ton accès.
            </h1>
          </header>

          <div
            className="fade-up mt-12"
            style={{ "--stagger": 2 } as React.CSSProperties}
          >
            <TemplateDeliveryPanel sessionId={sessionId ?? null} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
