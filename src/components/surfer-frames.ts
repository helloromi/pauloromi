/**
 * Frames du surfeur en pixel art — grilles 14×13.
 *  '.' transparent · 'o' combinaison/corps · 's' peau · 'k' œil
 *  'b' planche · 'w' écume/éclaboussure
 */

export const SURFER_W = 14;
export const SURFER_H = 13;

export const SURFER_COLORS: Record<string, string> = {
  o: "var(--ink)",
  s: "#ffe0c4",
  k: "var(--ink)",
  b: "var(--pink)",
  w: "#eaf7ff",
};

// ── Rame (allongé sur la planche) ────────────────────────────────────────────
const paddleA = [
  "..............",
  "..............",
  "..............",
  "..............",
  ".........oo...",
  "........osko..",
  "...oooooooo...",
  "..ooooooooo...",
  ".oo......oo...",
  ".o........ow..",
  "...........w..",
  ".bbbbbbbbbbbb.",
  "..............",
];

const paddleB = [
  "..............",
  "..............",
  "..............",
  "..............",
  ".........oo...",
  "........osko..",
  "...ooooooooo..",
  "..ooooooooo...",
  ".oo.......o...",
  ".o............",
  "..............",
  ".bbbbbbbbbbbb.",
  "..............",
];

// ── Surf (équilibre en bascule) ──────────────────────────────────────────────
const surfMid = [
  "..............",
  "....oo........",
  "...osso.......",
  "...osko.......",
  "....oo........",
  ".oooooooo.....",
  "...oooo.......",
  "...oooo.......",
  "...oooo.......",
  "...o..o.......",
  "..o....o......",
  "..o....o......",
  ".bbbbbbbbbb...",
];

const surfA = [
  "..............",
  "....oo........",
  "...osso.......",
  "...osko.......",
  ".oo.oo........",
  "...oooo.......",
  "...oooooo.....",
  "...oooo.......",
  "...oooo.......",
  "...o..o.......",
  "..o....o......",
  "..o....o......",
  ".bbbbbbbbbb...",
];

const surfB = [
  "..............",
  "....oo........",
  "...osso.......",
  "...osko.......",
  "....oo.oo.....",
  "...oooo.......",
  ".oooooo.......",
  "...oooo.......",
  "...oooo.......",
  "...o..o.......",
  "..o....o......",
  "..o....o......",
  ".bbbbbbbbbb...",
];

// ── Tricks (vraies poses, pas juste une rotation) ────────────────────────────
// Boule rentrée — utilisée pour le spin et le flip (la rotation CSS fait le reste).
const trickTuck = [
  "..............",
  "..............",
  ".....oo.......",
  "....osso......",
  "....osko......",
  "..oooooooo....",
  "..oooooooo....",
  "...oooooo.....",
  "...o..o.......",
  ".bbbbbbbb.....",
  "..............",
  "..............",
  "..............",
];

// Wipeout — il culbute tête en bas, bras écartés, écume partout.
const wipeoutA = [
  "....o..o......",
  "....oooo......",
  "...oooooo.....",
  ".o.osso.o.....",
  "...osko.......",
  "..w......w....",
  ".w..bbbb...w..",
  "..wwwwwwww....",
  ".w.w.w.w.w.w..",
  "..............",
  "..............",
  "..............",
  "..............",
];

const wipeoutB = [
  "..o....o......",
  "..oooooo......",
  "...oooo.......",
  "o..osso..o....",
  "...osko.......",
  ".w.......w....",
  "w...bbbb....w.",
  ".wwwwwwwwww...",
  "w.w.w.w.w.w.w.",
  "..............",
  "..............",
  "..............",
  "..............",
];

export type SurferFrame = string[];

export const SURFER_FRAMES = {
  paddleA,
  paddleB,
  surfMid,
  surfA,
  surfB,
  trickTuck,
  wipeoutA,
  wipeoutB,
} satisfies Record<string, SurferFrame>;

export type SurferFrameName = keyof typeof SURFER_FRAMES;

// Séquences de lecture (boucle) par mode.
export const PADDLE_SEQUENCE: SurferFrameName[] = ["paddleA", "paddleB"];
export const SURF_SEQUENCE: SurferFrameName[] = [
  "surfMid",
  "surfA",
  "surfMid",
  "surfB",
];

// Frames par trick (le boost n'a pas de pose dédiée : il garde le surf + vitesse).
export const TRICK_SEQUENCES: Record<string, SurferFrameName[]> = {
  spin: ["trickTuck"],
  flip: ["trickTuck"],
  wipeout: ["wipeoutA", "wipeoutB"],
};
