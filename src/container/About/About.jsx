import React, {
  useEffect, useRef, useState,
} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AppWrap, MotionWrap } from '../../wrapper';
import {
  EASE_OUT, fadeUp, fadeIn, clipReveal, staggerContainer, viewportOnce,
} from '../../wrapper/variants';
import { personalInfo, aboutCards, workHistory } from '../../data/anishData';
import './About.scss';

const currentRole = workHistory[0];

// Curated subset of real technology terms, lifted verbatim from each
// card's own description in anishData.js — a display-level distillation,
// not new data. Cards without a curated entry simply render no readout.
const MANIFEST_DETAILS = {
  'Systems & Backend': ['Java', 'Spring Boot', 'Node.js', 'REST APIs'],
  'Frontend Delivery': ['React', 'Next.js', 'Vue.js', 'Three.js', 'Tailwind'],
  'Cloud & Observability': ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Dynatrace'],
  'AI & ML Tooling': ['Python', 'Hugging Face', 'Claude', 'GitHub Copilot', 'n8n'],
};

const prefersReducedMotion = () => (
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

// Full range on desktop, reduced on tablet, off on mobile — and always
// off under reduced motion, matching HeroBackground's own gating pattern
// for its JS-driven (non-CSS) motion.
const getGhostRange = () => {
  if (typeof window === 'undefined' || prefersReducedMotion()) return 0;
  if (window.innerWidth <= 640) return 0;
  if (window.innerWidth <= 1024) return 6;
  return 14;
};

// A one-off, local sweep — not part of the shared variants system —
// scoped to this single decorative element.
const scanSweep = {
  hidden: { top: '0%', opacity: 0 },
  show: {
    top: ['0%', '0%', '100%', '100%'],
    opacity: [0, 0.5, 0.5, 0],
    transition: { duration: 0.9, ease: EASE_OUT, times: [0, 0.05, 0.85, 1] },
  },
};

const ManifestRow = ({ card, index }) => {
  const rowRef = useRef(null);
  const detail = MANIFEST_DETAILS[card.title];

  return (
    <motion.li
      ref={rowRef}
      className="about__manifest-row"
      variants={fadeUp}
      viewport={viewportOnce}
      onViewportEnter={() => rowRef.current?.classList.add('is-live')}
    >
      <span className="about__manifest-bar" aria-hidden="true" />
      <span className="about__manifest-index mono">{`§0${index + 1}`}</span>
      <div className="about__manifest-copy">
        <h3 className="about__manifest-title">{card.title}</h3>
        <p className="about__manifest-desc">{card.description}</p>
        {detail && (
          <p className="about__manifest-detail mono">{detail.join(' · ')}</p>
        )}
      </div>
    </motion.li>
  );
};

const About = () => {
  const sheetRef = useRef(null);
  const [reduceMotion] = useState(prefersReducedMotion);
  const [ghostRange, setGhostRange] = useState(getGhostRange);

  useEffect(() => {
    const handleResize = () => setGhostRange(getGhostRange());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sheetRef,
    offset: ['start end', 'end start'],
  });
  const rawGhostY = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const ghostY = useTransform(rawGhostY, (value) => (
    ghostRange > 0 ? (value / 14) * ghostRange : 0
  ));

  return (
    <div className="about__sheet" ref={sheetRef}>
      <motion.div
        className="about__sheet-bar mono"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <span>Sheet — 02 / 05</span>
        <span>Subject — Engineer Profile</span>
      </motion.div>

      {/* whileInView lives here, not on the h2 below: a clip-path hidden
          state (clipReveal) freezes Chromium's IntersectionObserver for
          the element it's applied to, so it can never re-fire "show" once
          scrolled into view. Triggering from this always-unclipped
          wrapper and letting the heading inherit via variant propagation
          sidesteps that entirely. */}
      <motion.div
        className="about__identity"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.span
          className="about__ghost-mark"
          aria-hidden="true"
          style={{ y: ghostY }}
          variants={fadeIn}
        >
          02
        </motion.span>

        <span className="section-eyebrow">About</span>

        <motion.h2 className="about__heading" variants={clipReveal}>
          Systems-minded <span>engineer</span>,
          <br />
          shipped into production.
        </motion.h2>
      </motion.div>

      <motion.p
        className="about__summary"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {personalInfo.summary}
      </motion.p>

      <motion.div
        className="about__divider"
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <span className="about__divider-label mono">Technical Manifest</span>
      </motion.div>

      <div className="about__manifest">
        {!reduceMotion && (
          <motion.span
            className="about__manifest-scan"
            aria-hidden="true"
            variants={scanSweep}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          />
        )}

        <motion.ul
          className="about__manifest-list"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {aboutCards.map((card, index) => (
            <ManifestRow card={card} index={index} key={card.title} />
          ))}
        </motion.ul>
      </div>

      <motion.div
        className="about__metadata"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <div className="about__metadata-field">
          <span className="about__metadata-label mono">Role</span>
          <span className="about__metadata-value">
            {currentRole.role}
            {' · '}
            {currentRole.company}
          </span>
        </div>
        <span className="about__metadata-divider" aria-hidden="true" />
        <div className="about__metadata-field">
          <span className="about__metadata-label mono">Location</span>
          <span className="about__metadata-value">{personalInfo.location}</span>
        </div>
        <span className="about__metadata-divider" aria-hidden="true" />
        <div className="about__metadata-field">
          <span className="about__metadata-label mono">Focus</span>
          <span className="about__metadata-value">{personalInfo.taglines[2]}</span>
        </div>
      </motion.div>

      <motion.a
        href="#work"
        className="about__transition mono"
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <span className="about__transition-label">
          Next — Selected Work
          <span className="about__transition-underline" aria-hidden="true" />
          <span className="about__transition-signal" aria-hidden="true" />
        </span>
        <ArrowRight size={13} strokeWidth={2.25} />
      </motion.a>
    </div>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
