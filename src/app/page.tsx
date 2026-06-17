import { BreathingBlob } from "@/components/BreathingBlob";
import { ColorSweepProvider } from "@/components/ColorSweep";
import { ContactBanner } from "@/components/ContactBanner";
import { Footer } from "@/components/Footer";
import { PixelSurfer } from "@/components/PixelSurfer";
import { PlayfulHeadline } from "@/components/PlayfulHeadline";
import { ProjectCard } from "@/components/ProjectCard";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { writing } from "@/data/writing";

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
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline transition-colors hover:text-blue"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline transition-colors hover:text-pink"
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
          </main>
        </div>

        <ContactBanner />
        <PixelSurfer />
        <Footer />
      </div>
    </ColorSweepProvider>
  );
}
