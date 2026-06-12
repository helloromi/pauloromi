import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-t border-line py-8 transition-colors duration-300 hover:bg-cream-deep sm:py-10"
    >
      <div className="mx-auto flex max-w-4xl items-baseline gap-5 px-6 sm:gap-10 sm:px-10">
        <span className="font-serif text-sm text-ink-soft tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl leading-snug transition-transform duration-300 ease-out group-hover:translate-x-2 sm:text-4xl">
              {project.title}
            </h2>
            <span
              aria-hidden
              className="shrink-0 font-serif text-xl text-terracotta opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 sm:text-2xl -translate-x-2"
            >
              &rarr;
            </span>
          </div>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
            {project.description}
          </p>
          <div className="label mt-4 flex gap-6 text-ink-soft">
            <span>{project.tag}</span>
            <span>{project.year}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
