"use client";

import { prefersReducedMotion } from "@/lib/motion";
import { useEffect, useRef } from "react";

export function BreathingBlob() {
  const outerRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.4 });
  const current = useRef({ x: 0.5, y: 0.4 });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Pointeur fin (souris) → l'orbe suit le curseur.
    // Sinon (mobile / tactile) → dérive aléatoire et lente, bornée autour de
    // sa position de repos pour rester « là où il est » plutôt que de
    // traverser l'écran.
    const finePointer =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const ease = finePointer ? 0.15 : 0.05;

    function onMove(event: MouseEvent) {
      target.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };
    }

    function wander() {
      target.current = {
        x: 0.3 + Math.random() * 0.4, // 0.30 → 0.70
        y: 0.26 + Math.random() * 0.28, // 0.26 → 0.54
      };
    }

    let frame = 0;
    let wanderTimer = 0;

    function animate() {
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;

      if (outerRef.current) {
        const offsetX = (current.current.x - 0.5) * 130;
        const offsetY = (current.current.y - 0.35) * 85;
        outerRef.current.style.setProperty("--blob-x", `${offsetX}px`);
        outerRef.current.style.setProperty("--blob-y", `${offsetY}px`);
      }

      frame = requestAnimationFrame(animate);
    }

    if (finePointer) {
      window.addEventListener("mousemove", onMove, { passive: true });
    } else {
      wander();
      wanderTimer = window.setInterval(wander, 2000);
    }

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
      window.clearInterval(wanderTimer);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div ref={outerRef} className="breathing-blob-outer">
        <div className="breathing-blob-inner" />
        <div className="breathing-blob-inner breathing-blob-inner--secondary" />
      </div>
    </div>
  );
}
