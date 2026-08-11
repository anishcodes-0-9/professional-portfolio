import React, {
  useEffect, useRef, useState,
} from 'react';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';

import {
  EASE_OUT, fadeUp, staggerContainer, viewportOnce,
} from '../../wrapper/variants';

import { workHistory } from '../../data/anishData';
import BrandMark from '../../components/shared/BrandMark';
import SectionProgress from './SectionProgress';

import {
  getPinHeightVh,
  progressToVirtualPosition,
  virtualPositionToActiveIndex,
} from './carouselMath';

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

// How much pinned scroll distance one experience-to-experience step gets.
// Mirrors the project carousel's own pinStepVh budget (see carouselMath) —
// enough dwell time to read a full description + bullet list per stage
// without the section running unreasonably long for only 4 entries.
const PIN_STEP_VH = 46;

/* -------------------------------------------------------------------------- */
/* Experience Stepper — persistent nav, always all 4 visible                  */
/* -------------------------------------------------------------------------- */

const ExperienceStepper = ({ activeIndex }) => (
  <nav className="work__stepper" aria-label="Experience stages">
    <ol>
      {workHistory.map((job, index) => (
        <li
          key={`${job.company}-${job.role}`}
          className={`work__stepper-item ${
            index === activeIndex ? 'is-active' : ''
          } ${index < activeIndex ? 'is-past' : ''}`}
        >
          <span className="work__stepper-rail" aria-hidden="true">
            <span className="work__stepper-dot" />

            {index < workHistory.length - 1 && (
              <span className="work__stepper-connector" />
            )}
          </span>

          <span className="work__stepper-label">
            <span className="work__stepper-index mono">
              {String(index + 1).padStart(2, '0')}
            </span>

            <span className="work__stepper-company mono">{job.company}</span>
          </span>
        </li>
      ))}
    </ol>
  </nav>
);

/* -------------------------------------------------------------------------- */
/* Experience Stage — the single dominant, active experience                  */
/* -------------------------------------------------------------------------- */

const ExperienceStage = ({ job, index }) => (
  <AnimatePresence mode="wait" initial={false}>
    <motion.article
      key={`${job.company}-${job.role}`}
      className="work__stage-panel"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
    >
      <div className="work__stage-eyebrow mono">
        <span className="work__stage-eyebrow-index">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="work__stage-eyebrow-sep">/</span>

        Active Experience
      </div>

      <div className="work__stage-brand">
        <span className="work__stage-mark" aria-hidden="true">
          <BrandMark brand={job.logoKey} label={job.company} />
        </span>

        <div className="work__stage-heading">
          <h3 className="work__stage-role">{job.role}</h3>

          <span className="work__stage-company mono">{job.company}</span>
        </div>
      </div>

      <span className="work__stage-period mono">{job.period}</span>

      <p className="work__stage-desc">{job.description}</p>

      {job.bullets?.length > 0 && (
        <ul className="work__stage-bullets">
          {job.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </motion.article>
  </AnimatePresence>
);

/* -------------------------------------------------------------------------- */
/* Pinned Story — desktop/tablet: scroll drives the active stage              */
/* -------------------------------------------------------------------------- */

const ExperienceStoryPinned = () => {
  const count = workHistory.length;

  // One step short of a full lap (see ProjectCarousel in Work.jsx for the
  // same reasoning): ending the scroll mapping at count - 1 rests the
  // sequence on the last experience instead of wrapping back to the first.
  const totalSteps = Math.max(count - 1, 0);

  // The height budget itself still spends a full step per experience
  // (count, not count - 1) so the last stage gets a full step's worth of
  // scroll to hold the stage before the section releases.
  const pinHeightVh = getPinHeightVh(count, 1, { pinStepVh: PIN_STEP_VH });

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

  const job = workHistory[activeIndex];

  return (
    <div
      className="work__pin work__pin--story"
      ref={pinRef}
      style={{
        height: `${pinHeightVh}vh`,
      }}
    >
      <div className="work__stage work__stage--story">
        <div className="work__stage-main work__stage-main--story">
          <span className="work__glow" aria-hidden="true" />

          <div className="work__story-grid">
            <ExperienceStepper activeIndex={activeIndex} />

            <ExperienceStage job={job} index={activeIndex} />
          </div>
        </div>

        <SectionProgress
          count={count}
          totalSteps={totalSteps}
          virtualPosition={virtualPosition}
          activeIndex={activeIndex}
          label="Experience"
        />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Sequence — mobile / reduced-motion: plain 01→04 vertical read              */
/* -------------------------------------------------------------------------- */

const ExperienceSequence = () => (
  <motion.div
    className="work__sequence"
    variants={staggerContainer(0.08)}
    initial="hidden"
    whileInView="show"
    viewport={viewportOnce}
  >
    <ol className="work__sequence-list">
      {workHistory.map((job, index) => (
        <motion.li
          key={`${job.company}-${job.role}`}
          className="work__sequence-item"
          variants={fadeUp}
          transition={{ delay: Math.min(index * 0.06, 0.24) }}
        >
          <div className="work__sequence-rail" aria-hidden="true">
            <span className="work__sequence-dot" />

            {index < workHistory.length - 1 && (
              <span className="work__sequence-connector" />
            )}
          </div>

          <div className="work__sequence-content">
            <div className="work__sequence-head">
              <span className="work__sequence-index mono">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="work__sequence-mark" aria-hidden="true">
                <BrandMark brand={job.logoKey} label={job.company} />
              </span>

              <div className="work__sequence-headcopy">
                <h4 className="work__sequence-role">{job.role}</h4>

                <span className="work__sequence-company mono">{job.company}</span>
              </div>

              <span className="work__sequence-period mono">{job.period}</span>
            </div>

            <p className="work__sequence-desc">{job.description}</p>

            {job.bullets?.length > 0 && (
              <ul className="work__sequence-bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/* Experience Story — picks pinned vs. sequential                             */
/* -------------------------------------------------------------------------- */

const ExperienceStory = () => {
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

  const useSequence = isMobile || reduceMotion;

  return useSequence ? <ExperienceSequence /> : <ExperienceStoryPinned />;
};

export default ExperienceStory;
