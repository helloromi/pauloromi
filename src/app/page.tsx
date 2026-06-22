import { BreathingBlob } from "@/components/BreathingBlob";
import { ColorSweepProvider } from "@/components/ColorSweep";
import { ContactBanner } from "@/components/ContactBanner";
import { Footer } from "@/components/Footer";
import { PixelSurfer } from "@/components/PixelSurfer";
import { PlayfulHeadline } from "@/components/PlayfulHeadline";
import { ProjectCard } from "@/components/ProjectCard";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import {
  geoEnrichmentTemplate,
  upcomingTemplateOffers,
} from "@/data/templates";
import { writing } from "@/data/writing";
import Link from "next/link";

export default function Home() {
  return (
    <ColorSweepProvider>
      <div className="grain relative flex min-h-screen flex-col">
        <div className="relative z-10 flex flex-1 flex-col">
          {/* Intro — l'orbe est confiné ici */}
          <header className="relative overflow-hidden">
            <BreathingBlob />
            <div className="relative mx-auto w-full max-w-4xl px-6 pt-24 pb-20 sm:px-10 sm:pt-36 sm:pb-28">
              <div
                className="fade-up flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3"
                style={{ "--stagger": 0 } as React.CSSProperties}
              >
                <p className="label text-blue">Paul Oromi</p>
                <nav
                  className="label flex gap-6 text-ink-soft"
                  aria-label="Profil"
                >
                  <Link
                    href="/templates/geo-enrichissement-hubspot"
                    className="link-underline tap-expand transition-colors hover:text-blue"
                  >
                    Templates
                  </Link>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline tap-expand transition-colors hover:text-blue"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline tap-expand transition-colors hover:text-pink"
                  >
                    CV
                  </a>
                </nav>
              </div>
              <PlayfulHeadline />
            </div>
          </header>

          {/* Écriture + index des projets — fond opaque pour couper l'orbe */}
          <main className="relative flex-1 bg-cream">
            <div
              className="label fade-up mx-auto max-w-4xl px-6 pb-5 text-ink-soft sm:px-10"
              style={{ "--stagger": 3 } as React.CSSProperties}
            >
              Écriture — {writing.length.toString().padStart(2, "0")}{" "}
              {writing.length > 1 ? "articles" : "article"}
            </div>
            <div
              className="fade-up"
              style={{ "--stagger": 4 } as React.CSSProperties}
            >
              {writing.map((article, i) => (
                <ProjectCard key={article.url} item={article} index={i} />
              ))}
              <div className="border-t border-line" />
            </div>

            <div
              className="label fade-up mx-auto max-w-4xl px-6 pb-5 pt-12 text-ink-soft sm:px-10"
              style={{ "--stagger": 5 } as React.CSSProperties}
            >
              Index — {projects.length.toString().padStart(2, "0")} projets
            </div>
            <div
              className="fade-up"
              style={{ "--stagger": 6 } as React.CSSProperties}
            >
              {projects.map((project, i) => (
                <ProjectCard key={project.url} item={project} index={i} />
              ))}
              <div className="border-t border-line" />
            </div>

            <div
              className="label fade-up mx-auto max-w-4xl px-6 pb-5 pt-12 text-ink-soft sm:px-10"
              style={{ "--stagger": 7 } as React.CSSProperties}
            >
              Catalogue de produits
            </div>
            <section
              className="fade-up border-t border-line bg-cream-deep/70"
              style={{ "--stagger": 8 } as React.CSSProperties}
              aria-labelledby="template-catalogue-title"
            >
              <div className="mx-auto grid max-w-4xl gap-6 px-6 py-10 sm:px-10 md:grid-cols-[1.15fr_0.85fr]">
                <Link
                  href="/templates/geo-enrichissement-hubspot"
                  className="group rounded-[2rem] border border-line bg-cream p-6 shadow-[0_16px_50px_rgba(26,46,59,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-blue/40"
                >
                  <p className="label text-blue">Disponible maintenant</p>
                  <h2
                    id="template-catalogue-title"
                    className="mt-5 font-serif text-3xl leading-tight text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl"
                  >
                    {geoEnrichmentTemplate.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
                    {geoEnrichmentTemplate.description}
                  </p>
                  <div className="label mt-6 flex flex-wrap gap-x-6 gap-y-2 text-ink-soft">
                    <span>{geoEnrichmentTemplate.format}</span>
                    <span>{geoEnrichmentTemplate.priceLabel}</span>
                  </div>
                </Link>

                <div className="rounded-[2rem] border border-line bg-cream p-6">
                  <p className="label text-pink">Bientôt</p>
                  <div className="mt-5 grid gap-3">
                    {upcomingTemplateOffers.slice(0, 3).map((offer) => (
                      <div key={offer.key} className="border-t border-line pt-3">
                        <p className="font-serif text-xl leading-tight text-ink">
                          {offer.shortTitle}
                        </p>
                        <p className="label mt-2 text-ink-soft">
                          {offer.priceLabel}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                    Des petits produits prêts à adapter pour mieux suivre les
                    adhésions, les événements et les tâches répétitives.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>

        <ContactBanner />
        <PixelSurfer />
        <Footer />
      </div>
    </ColorSweepProvider>
  );
}
