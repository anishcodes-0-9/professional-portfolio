import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { AppWrap } from '../../wrapper';
import { MagneticButton as Magnetic } from '../../components';
import { personalInfo } from '../../data/anishData';
import './Header.scss';

const roles = personalInfo.taglines;

const STATS = [
  {
    num: '10M+', label: 'Users served in production', tone: 'primary',
  },
  { num: '4+', label: 'Years experience' },
  { num: '3x', label: 'AWS certified' },
];

const Header = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isProjectMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsProjectMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProjectMenuOpen]);

  useEffect(() => {
    const node = heroRef.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      node.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };

    node.addEventListener('pointermove', handlePointerMove);
    return () => node.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const techBadges = ['Java', 'Python', 'React', 'Node.js', 'AWS'];

  const navigateToSection = (sectionId, search = window.location.search) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${search}#${sectionId}`,
    );
  };

  const openProjectTab = (tab) => {
    window.dispatchEvent(
      new CustomEvent('portfolio:open-work-tab', {
        detail: { tab },
      }),
    );
    setIsProjectMenuOpen(false);
    navigateToSection('work', `?tab=${tab}`);
  };

  return (
    <div className="app__header app__flex" ref={heroRef}>
      <div className="header__glow" aria-hidden="true" />
      <div className="header__grid" aria-hidden="true" />

      <motion.div
        className="app__header-content"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="header__signal-bar"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <button
            type="button"
            className="header__signal-pill header__signal-pill--live"
            onClick={() => navigateToSection('contact')}
            aria-label="Open to new roles — go to contact section"
          >
            Open to new roles
          </button>
          <button
            type="button"
            className="header__signal-pill header__signal-pill--action"
            onClick={() => openProjectTab('enterprise')}
            aria-label="See enterprise work"
          >
            Enterprise work ↗
          </button>
        </motion.div>

        <motion.h1
          className="header__name"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          Anish Krishnan
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
          className="header__summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          I build distributed systems and production web platforms — currently
          at Debut Infotech, previously Alignerr and Cognizant.
          <br />
          Four years shipping backend services and interfaces that hold up
          under real traffic.
        </motion.p>

        <motion.div
          className="header__badges"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          {techBadges.map((b) => (
            <span key={b} className="header__badge">
              {b}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="header__cta"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Magnetic
            as="button"
            type="button"
            className="cta-primary"
            onClick={() => setIsProjectMenuOpen((open) => !open)}
            aria-expanded={isProjectMenuOpen}
            aria-controls="project-type-menu"
          >
            View Projects
            <ArrowRight size={16} strokeWidth={2.25} />
          </Magnetic>
          <Magnetic
            as="button"
            type="button"
            className="cta-secondary"
            onClick={() => navigateToSection('contact')}
          >
            Get in Touch
          </Magnetic>
        </motion.div>

        {isProjectMenuOpen && (
          <div
            className="header__project-menu-backdrop"
            onClick={() => setIsProjectMenuOpen(false)}
          >
            <motion.div
              id="project-type-menu"
              className="header__project-menu"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <p className="header__project-menu-label">Choose projects type</p>
              <div className="header__project-menu-actions">
                <button
                  type="button"
                  className="header__project-option header__project-option--primary"
                  onClick={() => openProjectTab('enterprise')}
                >
                  Enterprise Projects
                </button>
                <button
                  type="button"
                  className="header__project-option"
                  onClick={() => openProjectTab('personal')}
                >
                  Personal Projects
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

      <motion.div
        className="header__stats"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="header__monogram" aria-hidden="true">
          <span className="header__monogram-ak">AK</span>
          <span className="header__monogram-dot">.</span>
        </div>

        {STATS.map((stat) => (
          <div
            key={stat.label}
            className={`header__stat-card ${stat.tone === 'primary' ? 'header__stat-card--primary' : ''}`}
          >
            <span className="stat-num">{stat.num}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.a
        href="#about"
        className="header__scroll"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <ArrowDown size={16} strokeWidth={2} className="header__scroll-icon" />
      </motion.a>
    </div>
  );
};

export default AppWrap(Header, 'home');
