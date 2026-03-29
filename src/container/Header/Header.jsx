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

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (typing) {
      if (displayed.length < currentRole.length) {
        timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 70);
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

  const techBadges = ['Java', 'Spring Boot', 'React', 'AWS', 'K8s'];

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
          Full Stack Engineer building scalable distributed systems for 10M+ users.
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
            <span key={b} className="header__badge">{b}</span>
          ))}
        </motion.div>

        <motion.div
          className="header__cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <a href="#work" className="cta-primary">View Projects</a>
          <a href="#contact" className="cta-secondary">Get in Touch</a>
        </motion.div>
      </motion.div>

      <motion.div
        className="header__stats"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {[
          { num: '3+', label: 'Years Exp' },
          { num: '10M+', label: 'Users Served' },
          { num: '3×', label: 'AWS Certified' },
          { num: '4.5/5', label: 'Alignerr Score' },
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
