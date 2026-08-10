// Pure carousel math — no DOM, no React. Every function here is a plain
// transformation over numbers so the scroll-driven behavior of the Work
// carousel is testable in isolation from rendering.

// Reduce any integer into the ring [0, count).
export const wrapIndex = (index, count) => {
  if (count <= 0) return 0;
  return ((index % count) + count) % count;
};

// How many full passes through the project set the pinned exhibition
// supports. Derived from project count and a target scroll-length budget
// (not a fixed number) — fewer projects cycle more, more projects cycle
// less, always clamped to [minCycles, maxCycles] so the section can never
// end too abruptly or run absurdly long.
export const getCycleCount = (count, {
  pinStepVh = 34, targetExtraVh = 480, minCycles = 2, maxCycles = 3,
} = {}) => {
  if (count <= 0) return 0;
  const raw = Math.round(targetExtraVh / (count * pinStepVh));
  return Math.min(maxCycles, Math.max(minCycles, raw));
};

// Total number of project-to-project steps across every cycle.
export const getTotalSteps = (count, cycles) => Math.max(count * cycles, 0);

// Total pinned scroll distance in vh — the base viewport plus one
// "pinStepVh" per project-to-project step across every cycle.
export const getPinHeightVh = (count, cycles, { baseVh = 100, pinStepVh = 34 } = {}) => (
  baseVh + getTotalSteps(count, cycles) * pinStepVh
);

// Raw scroll progress [0,1] over the pinned distance -> a continuous
// position where advancing by 1 unit means advancing by one project.
// This can exceed a single lap (0..count) when totalSteps spans multiple
// cycles — that's what makes the loop genuinely traversed, not just
// adjacent at the seam.
export const progressToVirtualPosition = (progress, totalSteps) => {
  const clamped = Math.min(1, Math.max(0, progress));
  return clamped * totalSteps;
};

export const virtualPositionToActiveIndex = (virtualPosition, count) => (
  wrapIndex(Math.round(virtualPosition), count)
);

// Signed shortest distance from a project's own index to the current
// virtual position, honoring wraparound — e.g. count=8: project 0 vs a
// position of 15.6 (deep into cycle 2) is a near distance of ~0.4, not
// the raw 15.6. This is what makes every wrap point behave exactly like
// any other project-to-project step: the formula doesn't know or care
// where a "seam" is.
export const shortestSignedDistance = (projectIndex, virtualPosition, count) => {
  if (count <= 0) return 0;
  const raw = projectIndex - virtualPosition;
  const wrapped = ((raw % count) + count) % count;
  return wrapped > count / 2 ? wrapped - count : wrapped;
};

export const distanceToScale = (distance, { max = 1, min = 0.72, falloff = 1.6 } = {}) => {
  const t = Math.min(1, Math.abs(distance) / falloff);
  return max - (max - min) * t;
};

export const distanceToOpacity = (distance, { max = 1, min = 0.22, falloff = 1.6 } = {}) => {
  const t = Math.min(1, Math.abs(distance) / falloff);
  return max - (max - min) * t;
};

// How many neighbor slots on each side stay visually non-zero — used to
// size the virtualized rendering window (2 * radius + 1 mounted plates,
// regardless of total project count).
export const getBufferRadius = (falloff = 1.6) => Math.ceil(falloff) + 1;

// Readable body copy (title/description/meta/CTA) needs a much steeper
// falloff than the plate's own scale/opacity: a neighbor sitting a full
// step away should read as a dim schematic silhouette, never as legible
// half-sentences. A quartic (hold-then-drop) curve keeps the dominant
// plate's copy near full strength through most of its "turn" and only
// crashes out right at the handoff boundary — distance ±0.5, exactly
// where dominance flips to the next project — instead of fading evenly
// across the whole window.
export const distanceToContentOpacity = (distance, { max = 1, min = 0, falloff = 0.65 } = {}) => {
  const t = Math.min(1, Math.abs(distance) / falloff);
  const eased = t ** 4;
  return max - (max - min) * eased;
};
