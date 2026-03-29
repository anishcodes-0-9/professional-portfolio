import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap } from '../../wrapper';
import { personalInfo } from '../../data/anishData';
import './Header.scss';

const roles = ['Full Stack Engineer', 'Backend Architect', 'AI Enthusiast', 'Cloud Developer'];

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
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <div className="app__header app__flex">
      {/* Animated grid background */}
      <div className="header__grid-bg" />

      <motion.div
        whileInView={{ x: [-60, 0], opacity: [0, 1] }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="app__header-info"
      >
        <p className="header__greeting">Hello World 👋 — I'm</p>
        <h1 className="header__name">{personalInfo.name}</h1>
        <h2 className="header__role">
          <span className="typed-text">{displayed}</span>
          <span className="cursor">|</span>
        </h2>
        <p className="header__summary">{personalInfo.summary}</p>

        <div className="header__actions">
          <a href="#work" className="btn btn--primary">View Projects</a>
          <a href="#contact" className="btn btn--ghost">Get in Touch</a>
        </div>

        <div className="header__meta">
          <span>📍 {personalInfo.location}</span>
          <span className="header__available">
            <span className="pulse-dot" /> Available for opportunities
          </span>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1], scale: [0.9, 1] }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="app__header-visual"
      >
        <div className="header__avatar-container">
          <div className="header__avatar-glow" />
          <div className="header__avatar">
            <span className="avatar__initials">AK</span>
          </div>
          <div className="header__tech-orbit">
            {['⚛️', '☕', '🐍', '☁️'].map((icon, i) => (
              <div
                key={i}
                className="orbit-item"
                style={{ '--orbit-index': i }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        <div className="header__stats">
          <div className="stat">
            <span className="stat__number">3+</span>
            <span className="stat__label">Years exp</span>
          </div>
          <div className="stat">
            <span className="stat__number">10M+</span>
            <span className="stat__label">Users served</span>
          </div>
          <div className="stat">
            <span className="stat__number">3×</span>
            <span className="stat__label">AWS Certified</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, 'home');
