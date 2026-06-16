"use client";

import { prefersReducedMotion } from "@/lib/motion";
import { useEffect, useRef } from "react";

export function BreathingBlob() {
  const outerRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.4 });
  const current = useRef({ x: 0.5, y: 0.4 });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    function onMove(event: MouseEvent) {
      target.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };
    }

    let frame = 0;

    function animate() {
      current.current.x += (target.current.x - current.current.x) * 0.15;
      current.current.y += (target.current.y - current.current.y) * 0.15;

      if (outerRef.current) {
        const offsetX = (current.current.x - 0.5) * 130;
        const offsetY = (current.current.y - 0.35) * 85;
        outerRef.current.style.setProperty("--blob-x", `${offsetX}px`);
        outerRef.current.style.setProperty("--blob-y", `${offsetY}px`);
      }

      frame = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div ref={outerRef} className="breathing-blob-outer">
        <div className="breathing-blob-inner" />
        <div className="breathing-blob-inner breathing-blob-inner--secondary" />
      </div>
    </div>
  );
}
