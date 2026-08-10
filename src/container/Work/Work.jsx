import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import {
  motion, useScroll, useTransform, useMotionValueEvent,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaAws } from 'react-icons/fa';
import {
  SiCognizant, SiGithub, SiMacys, SiPython, SiSpringboot, SiReact, SiPostgresql,
  SiJava, SiThreedotjs, SiWebgl, SiTypescript, SiJavascript, SiCss3, SiHtml5,
  SiRedis, SiFastapi, SiNodedotjs, SiSqlite, SiGreensock,
} from 'react-icons/si';
import { AppWrap, MotionWrap } from '../../wrapper';
import {
  fadeUp, clipReveal, staggerContainer, viewportOnce,
} from '../../wrapper/variants';
import {
  workHistory, enterpriseProjects, personalProjects, certifications,
} from '../../data/anishData';
import { buildProjectSegments } from './projectModel';
import {
  wrapIndex,
  getCycleCount,
  getTotalSteps,
  getPinHeightVh,
  progressToVirtualPosition,
  virtualPositionToActiveIndex,
  shortestSignedDistance,
  distanceToScale,
  distanceToOpacity,
  distanceToContentOpacity,
  getBufferRadius,
} from './carouselMath';
import './Work.scss';

const prefersReducedMotion = () => (
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

const getIsMobile = () => (
  typeof window !== 'undefined' && window.innerWidth <= 640
);

// Mirrors --plate-slot in Work.scss — kept in sync manually since the
// carousel needs the resolved pixel value in JS, not the CSS string.
const getSlotWidth = () => {
  if (typeof window === 'undefined') return 640;
  return Math.min(860, Math.max(560, window.innerWidth * 0.6));
};

// Real Claude mark path data (Simple Icons, CC0) — split across lines
// purely to satisfy the lint line-length rule; it's one path.
const CLAUDE_MARK_PATH = [
  'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2',
  '646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972',
  ' 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.',
  '4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.36',
  '43.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.25',
  '5-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3',
  '.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.',
  '9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.24',
  '29.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3',
  '478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.83',
  '18.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618',
  '.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.32',
  '79h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.65',
  '75-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-',
  '.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4',
  '614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328',
  ' 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-',
  '1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9',
  '064-1.3114Z',
].join('');

// Real Hono mark path data (Simple Icons, CC0) — used as a tag icon since
// this version of react-icons doesn't export it yet.
const HONO_MARK_PATH = [
  'M12.445.002a45.529 45.529 0 0 0-5.252 8.146 8.595 8.595 0 0 1-.555-.53 27.796 27.796 0 0 0-1.205-1.5',
  '42 8.762 8.762 0 0 0-1.251 2.12 20.743 20.743 0 0 0-1.448 5.88 8.867 8.867 0 0 0 .338 3.468c1.312 3.',
  '48 3.794 5.593 7.445 6.337 3.055.438 5.755-.333 8.097-2.312 2.677-2.59 3.359-5.634 2.047-9.132a33.28',
  '7 33.287 0 0 0-2.988-5.59A91.34 91.34 0 0 0 12.615.053a.216.216 0 0 0-.17-.051Zm-.336 3.906a50.93 50',
  '.93 0 0 1 4.794 6.552c.448.767.817 1.57 1.108 2.41.606 2.386-.044 4.354-1.951 5.904-1.845 1.298-3.87',
  ' 1.683-6.072 1.156-2.376-.737-3.75-2.335-4.121-4.794a5.107 5.107 0 0 1 .242-2.266c.358-.908.79-1.774',
  ' 1.3-2.601l1.446-2.121a397.33 397.33 0 0 0 3.254-4.24Z',
].join('');

const SiHono = ({ className, 'aria-hidden': ariaHidden }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d={HONO_MARK_PATH} />
  </svg>
);

// ── Brand identity marks — real SVGs per company. Reused unchanged from
// the previous Work implementation for both the enterprise project
// centerpieces and the Engineering Record below. ──────────────
const BrandMark = ({ brand, label }) => {
  const marks = {
    alignerr: (
      <div className="brand-mark brand-mark--alignerr" aria-label={label} title={label}>
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M24 7.5 36.5 29H28l-4-6.9-4 6.9h-8.5L24 7.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M19.7 29h8.6L24 36.4 19.7 29Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M24 7.5h8.7L19.6 29h-8.1L24 7.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    // Real Claude mark (Simple Icons, CC0) — the previous version drew a
    // generic six-dot "AI atom" glyph that didn't read as any specific
    // product. This is the actual Anthropic/Claude asterisk.
    claude: (
      <div className="brand-mark brand-mark--claude" aria-label={label} title={label}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor">
          <path d={CLAUDE_MARK_PATH} />
        </svg>
      </div>
    ),
    cognizant: (
      <div className="brand-mark brand-mark--cognizant" aria-label={label} title={label}>
        <SiCognizant />
      </div>
    ),
    debut: (
      <div className="brand-mark brand-mark--debut" aria-label={label} title={label}>
        <span className="brand-mark__initials">DI</span>
      </div>
    ),
    // DIRECTV's own media-assets page restricts usage to press/media outlets,
    // so the graphic mark isn't licensed for a personal portfolio. This
    // renders the real product name as a styled wordmark instead of a copied
    // logo — still unmistakable, without reproducing a trademarked asset.
    directv: (
      <div className="brand-mark brand-mark--wordmark" aria-label={label} title={label}>
        <span className="brand-mark__wordmark">DIRECTV</span>
      </div>
    ),
    // Same reasoning as DIRECTV: LexisNexis's mark is trademarked and its
    // brand-guidelines page is login-gated to authorized partners/press,
    // not freely licensed — so this is the real name as styled text, not
    // a copied logo.
    lexisnexis: (
      <div className="brand-mark brand-mark--wordmark" aria-label={label} title={label}>
        <span className="brand-mark__wordmark">LexisNexis</span>
      </div>
    ),
    payments: (
      <div className="brand-mark brand-mark--payments" aria-label={label} title={label}>
        <span className="brand-mark__card" />
      </div>
    ),
    macys: (
      <div className="brand-mark brand-mark--macys" aria-label={label} title={label}>
        <SiMacys />
      </div>
    ),
    aws: (
      <div className="brand-mark brand-mark--aws" aria-label={label} title={label}>
        <FaAws />
      </div>
    ),
    github: (
      <div className="brand-mark brand-mark--github" aria-label={label} title={label}>
        <SiGithub />
      </div>
    ),
  };

  return marks[brand] ?? <span>{label?.slice(0, 1)}</span>;
};

// First letter of the first two significant words — a deterministic,
// data-derived monogram for projects with no brand identity of their own.
const initials = (title) => {
  const words = title.split(/\s+/).filter(Boolean);
  return `${words[0]?.[0] ?? ''}${words[1]?.[0] ?? ''}`.toUpperCase();
};

// ── Project visual centerpiece ─────────────────────────────────────────
// Same system, different data: enterprise projects have a real brand
// identity to radiate a schematic FROM (a "star"); personal projects have
// no external brand, so tags orbit the project's own monogram instead (an
// "orbit"). Node count and labels are always real tag data — never an
// invented architecture claim.
// Which schematic a project gets is driven by whether it has a real brand
// mark to radiate from — not by its category label. A future project in
// either array picks the right treatment automatically the moment it does
// (or doesn't) supply a logoKey.
const ProjectVisual = ({ project }) => {
  const nodeCount = Math.min(project.tags.length, 5);
  const nodes = project.tags.slice(0, nodeCount);
  const indexLabel = `0${project.index + 1}`;

  // A real screenshot/diagram, when a project supplies one, always wins
  // over the generated schematic — framed the same way so the exhibition
  // stays visually consistent whether or not a given plate has one.
  if (project.image) {
    return (
      <div className="plate__visual plate__visual--image">
        <span className="plate__ghost-index mono" aria-hidden="true">{indexLabel}</span>
        <img className="plate__image" src={project.image} alt={`${project.title} preview`} loading="lazy" />
      </div>
    );
  }

  if (project.logoKey) {
    return (
      <div className="plate__visual plate__visual--star">
        <span className="plate__ghost-index mono" aria-hidden="true">{indexLabel}</span>
        <svg className="plate__schematic" viewBox="0 0 240 240" aria-hidden="true">
          {nodes.map((tag, i) => {
            const angle = ((-70 + (140 / Math.max(nodeCount - 1, 1)) * i) * Math.PI) / 180;
            const x = 120 + Math.cos(angle) * 100;
            const y = 120 + Math.sin(angle) * 100;
            return (
              <g key={tag} className="plate__node" style={{ transitionDelay: `${i * 60}ms` }}>
                <line x1={120} y1={120} x2={x} y2={y} className="plate__trace" pathLength={1} />
                <circle cx={x} cy={y} r={3} className="plate__node-dot" />
                <text x={x} y={y - 8} className="plate__node-label mono" textAnchor="middle">{tag}</text>
              </g>
            );
          })}
        </svg>
        <div className="plate__mark-group">
          <div className="plate__mark">
            <BrandMark brand={project.logoKey} label={project.title} />
          </div>
          {project.brandLabel && (
            <span className="plate__brand-label mono">{project.brandLabel}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="plate__visual plate__visual--orbit">
      <span className="plate__ghost-index mono" aria-hidden="true">{indexLabel}</span>
      <svg className="plate__schematic" viewBox="0 0 240 240" aria-hidden="true">
        <circle cx={120} cy={120} r={92} className="plate__orbit-path" pathLength={1} />
        {nodes.map((tag, i) => {
          const angle = (i / Math.max(nodeCount, 1)) * 2 * Math.PI - Math.PI / 2;
          const x = 120 + Math.cos(angle) * 92;
          const y = 120 + Math.sin(angle) * 92;
          return (
            <g key={tag} className="plate__node" style={{ transitionDelay: `${i * 60}ms` }}>
              <circle cx={x} cy={y} r={3} className="plate__node-dot" />
              <text x={x} y={y - 8} className="plate__node-label mono" textAnchor="middle">{tag}</text>
            </g>
          );
        })}
      </svg>
      <div className="plate__monogram" aria-hidden="true">
        <span className="plate__monogram-outline">{initials(project.title)}</span>
        <span className="plate__monogram-fill">{initials(project.title)}</span>
      </div>
      {project.links.github && (
        <span className="plate__linked" aria-hidden="true"><SiGithub size={12} /></span>
      )}
    </div>
  );
};

// Only tags that map to a single, unambiguous, recognizable real product
// get an icon (Simple Icons, already a bundled dependency — no hotlinking,
// no runtime fetch). Concepts/methodologies (AI Evaluation, DevOps, LLM,
// REST APIs, POS, RAG...) have no one "logo" to show, so they stay
// text-only rather than getting an invented approximation.
const TAG_ICON_MAP = {
  python: SiPython,
  'spring boot': SiSpringboot,
  react: SiReact,
  aws: FaAws,
  postgresql: SiPostgresql,
  java: SiJava,
  'three.js': SiThreedotjs,
  webgl: SiWebgl,
  typescript: SiTypescript,
  javascript: SiJavascript,
  css: SiCss3,
  html: SiHtml5,
  'github api': SiGithub,
  redis: SiRedis,
  fastapi: SiFastapi,
  'node.js': SiNodedotjs,
  sqlite: SiSqlite,
  gsap: SiGreensock,
  hono: SiHono,
};

const ProjectMeta = ({ project }) => (
  <div className="plate__meta">
    {project.period && (
      <div className="plate__meta-field">
        <span className="plate__meta-label mono">Period</span>
        <span className="plate__meta-value">{project.period}</span>
      </div>
    )}
    <div className="plate__meta-field">
      <span className="plate__meta-label mono">Status</span>
      <span className="plate__meta-value">{project.status}</span>
    </div>
    <div className="plate__tags">
      {project.tags.map((tag) => {
        const TagIcon = TAG_ICON_MAP[tag.toLowerCase()];
        return (
          <span key={tag} className="plate__tag mono">
            {TagIcon && <TagIcon className="plate__tag-icon" aria-hidden="true" />}
            {tag}
          </span>
        );
      })}
    </div>
  </div>
);

// Confidential work has no public link — a plain, non-interactive status
// resolves it instead of a fake CTA. Anything else links to whatever real
// URLs it actually has (github, live, or both) — driven entirely by data,
// never by category, so a future project just needs the right fields set.
const ProjectCTA = ({ project }) => {
  if (project.confidential) {
    return (
      <span className="plate__cta plate__cta--static mono">
        Case File — Confidential Engagement
      </span>
    );
  }

  const { github, live } = project.links;

  if (!github && !live) return null;

  return (
    <div className="plate__cta-group">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="plate__cta mono"
          aria-label={`View live — ${project.title}`}
        >
          View Live
          <ArrowUpRight size={13} strokeWidth={2.25} />
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="plate__cta mono"
          aria-label={`View source on GitHub — ${project.title}`}
        >
          View GitHub
          <SiGithub size={12} />
        </a>
      )}
    </div>
  );
};

// contentOpacity defaults to 1 for the native strip (mobile/reduced-motion),
// which renders every plate at full strength with no scroll-linked fade.
const ProjectPlate = ({ project, count, contentOpacity = 1 }) => {
  const isMirrored = project.index % 2 === 1;

  return (
    <article className={`plate plate--${project.type} ${isMirrored ? 'plate--b' : 'plate--a'}`}>
      <ProjectVisual project={project} />

      <motion.div className="plate__body" style={{ opacity: contentOpacity }}>
        <h3 className="plate__title">
          <span className="work__sr-only">{`Project ${project.index + 1} of ${count} — `}</span>
          {project.title}
          {project.context && <span className="plate__context">{` — ${project.context}`}</span>}
        </h3>
        <p className="plate__desc">{project.description}</p>
        <ProjectMeta project={project} />
      </motion.div>

      <motion.div className="plate__foot" style={{ opacity: contentOpacity }}>
        <ProjectCTA project={project} />
      </motion.div>

      <span className="plate__tick plate__tick--tl" aria-hidden="true" />
      <span className="plate__tick plate__tick--tr" aria-hidden="true" />
      <span className="plate__tick plate__tick--bl" aria-hidden="true" />
      <span className="plate__tick plate__tick--br" aria-hidden="true" />
    </article>
  );
};

// One mounted slot in the pinned exhibition. Position/scale/opacity are
// all continuous derivatives of the single shared virtualPosition value —
// this project's own fixed index is the only other input, so there's no
// stale-closure risk as the active window shifts around it.
const ProjectSlot = ({
  project, count, virtualPosition, isDominant, slotWidth,
}) => {
  const plateRef = useRef(null);
  const distance = useTransform(virtualPosition, (v) => (
    shortestSignedDistance(project.index, v, count)
  ));
  const x = useTransform(distance, (d) => d * slotWidth);
  const scale = useTransform(distance, (d) => distanceToScale(d));
  const opacity = useTransform(distance, (d) => distanceToOpacity(d));
  const contentOpacity = useTransform(distance, (d) => distanceToContentOpacity(d));

  useEffect(() => {
    plateRef.current?.classList.toggle('is-live', isDominant);
  }, [isDominant]);

  return (
    <motion.div
      ref={plateRef}
      className={`work__slot ${isDominant ? 'is-dominant' : ''}`}
      style={{ x, scale, opacity }}
    >
      <ProjectPlate project={project} count={count} contentOpacity={contentOpacity} />
    </motion.div>
  );
};

// Virtualized sliding window: mounts at most 2*bufferRadius+1 plates
// regardless of total project count, keyed by real project id so React
// keeps DOM nodes stable as the window re-centers around a new active
// index. Duplicate wrapped indices (possible when the window is larger
// than the project count) are collapsed so small data sets never render
// the same project twice.
const ProjectTrack = ({ projects, virtualPosition, activeIndex }) => {
  const count = projects.length;
  const bufferRadius = getBufferRadius();
  const [slotWidth, setSlotWidth] = useState(getSlotWidth);

  useEffect(() => {
    const handleResize = () => setSlotWidth(getSlotWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const windowIndices = useMemo(() => {
    const offsets = Array.from({ length: bufferRadius * 2 + 1 }, (_, i) => i - bufferRadius);
    return [...new Set(offsets.map((k) => wrapIndex(activeIndex + k, count)))];
  }, [activeIndex, count, bufferRadius]);

  return (
    <div className="work__track" style={{ width: `${slotWidth}px` }}>
      {windowIndices.map((idx) => (
        <ProjectSlot
          key={projects[idx].id}
          project={projects[idx]}
          count={count}
          virtualPosition={virtualPosition}
          isDominant={idx === activeIndex}
          slotWidth={slotWidth}
        />
      ))}
    </div>
  );
};

const ProjectProgress = ({
  count, totalSteps, virtualPosition, activeIndex, label,
}) => {
  const fillScale = useTransform(virtualPosition, (v) => Math.min(1, Math.max(0, v / totalSteps)));
  const tickSize = `${100 / count}% 100%`;

  return (
    <div className="work__progress" aria-hidden="true">
      {label && <span className="work__progress-label mono">{label}</span>}
      <div className="work__progress-index mono">
        <span className="work__progress-current">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="work__progress-sep">/</span>
        <span className="work__progress-total">{String(count).padStart(2, '0')}</span>
      </div>
      <div className="work__progress-track" style={{ backgroundSize: tickSize }}>
        <motion.div
          className="work__progress-fill"
          style={{ scaleX: fillScale, backgroundSize: tickSize }}
        />
      </div>
      <div className="work__progress-signal">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className={`work__progress-dot ${i === activeIndex ? 'is-active' : ''}`} />
        ))}
      </div>
    </div>
  );
};

// Desktop/tablet pinned scroll-jacked exhibition. Vertical scroll over the
// pin region drives virtualPosition; everything else (position, scale,
// opacity, the progress bar) is a derivative of that single value.
const ProjectCarousel = ({ projects, label, variant }) => {
  const count = projects.length;
  const cycles = getCycleCount(count);
  const totalSteps = getTotalSteps(count, cycles);
  const pinHeightVh = getPinHeightVh(count, cycles);

  const pinRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  });
  const virtualPosition = useTransform(scrollYProgress, (p) => (
    progressToVirtualPosition(p, totalSteps)
  ));

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(virtualPosition, 'change', (v) => {
    const next = virtualPositionToActiveIndex(v, count);
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  return (
    <div
      className={`work__pin ${variant ? `work__pin--${variant}` : ''}`}
      ref={pinRef}
      style={{ height: `${pinHeightVh}vh` }}
    >
      <div className="work__stage">
        <div className="work__stage-main">
          <span className="work__glow" aria-hidden="true" />
          <span className="work__rail" aria-hidden="true" />
          <ProjectTrack projects={projects} virtualPosition={virtualPosition} activeIndex={activeIndex} />
        </div>
        <ProjectProgress
          count={count}
          totalSteps={totalSteps}
          virtualPosition={virtualPosition}
          activeIndex={activeIndex}
          label={label}
        />
      </div>
    </div>
  );
};

// Shared fallback for mobile AND desktop reduced-motion: a native,
// touch/wheel-scrolled horizontal strip with scroll-snap. No scroll-linked
// transforms, no virtualization — all real projects render in DOM order.
const ProjectStrip = ({ projects, label }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const idx = Number(visible.target.dataset.index);
          setActiveIndex(idx);
          visible.target.classList.add('is-live');
        }
      },
      { threshold: 0.6 },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [projects.length]);

  return (
    <div className="work__strip-wrapper">
      {label && <span className="work__strip-label mono">{label}</span>}
      <div className="work__strip">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="work__strip-item"
            data-index={i}
            ref={(el) => { itemRefs.current[i] = el; }}
          >
            <ProjectPlate project={project} count={projects.length} />
          </div>
        ))}
      </div>
      <div className="work__strip-index mono" aria-hidden="true">
        {String(activeIndex + 1).padStart(2, '0')}
        <span className="work__strip-sep">/</span>
        {String(projects.length).padStart(2, '0')}
      </div>
    </div>
  );
};

// The deliberate structural beat between the professional and personal
// exhibitions. Not another pinned carousel — a short, real-height block
// revealed once via the same fadeUp/clipReveal vocabulary as the rest of
// Work, so there's no dead scroll region and no scroll-jacking here.
const SegmentDivider = () => (
  <motion.div
    className="work__divider"
    variants={staggerContainer(0.1)}
    initial="hidden"
    whileInView="show"
    viewport={viewportOnce}
  >
    <motion.div className="work__divider-row work__divider-row--from" variants={fadeUp}>
      <span className="work__divider-tag mono">Professional Systems — Complete</span>
      <span className="work__divider-line" aria-hidden="true" />
    </motion.div>

    <motion.span className="work__divider-mark" variants={fadeUp} aria-hidden="true" />

    <motion.div className="work__divider-row work__divider-row--to" variants={fadeUp}>
      <span className="work__divider-eyebrow mono">Private Build Surface</span>
      <h3 className="work__divider-heading">
        Personal <span>Projects</span>
      </h3>
      <p className="work__divider-subtitle">
        Independently designed, built, and shipped — inspectable in full.
      </p>
    </motion.div>
  </motion.div>
);

const EngineeringRecord = () => (
  <motion.div
    className="work__record"
    variants={staggerContainer(0.1)}
    initial="hidden"
    whileInView="show"
    viewport={viewportOnce}
  >
    <motion.span className="work__record-eyebrow mono" variants={fadeUp}>
      Engineering Record
    </motion.span>

    <motion.ul className="work__ledger" variants={staggerContainer(0.06)}>
      {workHistory.map((job) => (
        <motion.li key={`${job.company}-${job.role}`} className="work__ledger-row" variants={fadeUp}>
          <span className="work__ledger-mark" aria-hidden="true">
            <BrandMark brand={job.logoKey} label={job.company} />
          </span>
          <div className="work__ledger-copy">
            <h4 className="work__ledger-role">{job.role}</h4>
            <span className="work__ledger-company mono">{job.company}</span>
            <p className="work__ledger-desc">{job.description}</p>
          </div>
          <span className="work__ledger-period mono">{job.period}</span>
        </motion.li>
      ))}
    </motion.ul>

    <motion.div className="work__certs" variants={fadeUp}>
      <span className="work__certs-label mono">Certifications</span>
      <div className="work__certs-row">
        {certifications.map((cert) => (
          <a
            key={cert.name}
            href={cert.viewUrl}
            target="_blank"
            rel="noreferrer"
            className="work__cert"
            style={{ '--cert-accent': cert.color }}
          >
            <span className="work__cert-mark" aria-hidden="true">
              <BrandMark brand={cert.logoKey} label={cert.name} />
            </span>
            <span className="work__cert-name">{cert.name}</span>
          </a>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const Work = () => {
  const { professional, personal } = useMemo(
    () => buildProjectSegments(enterpriseProjects, personalProjects),
    [],
  );

  const [reduceMotion] = useState(prefersReducedMotion);
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const handleResize = () => setIsMobile(getIsMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const useNativeStrip = isMobile || reduceMotion;
  const totalCount = professional.length + personal.length;

  return (
    <div className="work__sheet">
      <motion.div
        className="work__header"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.span className="section-eyebrow" variants={fadeUp}>Work</motion.span>
        <motion.h2 className="work__heading" variants={clipReveal}>
          Selected <span>Systems</span>
        </motion.h2>
        <motion.p className="work__subtitle" variants={fadeUp}>
          {`An exhibition of production systems and independent builds — ${totalCount} in total.`}
        </motion.p>
      </motion.div>

      {professional.length > 0 && (
        useNativeStrip
          ? <ProjectStrip projects={professional} label="Professional Systems" />
          : <ProjectCarousel projects={professional} label="Professional" variant="professional" />
      )}

      {professional.length > 0 && personal.length > 0 && <SegmentDivider />}

      {personal.length > 0 && (
        useNativeStrip
          ? <ProjectStrip projects={personal} label="Personal Projects" />
          : <ProjectCarousel projects={personal} label="Personal" variant="personal" />
      )}

      <EngineeringRecord />
    </div>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);
