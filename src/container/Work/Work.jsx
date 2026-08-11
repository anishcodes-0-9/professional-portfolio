import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';

import { ArrowUpRight } from 'lucide-react';
import { FaAws } from 'react-icons/fa';

import {
  SiGithub,
  SiPython,
  SiSpringboot,
  SiReact,
  SiPostgresql,
  SiJava,
  SiThreedotjs,
  SiWebgl,
  SiTypescript,
  SiJavascript,
  SiCss3,
  SiHtml5,
  SiRedis,
  SiFastapi,
  SiNodedotjs,
  SiSqlite,
  SiGreensock,
} from 'react-icons/si';

import {
  fadeUp,
  clipReveal,
  staggerContainer,
  viewportOnce,
} from '../../wrapper/variants';

import {
  enterpriseProjects,
  personalProjects,
  certifications,
} from '../../data/anishData';

import { buildProjectSegments } from './projectModel';

import {
  wrapIndex,
  getCycleCount,
  getPinHeightVh,
  progressToVirtualPosition,
  virtualPositionToActiveIndex,
  shortestSignedDistance,
  distanceToScale,
  distanceToOpacity,
  distanceToContentOpacity,
  getBufferRadius,
} from './carouselMath';

import BrandMark, { SiHono } from '../../components/shared/BrandMark';
import ExperienceSectionHeader from './ExperienceSectionHeader';
import ProjectSectionHeader from './ProjectSectionHeader';
import ExperienceStory from './ExperienceStory';
import SectionProgress from './SectionProgress';

import './Work.scss';

/* -------------------------------------------------------------------------- */
/* Utilities                                                                  */
/* -------------------------------------------------------------------------- */

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getIsMobile = () => {
  if (typeof window === 'undefined') return false;

  return window.innerWidth <= 640;
};

// Mirrors --plate-slot in Work.scss.
// The carousel needs the resolved pixel value in JavaScript.
const getSlotWidth = () => {
  if (typeof window === 'undefined') return 640;

  return Math.min(860, Math.max(560, window.innerWidth * 0.6));
};

const initials = (title) => {
  const words = title.split(/\s+/).filter(Boolean);

  return `${words[0]?.[0] ?? ''}${words[1]?.[0] ?? ''}`.toUpperCase();
};

/* -------------------------------------------------------------------------- */
/* Technology icons                                                           */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Project Strip                                                              */
/* -------------------------------------------------------------------------- */

const ProjectStrip = ({ projects, label }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

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
      {
        threshold: 0.6,
      },
    );

    itemRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [projects.length]);

  return (
    <div className="work__strip-wrapper">
      {label && <span className="work__strip-label mono">{label}</span>}

      <div className="work__strip">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="work__strip-item"
            data-index={index}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
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

/* -------------------------------------------------------------------------- */
/* Project Carousel                                                           */
/* -------------------------------------------------------------------------- */

const ProjectCarousel = ({ projects, label, variant }) => {
  const count = projects.length;
  // getCycleCount's default budget (minCycles 2, maxCycles 3) is tuned for
  // one carousel spanning the full, combined project list. Work now runs
  // two independent carousels over smaller per-category segments, so that
  // default would replay the same handful of cards multiple times within
  // a single pinned scroll — a single pass (cycles: 1) is what "each
  // project appears exactly once" requires per segment.
  const cycles = getCycleCount(count, { minCycles: 1, maxCycles: 1 });
  // getTotalSteps(count, cycles) === count for a single pass, but
  // shortestSignedDistance/wrapIndex wrap the active project back to index
  // 0 at any exact multiple of `count` — so ending the pass there re-centers
  // the FIRST project instead of resting on the last one (visibly, for the
  // final ~1/count of the scroll). Stopping one step short of that lap ends
  // the pass exactly on the last project. Pin height keeps the full-lap
  // pacing (getPinHeightVh below) so the last project still gets a full
  // step's worth of scroll to hold center stage before the section ends.
  const totalSteps = Math.max(count - 1, 0);
  const pinHeightVh = getPinHeightVh(count, cycles);

  const pinRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  });

  const virtualPosition = useTransform(scrollYProgress, (progress) => progressToVirtualPosition(progress, totalSteps));

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(virtualPosition, 'change', (value) => {
    const next = virtualPositionToActiveIndex(value, count);

    setActiveIndex((previous) => (previous === next ? previous : next));
  });

  return (
    <div
      className={`work__pin ${variant ? `work__pin--${variant}` : ''}`}
      ref={pinRef}
      style={{
        height: `${pinHeightVh}vh`,
      }}
    >
      <div className="work__stage">
        <div className="work__stage-main">
          <span className="work__glow" aria-hidden="true" />

          <span className="work__rail" aria-hidden="true" />

          <ProjectTrack
            projects={projects}
            virtualPosition={virtualPosition}
            activeIndex={activeIndex}
          />
        </div>

        <SectionProgress
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

/* -------------------------------------------------------------------------- */
/* Project Track                                                              */
/* -------------------------------------------------------------------------- */

const ProjectTrack = ({ projects, virtualPosition, activeIndex }) => {
  const count = projects.length;
  const bufferRadius = getBufferRadius();

  const [slotWidth, setSlotWidth] = useState(getSlotWidth);

  useEffect(() => {
    const handleResize = () => {
      setSlotWidth(getSlotWidth());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const windowIndices = useMemo(() => {
    const offsets = Array.from(
      {
        length: bufferRadius * 2 + 1,
      },
      (_, index) => index - bufferRadius,
    );

    return [
      ...new Set(
        offsets.map((offset) => wrapIndex(activeIndex + offset, count)),
      ),
    ];
  }, [activeIndex, count, bufferRadius]);

  return (
    <div
      className="work__track"
      style={{
        width: `${slotWidth}px`,
      }}
    >
      {windowIndices.map((index) => (
        <ProjectSlot
          key={projects[index].id}
          project={projects[index]}
          count={count}
          virtualPosition={virtualPosition}
          isDominant={index === activeIndex}
          slotWidth={slotWidth}
        />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Project Slot                                                               */
/* -------------------------------------------------------------------------- */

const ProjectSlot = ({
  project,
  count,
  virtualPosition,
  isDominant,
  slotWidth,
}) => {
  const plateRef = useRef(null);

  const distance = useTransform(virtualPosition, (value) => shortestSignedDistance(project.index, value, count));

  const x = useTransform(distance, (value) => value * slotWidth);

  const scale = useTransform(distance, (value) => distanceToScale(value));

  const opacity = useTransform(distance, (value) => distanceToOpacity(value));

  const contentOpacity = useTransform(distance, (value) => distanceToContentOpacity(value));

  useEffect(() => {
    plateRef.current?.classList.toggle('is-live', isDominant);
  }, [isDominant]);

  return (
    <motion.div
      ref={plateRef}
      className={`work__slot ${isDominant ? 'is-dominant' : ''}`}
      style={{
        x,
        scale,
        opacity,
      }}
    >
      <ProjectPlate
        project={project}
        count={count}
        contentOpacity={contentOpacity}
      />
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Project Plate                                                              */
/* -------------------------------------------------------------------------- */

const ProjectPlate = ({ project, count, contentOpacity = 1 }) => {
  const isMirrored = project.index % 2 === 1;

  return (
    <article
      className={`plate plate--${project.type} ${
        isMirrored ? 'plate--b' : 'plate--a'
      }`}
    >
      <ProjectVisual project={project} />

      <motion.div
        className="plate__body"
        style={{
          opacity: contentOpacity,
        }}
      >
        <h3 className="plate__title">
          <span className="work__sr-only">
            {`Project ${project.index + 1} of ${count} — `}
          </span>

          {project.title}

          {project.context && (
            <span className="plate__context">{` — ${project.context}`}</span>
          )}
        </h3>

        <p className="plate__desc">{project.description}</p>

        <ProjectMeta project={project} />
      </motion.div>

      <motion.div
        className="plate__foot"
        style={{
          opacity: contentOpacity,
        }}
      >
        <ProjectCTA project={project} />
      </motion.div>

      <span className="plate__tick plate__tick--tl" aria-hidden="true" />

      <span className="plate__tick plate__tick--tr" aria-hidden="true" />

      <span className="plate__tick plate__tick--bl" aria-hidden="true" />

      <span className="plate__tick plate__tick--br" aria-hidden="true" />
    </article>
  );
};

/* -------------------------------------------------------------------------- */
/* Project Visual                                                             */
/* -------------------------------------------------------------------------- */

const ProjectVisual = ({ project }) => {
  const nodeCount = Math.min(project.tags.length, 5);

  const nodes = project.tags.slice(0, nodeCount);

  const indexLabel = `0${project.index + 1}`;

  /*
   * A real screenshot/diagram always wins
   * over the generated schematic.
   */
  if (project.image) {
    return (
      <div className="plate__visual plate__visual--image">
        <span className="plate__ghost-index mono" aria-hidden="true">
          {indexLabel}
        </span>

        <img
          className="plate__image"
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
        />
      </div>
    );
  }

  if (project.logoKey) {
    return (
      <div className="plate__visual plate__visual--star">
        <span className="plate__ghost-index mono" aria-hidden="true">
          {indexLabel}
        </span>

        <svg
          className="plate__schematic"
          viewBox="0 0 240 240"
          aria-hidden="true"
        >
          {nodes.map((tag, index) => {
            const angle = (-70 + (140 / Math.max(nodeCount - 1, 1)) * index)
              * (Math.PI / 180);

            const x = 120 + Math.cos(angle) * 100;

            const y = 120 + Math.sin(angle) * 100;

            return (
              <g
                key={tag}
                className="plate__node"
                style={{
                  transitionDelay: `${index * 60}ms`,
                }}
              >
                <line
                  x1={120}
                  y1={120}
                  x2={x}
                  y2={y}
                  className="plate__trace"
                  pathLength={1}
                />

                <circle cx={x} cy={y} r={3} className="plate__node-dot" />

                <text
                  x={x}
                  y={y - 8}
                  className="plate__node-label mono"
                  textAnchor="middle"
                >
                  {tag}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="plate__mark-group">
          <div className="plate__mark">
            <BrandMark brand={project.logoKey} label={project.title} />
          </div>

          {project.brandLabel && (
            <span className="plate__brand-label mono">
              {project.brandLabel}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="plate__visual plate__visual--orbit">
      <span className="plate__ghost-index mono" aria-hidden="true">
        {indexLabel}
      </span>

      <svg
        className="plate__schematic"
        viewBox="0 0 240 240"
        aria-hidden="true"
      >
        <circle
          cx={120}
          cy={120}
          r={92}
          className="plate__orbit-path"
          pathLength={1}
        />

        {nodes.map((tag, index) => {
          const angle = (index / Math.max(nodeCount, 1)) * 2 * Math.PI - Math.PI / 2;

          const x = 120 + Math.cos(angle) * 92;

          const y = 120 + Math.sin(angle) * 92;

          return (
            <g
              key={tag}
              className="plate__node"
              style={{
                transitionDelay: `${index * 60}ms`,
              }}
            >
              <circle cx={x} cy={y} r={3} className="plate__node-dot" />

              <text
                x={x}
                y={y - 8}
                className="plate__node-label mono"
                textAnchor="middle"
              >
                {tag}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="plate__monogram" aria-hidden="true">
        <span className="plate__monogram-outline">
          {initials(project.title)}
        </span>

        <span className="plate__monogram-fill">{initials(project.title)}</span>
      </div>

      {project.links?.github && (
        <span className="plate__linked" aria-hidden="true">
          <SiGithub size={12} />
        </span>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Project Meta                                                               */
/* -------------------------------------------------------------------------- */

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
            {TagIcon && (
              <TagIcon className="plate__tag-icon" aria-hidden="true" />
            )}

            {tag}
          </span>
        );
      })}
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Project CTA                                                                */
/* -------------------------------------------------------------------------- */

const ProjectCTA = ({ project }) => {
  if (project.confidential) {
    return (
      <span className="plate__cta plate__cta--static mono">
        Case File — Confidential Engagement
      </span>
    );
  }

  const { github, live } = project.links || {};

  if (!github && !live) {
    return null;
  }

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

/* -------------------------------------------------------------------------- */
/* Engineering Record                                                         */
/* -------------------------------------------------------------------------- */

const EngineeringRecord = () => (
  <div className="work__record work__certs-only">
    <motion.div
      className="work__certs"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <span className="work__certs-label mono">Certifications</span>

      <div className="work__certs-row">
        {certifications.map((cert) => (
          <a
            key={cert.name}
            href={cert.viewUrl}
            target="_blank"
            rel="noreferrer"
            className="work__cert"
            style={{
              '--cert-accent': cert.color,
            }}
          >
            <span className="work__cert-mark" aria-hidden="true">
              <BrandMark brand={cert.logoKey} label={cert.name} />
            </span>

            <span className="work__cert-name">{cert.name}</span>
          </a>
        ))}
      </div>
    </motion.div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Main Work Component                                                        */
/* -------------------------------------------------------------------------- */

const Work = () => {
  const { professional, personal } = useMemo(
    () => buildProjectSegments(enterpriseProjects, personalProjects),
    [],
  );

  const [reduceMotion] = useState(prefersReducedMotion);

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const useNativeStrip = isMobile || reduceMotion;

  return (
    <div className="work__sheet">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        className="work__header"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.span className="section-eyebrow" variants={fadeUp}>
          Work
        </motion.span>

        <motion.h2 className="work__heading" variants={clipReveal}>
          Selected <span>Systems</span>
        </motion.h2>

        <motion.p className="work__subtitle" variants={fadeUp}>
          {`An exhibition of production systems and independent builds — ${
            professional.length + personal.length
          } in total.`}
        </motion.p>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* 01 / Professional Experience                                      */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        className="work__section work__experience-section"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <ExperienceSectionHeader />
        <ExperienceStory />
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* 02 / Selected Professional Projects                               */}
      {/* ------------------------------------------------------------------ */}

      {professional.length > 0 && (
        <motion.div
          className="work__section work__professional-projects-section"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <ProjectSectionHeader
            sectionNumber={2}
            sectionTitle="SELECTED PROFESSIONAL PROJECTS"
            sectionSubtitle="Systems I've worked on professionally"
          />

          {useNativeStrip ? (
            <ProjectStrip
              projects={professional}
              label="Professional Projects"
            />
          ) : (
            <ProjectCarousel
              projects={professional}
              label="Professional"
              variant="professional"
            />
          )}
        </motion.div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 03 / Personal Projects                                             */}
      {/* ------------------------------------------------------------------ */}

      {personal.length > 0 && (
        <motion.div
          className="work__section work__personal-projects-section"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <ProjectSectionHeader
            sectionNumber={3}
            sectionTitle="PERSONAL PROJECTS"
            sectionSubtitle="Independent builds"
          />

          {useNativeStrip ? (
            <ProjectStrip projects={personal} label="Personal Projects" />
          ) : (
            <ProjectCarousel
              projects={personal}
              label="Personal"
              variant="personal"
            />
          )}
        </motion.div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Certifications                                                     */}
      {/* ------------------------------------------------------------------ */}

      <EngineeringRecord />
    </div>
  );
};

export default Work;
