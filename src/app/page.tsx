import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="grain flex min-h-screen flex-col">
      {/* Intro */}
      <header className="mx-auto w-full max-w-4xl px-6 pt-24 pb-20 sm:px-10 sm:pt-36 sm:pb-28">
        <p className="label fade-up text-terracotta" style={{ "--stagger": 0 } as React.CSSProperties}>
          Un cabinet de curiosités
        </p>
        <h1
          className="fade-up mt-6 max-w-2xl font-serif text-4xl leading-[1.15] sm:text-6xl"
          style={{ "--stagger": 1 } as React.CSSProperties}
        >
          De petites choses faites pour le web, sans autre ambition que
          d&rsquo;exister.
        </h1>
        <p
          className="fade-up mt-8 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg"
          style={{ "--stagger": 2 } as React.CSSProperties}
        >
          Des expériences, des outils minuscules, des idées du dimanche.
          Tout est rassemblé ici, au même endroit. Prenez votre temps.
        </p>
      </header>

      {/* Index des projets */}
      <main className="flex-1">
        <div
          className="label fade-up mx-auto max-w-4xl px-6 pb-5 text-ink-soft sm:px-10"
          style={{ "--stagger": 3 } as React.CSSProperties}
        >
          Index — {projects.length.toString().padStart(2, "0")} projets
        </div>
        <div className="fade-up" style={{ "--stagger": 4 } as React.CSSProperties}>
          {projects.map((project, i) => (
            <ProjectCard key={project.url} project={project} index={i} />
          ))}
          <div className="border-t border-line" />
        </div>
      </main>

      {/* Footer */}
      <footer
        className="fade-up mx-auto w-full max-w-4xl px-6 py-16 sm:px-10"
        style={{ "--stagger": 5 } as React.CSSProperties}
      >
        <div className="flex flex-col gap-3 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>
            Fabriqué lentement —{" "}
            <a href="https://pauloromi.com" className="link-underline">
              pauloromi.com
            </a>
          </span>
          <span className="label">&copy; {year}</span>
        </div>
      </footer>
    </div>
  );
}
