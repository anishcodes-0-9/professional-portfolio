import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../wrapper/variants';
import {
  elbowPath, generateGraph, getDensityForViewport, PROXIMITY, VIEWBOX,
} from './graph';
import './HeroBackground.scss';

const prefersReducedMotion = () => (
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

const hasFinePointer = () => (
  typeof window !== 'undefined'
  && window.matchMedia('(pointer: fine)').matches
);

// Inverse of the "xMidYMid slice" transform: uniform scale sized to cover
// the box, centered, with overflow cropped on one axis. Shared by both the
// cursor-proximity handler and the metric-anchor measurement so a client
// point always maps to viewBox space the same way.
const toViewBoxPoint = (clientX, clientY, svgRect) => {
  const scale = Math.max(svgRect.width / VIEWBOX.width, svgRect.height / VIEWBOX.height);
  const offsetX = (svgRect.width - VIEWBOX.width * scale) / 2;
  const offsetY = (svgRect.height - VIEWBOX.height * scale) / 2;
  return {
    x: (clientX - svgRect.left - offsetX) / scale,
    y: (clientY - svgRect.top - offsetY) / scale,
  };
};

const CONVERGENCE_ORIGIN_ID = 'systems';
const DOMAIN_LABEL_OFFSET = { dx: 12, dy: 16 };

// Staggered so the four domain nodes don't breathe in mechanical unison —
// a "living system" reads as subtle, not synchronized.
const DOMAIN_BREATHE_DELAY = {
  frontend: '0s', backend: '1.6s', cloud: '3.1s', systems: '4.4s',
};

// Atmospheric-but-meaningful technical layer behind the hero content.
// Four fixed "domain" nodes stand for real engineering categories; a
// measured trace connects them to the actual metric element on the page,
// so the diagram reads as "these produce that number" rather than as
// decoration sitting behind unrelated text.
const HeroBackground = ({ metricAnchorRef }) => {
  const svgRef = useRef(null);
  const [density, setDensity] = useState(() => getDensityForViewport(window.innerWidth));
  const [metricAnchor, setMetricAnchor] = useState(null);

  useEffect(() => {
    const handleResize = () => setDensity(getDensityForViewport(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const graph = useMemo(() => generateGraph({ density }), [density]);

  const convergenceOrigin = graph.nodes.find((node) => node.id === CONVERGENCE_ORIGIN_ID);

  // Measure the real metric element's position and convert it into the
  // graph's own coordinate space, so the convergence trace terminates
  // exactly where the 10M+ figure actually renders, not an approximation.
  useEffect(() => {
    const svg = svgRef.current;
    const metricEl = metricAnchorRef?.current;
    if (!svg || !metricEl || density === 'static') {
      setMetricAnchor(null);
      return undefined;
    }

    const measure = () => {
      const svgRect = svg.getBoundingClientRect();
      const metricRect = metricEl.getBoundingClientRect();
      if (svgRect.width === 0 || svgRect.height === 0) return;
      setMetricAnchor(
        toViewBoxPoint(metricRect.left, metricRect.top + metricRect.height / 2, svgRect),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(metricEl);
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [metricAnchorRef, density, graph]);

  // Cursor-proximity brightening — desktop pointer devices only, and never
  // under reduced motion. Reads pointer position from `window` (not the
  // SVG itself, which stays pointer-events:none) so hero content never
  // has its hover/click behaviour intercepted by this decorative layer.
  // Connected edges brighten along with their nearest node, not just the
  // node itself, so proximity reads as "illuminating a path" rather than
  // lighting up isolated dots.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || density === 'static' || prefersReducedMotion() || !hasFinePointer()) {
      return undefined;
    }

    const nodeElements = new Map(
      graph.nodes.map((node) => [node.id, svg.querySelector(`[data-node-id="${node.id}"]`)]),
    );
    const edgeElements = graph.edges.map((edge) => ({
      edge,
      el: svg.querySelector(`[data-edge-id="${edge.id}"]`),
    }));

    let frameId = null;

    const updateProximity = (clientX, clientY) => {
      const rect = svg.getBoundingClientRect();
      const point = toViewBoxPoint(clientX, clientY, rect);
      const proximityById = new Map();

      graph.nodes.forEach((node) => {
        const distance = Math.hypot(node.x - point.x, node.y - point.y);
        const proximity = Math.max(0, 1 - distance / PROXIMITY.radius);
        proximityById.set(node.id, proximity);
        const el = nodeElements.get(node.id);
        if (el) el.style.setProperty('--proximity', proximity.toFixed(2));
      });

      edgeElements.forEach(({ edge, el }) => {
        if (!el) return;
        // min, not max — a trace should only light up when the cursor is
        // genuinely near *both* its endpoints, not merely touching one
        // hot node on an otherwise-distant edge.
        const proximity = Math.min(
          proximityById.get(edge.fromId) ?? 0,
          proximityById.get(edge.toId) ?? 0,
        );
        el.style.setProperty('--proximity', proximity.toFixed(2));
      });
    };

    const handlePointerMove = (event) => {
      if (frameId !== null) return;
      const { clientX, clientY } = event;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateProximity(clientX, clientY);
      });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      nodeElements.forEach((el) => { if (el) el.style.setProperty('--proximity', 0); });
      edgeElements.forEach(({ el }) => { if (el) el.style.setProperty('--proximity', 0); });
    };
  }, [graph, density]);

  return (
    <motion.svg
      ref={svgRef}
      className={[
        'hero-graph',
        density !== 'full' ? 'hero-graph--compact' : '',
        density === 'static' ? 'hero-graph--static' : '',
      ].filter(Boolean).join(' ')}
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      initial="hidden"
      animate="show"
      variants={fadeIn}
    >
      <defs>
        <filter id="hero-graph-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hero-graph__edges">
        {graph.edges.map((edge, index) => (
          <path
            key={edge.id}
            data-edge-id={edge.id}
            d={edge.d}
            className={`hero-graph__edge ${edge.domain ? 'hero-graph__edge--domain' : ''} ${edge.pulse ? 'hero-graph__edge--pulse' : ''}`}
            style={edge.pulse ? { animationDelay: `${(index % 3) * 1.1}s` } : undefined}
          />
        ))}
        {metricAnchor && convergenceOrigin && density !== 'static' && (
          <motion.path
            className="hero-graph__edge hero-graph__edge--convergence"
            d={elbowPath(convergenceOrigin.x, convergenceOrigin.y, metricAnchor.x, metricAnchor.y, () => 0.5)}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 1.2, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </g>

      <g className="hero-graph__nodes">
        {graph.nodes.map((node) => (
          <g key={node.id}>
            <circle
              data-node-id={node.id}
              cx={node.x}
              cy={node.y}
              r={node.tier === 'domain' ? 3.4 : 2}
              className={`hero-graph__node hero-graph__node--${node.tier}`}
              filter={node.tier === 'domain' ? 'url(#hero-graph-glow)' : undefined}
              style={node.tier === 'domain' ? { animationDelay: DOMAIN_BREATHE_DELAY[node.id] } : undefined}
            />
            {node.tier === 'domain' && (
              <text
                data-node-id={node.id}
                x={node.x + DOMAIN_LABEL_OFFSET.dx}
                y={node.y + DOMAIN_LABEL_OFFSET.dy}
                className="hero-graph__label"
              >
                {node.label}
              </text>
            )}
          </g>
        ))}
      </g>
    </motion.svg>
  );
};

export default HeroBackground;
