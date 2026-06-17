"use client";

import { useColorSweep } from "@/components/ColorSweep";
import { projectColors, type ProjectColor } from "@/data/projects";
import { prefersReducedMotion } from "@/lib/motion";
import { useRef, type MouseEvent } from "react";

const headlineWords = [
  "Quelques",
  "projets",
  "personnels",
  "et",
  "professionnels.",
];

export function PlayfulHeadline() {
  const { triggerSweep } = useColorSweep();
  const colorIndex = useRef(0);

  function nextColor(): ProjectColor {
    const color = projectColors[colorIndex.current % projectColors.length];
    colorIndex.current += 1;
    return color;
  }

  async function handleWordClick(
    event: MouseEvent<HTMLSpanElement>,
    color: ProjectColor,
  ) {
    event.preventDefault();
    if (prefersReducedMotion()) return;
    await triggerSweep(color, event.clientX, event.clientY);
  }

  return (
    <h1
      className="fade-up mt-6 max-w-2xl font-serif text-4xl leading-[1.15] sm:text-6xl"
      style={{ "--stagger": 1 } as React.CSSProperties}
    >
      {/* Le sweep coloré au clic est purement décoratif : on le laisse à la
          souris et on n'expose pas 5 « boutons » aux lecteurs d'écran — le
          titre doit se lire comme un simple titre. */}
      {headlineWords.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span
            className="headline-word"
            onClick={(event) => handleWordClick(event, nextColor())}
          >
            {word}
          </span>{" "}
        </span>
      ))}
    </h1>
  );
}
