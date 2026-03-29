import React from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { aboutCards, certifications } from '../../data/anishData';
import './About.scss';

const About = () => (
  <>
    <h2 className="head-text">
      About <span>Me</span>
    </h2>
    <p className="about__subtitle">
      Full Stack Engineer · Backend Architect · AI Evaluator
    </p>

    <div className="app__profiles">
      {aboutCards.map((card, index) => (
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="app__profile-item"
          key={card.title}
        >
          <div className="profile-emoji">{card.emoji}</div>
          <h3 className="bold-text">{card.title}</h3>
          <p className="p-text">{card.description}</p>
        </motion.div>
      ))}
    </div>

    <div className="about__certs">
      <h4 className="certs__label">Certifications</h4>
      <div className="certs__list">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="cert__badge"
            style={{ borderColor: `${cert.color}44` }}
          >
            <span className="cert__name">{cert.name}</span>
            <span className="cert__level">{cert.org}</span>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
