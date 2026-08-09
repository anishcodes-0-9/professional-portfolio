import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { AppWrap } from '../../wrapper';
import { MagneticButton as Magnetic } from '../../components';
import { clipReveal } from '../../wrapper/variants';
import { personalInfo, workHistory, skillGroups } from '../../data/anishData';
import HeroBackground from './HeroBackground';
import './Header.scss';

const roles = personalInfo.taglines;

const SIGNATURE_METRIC = { num: '10M+', label: 'Users served in production' };

// Real data, not placeholder copy — the annotation row and ledger pull
// straight from what's already tracked in anishData.js.
const currentRole = workHistory[0];
const coreStack = skillGroups.find((group) => group.tier === 'Core stack')?.skills?.slice(0, 3) ?? [];

const Header = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const metricRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app__header app__flex">
      <HeroBackground metricAnchorRef={metricRef} />

      <motion.div
        className="header__ledger mono"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="header__ledger-item">
          <span className="header__status-dot" aria-hidden="true" />
          STATUS — OPEN TO ROLES
        </span>
        <span className="header__ledger-item header__ledger-item--right">
          REV 2026.1 — {personalInfo.location.toUpperCase()}
        </span>
      </motion.div>

      <motion.div
        className="app__header-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          className="header__name"
          initial="hidden"
          animate="show"
          variants={clipReveal}
          transition={{ delay: 0.2, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          Anish
          <br />
          Krishnan
        </motion.h1>

        <div className="header__role" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.span
              key={roles[roleIndex]}
              className="header__role-text"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          className="header__proof"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Four years building distributed systems and production interfaces
          that hold up under real traffic — currently at Debut Infotech.
        </motion.p>

        <motion.div
          className="header__annotations mono"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          <span>
            {'ROLE — '}
            {currentRole.role.toUpperCase()}
            {', '}
            {currentRole.company.toUpperCase()}
          </span>
          <span className="header__annotations-divider" aria-hidden="true" />
          <span>EXP — 4+ YRS</span>
          <span className="header__annotations-divider" aria-hidden="true" />
          <span>
            {'STACK — '}
            {coreStack.join(' · ').toUpperCase()}
          </span>
        </motion.div>

        <motion.div
          className="header__cta"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Magnetic as="a" href="#work" className="cta-primary">
            View Work
            <ArrowRight size={16} strokeWidth={2.25} />
          </Magnetic>
          <Magnetic as="a" href="#contact" className="cta-secondary">
            Contact
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        className="header__metric"
        ref={metricRef}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.5, duration: 0.8, type: 'spring', stiffness: 120, damping: 16,
        }}
      >
        <div className="header__metric-frame">
          <span className="header__metric-num">{SIGNATURE_METRIC.num}</span>
        </div>
        <span className="header__metric-label mono">{SIGNATURE_METRIC.label}</span>
      </motion.div>

      <motion.a
        href="#about"
        className="header__scroll"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.15, duration: 0.6 }}
      >
        <ArrowDown size={16} strokeWidth={2} className="header__scroll-icon" />
      </motion.a>
    </div>
  );
};

export default AppWrap(Header, 'home');
