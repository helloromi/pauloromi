"use client";

import { useColorSweep } from "@/components/ColorSweep";
import type { IndexItem, IndexItemColor } from "@/data/index-item";
import { prefersReducedMotion } from "@/lib/motion";
import { Fragment, useState, type MouseEvent } from "react";

type ProjectCardProps = {
  item: IndexItem;
  index: number;
};

function PlayfulTitle({ title }: { title: string }) {
  const words = title.split(" ");
  // Index de lettre continu sur tout le titre \u2192 la vague de survol cascade
  // d'un mot \u00e0 l'autre.
  let letterIndex = 0;

  return (
    <h2 className="title-playful font-serif text-2xl leading-snug transition-transform duration-300 ease-out group-hover:translate-x-2 sm:text-4xl">
      {words.map((word, wi) => (
        <Fragment key={`${word}-${wi}`}>
          {/* Chaque mot reste ins\u00e9cable : la ligne ne peut se couper qu'entre
              les mots, jamais au milieu (cf. bug de c\u00e9sure mobile). */}
          <span className="title-playful-word">
            {word.split("").map((char, ci) => {
              const i = letterIndex++;
              return (
                <span
                  key={`${char}-${ci}`}
                  className="title-playful-letter"
                  style={{ "--letter-i": i } as React.CSSProperties}
                >
                  {char}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h2>
  );
}

export function ProjectCard({ item, index }: ProjectCardProps) {
  const { triggerSweep } = useColorSweep();
  const [activating, setActivating] = useState(false);
  const color: IndexItemColor = item.color ?? "blue";

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    if (prefersReducedMotion()) {
      return;
    }

    event.preventDefault();
    setActivating(true);
    try {
      await triggerSweep(color, event.clientX, event.clientY);
    } finally {
      // Garantir l'ouverture même si l'animation échoue, et ne jamais laisser
      // la carte bloquée en surbrillance. rel=noopener → pas de tabnabbing.
      setActivating(false);
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`card-link group block border-t border-line py-8 transition-colors duration-300 hover:bg-cream-deep sm:py-10${activating ? " project-card-activating" : ""}`}
    >
      <div className="mx-auto flex max-w-4xl items-baseline gap-5 px-6 sm:gap-10 sm:px-10">
        <span className="font-serif text-sm text-ink-soft tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-4">
            <PlayfulTitle title={item.title} />
            <span
              aria-hidden
              className="shrink-0 font-serif text-xl text-blue opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 sm:text-2xl -translate-x-2"
            >
              &rarr;
            </span>
          </div>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
            {item.description}
          </p>
          <div className="label mt-4 flex gap-6 text-ink-soft">
            <span>{item.tag}</span>
            <span>{item.year}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
