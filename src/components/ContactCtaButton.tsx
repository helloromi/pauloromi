"use client";

import { useRef, useState, type MouseEvent } from "react";

export function ContactCtaButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  function setOrigin(event: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  function handleEnter(event: MouseEvent<HTMLAnchorElement>) {
    setOrigin(event);
    setHovered(true);
  }

  function handleLeave(event: MouseEvent<HTMLAnchorElement>) {
    setOrigin(event);
    requestAnimationFrame(() => setHovered(false));
  }

  return (
    <a
      ref={ref}
      href="mailto:hello@pauloromi.com"
      className={`contact-banner-cta mt-16 sm:mt-20${hovered ? " is-hovered" : ""}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span>Écrire</span>
      <span className="contact-banner-cta-arrow" aria-hidden>
        &rarr;
      </span>
    </a>
  );
}
