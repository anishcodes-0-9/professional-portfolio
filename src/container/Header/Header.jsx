import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AppWrap } from '../../wrapper';
import { personalInfo } from '../../data/anishData';
import './Header.scss';

const roles = personalInfo.taglines;

const Header = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (typing) {
      if (displayed.length < currentRole.length) {
        timeout = setTimeout(
          () => setDisplayed(currentRole.slice(0, displayed.length + 1)),
          70,
        );
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else if (displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setRoleIndex((i) => (i + 1) % roles.length);
      setTyping(true);
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

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

  const techBadges = ['Java', 'Python', 'JavaScript', 'MySQL', 'AWS'];

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
    <div className="app__header app__flex">
      <div className="header__grid-bg" />
      <div className="header__orb header__orb--blue" />
      <div className="header__orb header__orb--cyan" />

      <motion.div
        className="app__header-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="header__greeting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="greeting-wave">👋</span>
          <span>Hi, I&apos;m</span>
        </motion.div>

        <motion.h1
          className="header__name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Anish Krishnan
        </motion.h1>

        <div className="header__role">
          <span className="header__role-text">{displayed}</span>
          <span className="header__cursor">|</span>
        </div>

        <motion.p
          className="header__summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Full Stack Engineer building scalable distributed systems for 10M+
          users.
          <br />
          3+ years at Cognizant · AWS Certified · Currently at Alignerr
        </motion.p>

        <motion.div
          className="header__badges"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {techBadges.map((b) => (
            <span key={b} className="header__badge">
              {b}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="header__cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button
            type="button"
            className="cta-primary"
            onClick={() => setIsProjectMenuOpen((open) => !open)}
            aria-expanded={isProjectMenuOpen}
            aria-controls="project-type-menu"
          >
            View Projects
          </button>
          <button
            type="button"
            className="cta-secondary"
            onClick={() => navigateToSection('contact')}
          >
            Get in Touch
          </button>
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
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="header__monogram" aria-hidden="true">
          <span className="header__monogram-ak">AK</span>
          <span className="header__monogram-dot">.</span>
        </div>
        {[
          { num: '4+', label: 'Years Exp' },
          { num: '10M+', label: 'Users Served' },
          { num: '3x', label: 'AWS Certified' },
        ].map((stat) => (
          <div key={stat.label} className="header__stat-card">
            <span className="stat-num">{stat.num}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="header__scroll"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="scroll-dot" />
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, 'home');
