"use client";

import { prefersReducedMotion } from "@/lib/motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  PADDLE_SEQUENCE,
  SURF_SEQUENCE,
  SURFER_COLORS,
  SURFER_FRAMES,
  TRICK_SEQUENCES,
  type SurferFrameName,
} from "@/components/surfer-frames";

const CELL = 4; // taille d'un pixel (px)
const BOOST_MS = 900;

// Tricks tirés au hasard à chaque clic.
const TRICKS = ["spin", "flip", "wipeout", "boost"] as const;
const TRICK_MS: Record<string, number> = { spin: 720, flip: 760, wipeout: 900, boost: BOOST_MS };

// Petites répliques au clic.
const CHEERS = ["Yeah!", "Let's go!", "What a fun day", "Woohoo!", "Cowabunga!", "So stoked!", "Nailed it!"];
const WIPEOUT_CHEERS = ["Oops!", "Wipeout!", "Brrr…", "I'm okay!"];
const BUBBLE_MS = 1600;

/** PRNG seedé (mulberry32) → houle aléatoire mais déterministe (SSR === client). */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Harmonic = { f: number; amp: number; phase: number };

/** Somme de sinusoïdes à fréquences ENTIÈRES (raccord de tuile garanti),
 *  avec amplitudes et phases tirées au hasard → crêtes irrégulières. */
function makeHarmonics(seed: number, extra: number): Harmonic[] {
  const rng = mulberry32(seed);
  const harmonics: Harmonic[] = [{ f: 1, amp: 1, phase: rng() * Math.PI * 2 }];
  for (let k = 0; k < extra; k++) {
    harmonics.push({
      f: 2 + Math.floor(rng() * 6), // 2..7
      amp: 0.12 + rng() * 0.4,
      phase: rng() * Math.PI * 2,
    });
  }
  return harmonics;
}

type WaveOpts = {
  w: number; // largeur de la tuile (cellules) — une ou plusieurs périodes
  h: number; // hauteur de la tuile (cellules)
  baseline: number; // niveau moyen de la crête
  amp: number; // amplitude crête-à-crête (cellules)
  harmonics: Harmonic[];
  body: string;
  foam: string;
  foam2?: string;
};

/** Génère une tuile de vague pixelisée (SVG, prête à répéter). */
function waveTile({ w, h, baseline, amp, harmonics, body, foam, foam2 }: WaveOpts): string {
  const norm = harmonics.reduce((s, hm) => s + hm.amp, 0);
  let rects = "";
  for (let x = 0; x < w; x++) {
    let value = 0;
    for (const hm of harmonics) {
      value += hm.amp * Math.sin((2 * Math.PI * hm.f * x) / w + hm.phase);
    }
    const crest = Math.round(baseline - (amp * value) / norm);
    const top = Math.max(0, Math.min(h - 1, crest));
    rects += `<rect x='${x}' y='${top}' width='1' height='${h - top}' fill='${body}'/>`;
    rects += `<rect x='${x}' y='${top}' width='1' height='1' fill='${foam}'/>`;
    if (foam2 && top + 1 < h) {
      rects += `<rect x='${x}' y='${top + 1}' width='1' height='1' fill='${foam2}'/>`;
    }
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' shape-rendering='crispEdges'>${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

type Layer = {
  opts: WaveOpts;
  pxps: number; // vitesse de défilement (px / seconde)
  opacity: number;
  dir: 1 | -1;
};

// Du plus lointain (clair, lent, en haut) au plus proche (foncé, rapide, en bas).
const LAYERS: Layer[] = [
  {
    opts: {
      w: 80,
      h: 22,
      baseline: 12,
      amp: 4,
      harmonics: makeHarmonics(1337, 3),
      body: "#9cc6dd",
      foam: "#e3f1f8",
    },
    pxps: 34,
    opacity: 0.55,
    dir: -1,
  },
  {
    opts: {
      w: 72,
      h: 20,
      baseline: 10,
      amp: 5,
      harmonics: makeHarmonics(7, 4),
      body: "#5e9fc4",
      foam: "#cfe7f3",
      foam2: "#ffd2d4",
    },
    pxps: 58,
    opacity: 0.8,
    dir: 1,
  },
  {
    opts: {
      w: 64,
      h: 18,
      baseline: 8,
      amp: 6,
      harmonics: makeHarmonics(99, 4),
      body: "#2779a7",
      foam: "#ff9398",
      foam2: "#bfe3f2",
    },
    pxps: 92,
    opacity: 1,
    dir: -1,
  },
];

// La couche de devant porte le surfeur : on aligne ses pieds sur la crête moyenne.
const FRONT_LAYER = LAYERS[LAYERS.length - 1];
const FRONT = FRONT_LAYER.opts;
const SURFER_BOTTOM = (FRONT.h - FRONT.baseline) * CELL - 8;
const FRONT_NORM = FRONT.harmonics.reduce((s, h) => s + h.amp, 0);

/** Hauteur de crête (en cellules, valeur continue) de la vague de devant. */
function frontCrestCell(cellX: number): number {
  let v = 0;
  for (const h of FRONT.harmonics) {
    v += h.amp * Math.sin((2 * Math.PI * h.f * cellX) / FRONT.w + h.phase);
  }
  return FRONT.baseline - (FRONT.amp * v) / FRONT_NORM;
}

function SurferSprite({ grid }: { grid: string[] }) {
  const rects: React.ReactElement[] = [];
  grid.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const fill = SURFER_COLORS[row[x]];
      if (!fill) continue;
      rects.push(
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />,
      );
    }
  });

  return (
    <svg
      className="pixel-surfer-svg"
      viewBox="0 0 14 13"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {rects}
    </svg>
  );
}

export function PixelSurfer() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rideRef = useRef<HTMLSpanElement>(null);
  const frontWaveRef = useRef<HTMLDivElement>(null);
  const boostStartRef = useRef(0);
  const [surfing, setSurfing] = useState(false);
  const [boosting, setBoosting] = useState(false);
  const [trick, setTrick] = useState<string | null>(null);
  const [bubble, setBubble] = useState<{ text: string; id: number } | null>(null);
  const bubbleId = useRef(0);
  const reduced = useRef(false);
  // Modes : "paddle" (allongé, il rame) → "surf" (debout, bascule) au 1er clic.
  const [mode, setMode] = useState<"paddle" | "surf">("paddle");
  const [frame, setFrame] = useState(0);
  // Écume de base selon le mode (rame = lent → peu ; surf = plus rapide → plus).
  const foamBaseRef = useRef(0.28);
  useEffect(() => {
    foamBaseRef.current = mode === "surf" ? 0.5 : 0.28;
  }, [mode]);

  useEffect(() => {
    reduced.current = prefersReducedMotion();

    if (reduced.current) {
      setSurfing(true);
      setMode("surf");
      return;
    }

    const node = sceneRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSurfing(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Boucle unique : pilote la vague de devant ET le surfeur (sync parfaite,
  // même pendant le boost). Le surfeur épouse la crête sous ses pieds.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const scene = sceneRef.current;
    const ride = rideRef.current;
    const wave = frontWaveRef.current;
    if (!scene || !ride || !wave) return;

    const tilePx = FRONT.w * CELL;
    let last = performance.now();
    let phase = 0;
    let frame = 0;

    function step(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // Boost : impulsion de vitesse en cloche (sin) qui retombe seule.
      let boost = 1;
      if (boostStartRef.current) {
        const p = (now - boostStartRef.current) / BOOST_MS;
        if (p >= 1) boostStartRef.current = 0;
        else boost = 1 + 1.6 * Math.sin(Math.PI * p);
      }

      phase += FRONT_LAYER.dir * FRONT_LAYER.pxps * boost * dt;
      phase %= tilePx;
      wave!.style.backgroundPositionX = `${phase}px`;

      // Écume derrière le surfeur : base (selon le mode) + supplément au boost.
      const foam = Math.max(
        0.15,
        Math.min(1, foamBaseRef.current + (boost - 1) * 0.5),
      );
      scene!.style.setProperty("--foam", foam.toFixed(3));

      const centerX = scene!.clientWidth * 0.16 + 32; // centre du surfeur
      const cellX = (centerX - phase) / CELL;
      const crest = frontCrestCell(cellX);
      const ty = (crest - FRONT.baseline) * CELL; // suit la hauteur de la houle
      const slope = frontCrestCell(cellX + 1.5) - frontCrestCell(cellX - 1.5);
      const tilt = Math.max(-15, Math.min(15, slope * 7));

      ride!.style.transform = `translateY(${ty.toFixed(2)}px) rotate(${tilt.toFixed(2)}deg)`;
      frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Séquence de frames active : un trick prime, sinon le mode courant.
  const sequence = useMemo<SurferFrameName[]>(() => {
    if (trick && TRICK_SEQUENCES[trick]) return TRICK_SEQUENCES[trick];
    return mode === "paddle" ? PADDLE_SEQUENCE : SURF_SEQUENCE;
  }, [mode, trick]);

  // Cadence du folioscope (ms / frame) selon ce qu'il fait.
  const frameMs = trick
    ? trick === "wipeout"
      ? 110
      : 200
    : mode === "paddle"
      ? 260
      : 190;

  // Défilement des frames. Figé si reduced-motion ou pose unique (le reset
  // d'index se fait dans les handlers de clic, pas ici).
  useEffect(() => {
    if (reduced.current || sequence.length <= 1) return;
    const id = window.setInterval(
      () => setFrame((f) => (f + 1) % sequence.length),
      frameMs,
    );
    return () => window.clearInterval(id);
  }, [sequence, frameMs]);

  const currentGrid =
    SURFER_FRAMES[sequence[frame % sequence.length] ?? sequence[0]];

  function showBubble(text: string) {
    const id = (bubbleId.current += 1);
    setBubble({ text, id });
    window.setTimeout(() => {
      setBubble((prev) => (prev?.id === id ? null : prev));
    }, BUBBLE_MS);
  }

  // 1er clic : il se met debout. Clics suivants : tricks.
  function handleSurferClick() {
    if (reduced.current) return;
    if (mode === "paddle") {
      setMode("surf");
      setFrame(0);
      showBubble("C'est parti !");
      return;
    }
    handleTrick();
  }

  function handleTrick() {
    if (trick) return;
    const pick = TRICKS[Math.floor(Math.random() * TRICKS.length)];
    setTrick(pick);
    setFrame(0);
    if (pick === "boost") {
      boostStartRef.current = performance.now();
      setBoosting(true);
    }

    const pool = pick === "wipeout" ? WIPEOUT_CHEERS : CHEERS;
    showBubble(pool[Math.floor(Math.random() * pool.length)]);
    window.setTimeout(() => {
      setTrick(null);
      if (pick === "boost") setBoosting(false);
    }, TRICK_MS[pick]);
  }

  return (
    <div
      ref={sceneRef}
      className={`pixel-surf-scene${surfing ? " is-surfing" : ""}${boosting ? " is-boosting" : ""}`}
      aria-hidden
    >
      {LAYERS.map((layer, i) => {
        const tilePx = layer.opts.w * CELL;
        const duration = (tilePx / layer.pxps).toFixed(2);
        const isFront = i === LAYERS.length - 1;
        return (
          <div
            key={i}
            ref={isFront ? frontWaveRef : undefined}
            className="pixel-wave"
            style={
              {
                backgroundImage: waveTile(layer.opts),
                backgroundSize: `${tilePx}px ${layer.opts.h * CELL}px`,
                height: `${layer.opts.h * CELL}px`,
                opacity: layer.opacity,
                // La couche de devant est pilotée en JS (sync surfeur + boost).
                animation: isFront ? "none" : undefined,
                "--speed": `${duration}s`,
                "--shift": `${layer.dir * tilePx}px`,
              } as React.CSSProperties
            }
          />
        );
      })}
      <button
        type="button"
        className={`pixel-surfer${trick && trick !== "boost" ? ` is-${trick}` : ""}`}
        onClick={handleSurferClick}
        aria-label="Surfeur"
        style={{ bottom: `${SURFER_BOTTOM}px` }}
      >
        <span ref={rideRef} className="pixel-surfer-ride">
          {bubble && (
            <span key={bubble.id} className="pixel-surfer-bubble">
              {bubble.text}
            </span>
          )}
          <span className="pixel-surfer-wake" aria-hidden />
          <span className="pixel-surfer-bob">
            <SurferSprite grid={currentGrid} />
          </span>
        </span>
      </button>
    </div>
  );
}
