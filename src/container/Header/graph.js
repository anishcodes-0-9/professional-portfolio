// ─────────────────────────────────────────────
// Deterministic layout for the hero's node-graph background.
// Pure data generation — no DOM/React — so it can be reasoned
// about (and sanity-checked) independently of rendering.
//
// The graph is not an abstract random mesh: four fixed "domain"
// nodes stand in for the real engineering categories the work is
// built from, and every minor node attaches to the domain nearest
// it. The diagram is meant to read as "these are the parts", not
// as decorative noise.
// ─────────────────────────────────────────────

export const VIEWBOX = { width: 1200, height: 700 };

const MARGIN = 56;
const CORNER_RADIUS = 10;
const PROXIMITY_RADIUS = 190;
const MINOR_COUNT = { full: 9, reduced: 5, static: 5 };

// Fixed, deliberate positions — clustered center-right, between the
// hero's content column and its metric column, so the diagram reads
// as a bridge between the two rather than sitting behind either.
export const DOMAIN_NODES = [
  {
    id: 'frontend', label: 'FRONTEND', x: 660, y: 140,
  },
  {
    id: 'backend', label: 'BACKEND', x: 580, y: 320,
  },
  {
    id: 'cloud', label: 'CLOUD', x: 720, y: 460,
  },
  {
    id: 'systems', label: 'SYSTEMS', x: 830, y: 250,
  },
];

const DOMAIN_EDGES = [
  ['frontend', 'backend'],
  ['backend', 'cloud'],
  ['cloud', 'systems'],
  ['systems', 'frontend'],
  ['backend', 'systems'],
];

// Park-Miller LCG — deterministic per seed, arithmetic only (no bitwise
// ops), so a given density/seed always produces the same layout instead
// of reshuffling on every re-render like Math.random() would.
const createRng = (seed) => {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;

  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
};

// Rounded-corner elbow route between two points — reads as a circuit
// trace (right-angle routing) rather than the straight lines every
// generic "particle network" background uses.
export const elbowPath = (x1, y1, x2, y2, rng) => {
  const cornerX = rng() > 0.5 ? x2 : x1;
  const cornerY = cornerX === x2 ? y1 : y2;

  const leg1Length = Math.hypot(cornerX - x1, cornerY - y1) || 1;
  const radius1 = Math.min(CORNER_RADIUS, leg1Length / 2);
  const preCornerX = x1 + ((cornerX - x1) / leg1Length) * (leg1Length - radius1);
  const preCornerY = y1 + ((cornerY - y1) / leg1Length) * (leg1Length - radius1);

  const leg2Length = Math.hypot(x2 - cornerX, y2 - cornerY) || 1;
  const radius2 = Math.min(CORNER_RADIUS, leg2Length / 2);
  const postCornerX = cornerX + ((x2 - cornerX) / leg2Length) * radius2;
  const postCornerY = cornerY + ((y2 - cornerY) / leg2Length) * radius2;

  return `M ${x1} ${y1} L ${preCornerX} ${preCornerY} Q ${cornerX} ${cornerY} ${postCornerX} ${postCornerY} L ${x2} ${y2}`;
};

const pickUniqueIndices = (count, max, rng) => {
  const indices = new Set();
  while (indices.size < Math.min(count, max)) {
    indices.add(Math.floor(rng() * max));
  }
  return indices;
};

/**
 * Generates a sparse, deterministic node graph for the hero background.
 * The four domain nodes are always present, at fixed positions, at every
 * density — only the minor "texture" nodes scale down for smaller/static
 * tiers, so the meaningful part of the diagram never disappears.
 */
export const generateGraph = ({ seed = 42, density = 'full' } = {}) => {
  const rng = createRng(seed);
  const minorCount = MINOR_COUNT[density] ?? MINOR_COUNT.full;
  const { width, height } = VIEWBOX;

  const domainNodes = DOMAIN_NODES.map((node) => ({ ...node, tier: 'domain' }));

  const minorNodes = Array.from({ length: minorCount }, (_, index) => ({
    id: `m${index}`,
    x: MARGIN + rng() * (width - MARGIN * 2),
    y: MARGIN + rng() * (height - MARGIN * 2),
    tier: 'minor',
  }));

  const nodes = [...domainNodes, ...minorNodes];
  const nodeById = new Map(nodes.map((node) => [node.id, node]));

  const seenPairs = new Set();
  const edges = [];

  const addEdge = (fromId, toId) => {
    const pairKey = fromId < toId ? `${fromId}|${toId}` : `${toId}|${fromId}`;
    if (seenPairs.has(pairKey)) return;
    seenPairs.add(pairKey);

    const from = nodeById.get(fromId);
    const to = nodeById.get(toId);
    edges.push({
      id: `e-${pairKey}`,
      fromId,
      toId,
      d: elbowPath(from.x, from.y, to.x, to.y, rng),
      pulse: false,
      domain: true,
    });
  };

  DOMAIN_EDGES.forEach(([a, b]) => addEdge(a, b));

  // Each minor node links to its nearest domain node — texture radiating
  // from the four real engineering categories, not a random mesh.
  minorNodes.forEach((node) => {
    const nearestDomain = domainNodes
      .map((domain) => ({
        id: domain.id,
        distance: Math.hypot(domain.x - node.x, domain.y - node.y),
      }))
      .sort((a, b) => a.distance - b.distance)[0];

    const pairKey = node.id < nearestDomain.id ? `${node.id}|${nearestDomain.id}` : `${nearestDomain.id}|${node.id}`;
    if (seenPairs.has(pairKey)) return;
    seenPairs.add(pairKey);

    const from = node;
    const to = nodeById.get(nearestDomain.id);
    edges.push({
      id: `e-${pairKey}`,
      fromId: node.id,
      toId: nearestDomain.id,
      d: elbowPath(from.x, from.y, to.x, to.y, rng),
      pulse: false,
      domain: false,
    });
  });

  // A small minority of the domain-to-domain edges "pulse" (signal
  // traversal) — capped low so it always reads as a rare accent.
  const domainEdgeIndices = edges
    .map((edge, index) => (edge.domain ? index : null))
    .filter((index) => index !== null);
  const pulseCount = Math.min(2, domainEdgeIndices.length);
  const pulseSelection = pickUniqueIndices(pulseCount, domainEdgeIndices.length, rng);
  pulseSelection.forEach((selectionIndex) => {
    edges[domainEdgeIndices[selectionIndex]].pulse = true;
  });

  return { nodes, edges };
};

export const getDensityForViewport = (viewportWidth) => {
  if (viewportWidth < 640) return 'static';
  if (viewportWidth < 1024) return 'reduced';
  return 'full';
};

export const PROXIMITY = { radius: PROXIMITY_RADIUS };
