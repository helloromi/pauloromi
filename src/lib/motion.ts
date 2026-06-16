export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Délai avant navigation — quand l'écran est couvert */
export const SWEEP_NAVIGATE_MS = 280;

/** Durée totale de l'overlay */
export const SWEEP_ANIMATION_MS = 420;
