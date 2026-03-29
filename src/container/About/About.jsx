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
      A Full Stack Engineer who bridges scalable backend systems with polished frontend experiences.
      Currently shaping how AI writes trustworthy code.
    </p>

    <div className="app__profiles">
      {aboutCards.map((card, index) => (
        <motion.div
          whileInView={{ opacity: [0, 1], y: [30, 0] }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.5, delay: index * 0.1, type: 'tween' }}
          className="app__profile-item"
          key={card.title}
        >
          <div className="profile-item__emoji">{card.emoji}</div>
          <h2 className="bold-text">{card.title}</h2>
          <p className="p-text">{card.description}</p>
        </motion.div>
      ))}
    </div>

    <div className="about__certs">
      <h3 className="about__certs-title">Certifications</h3>
      <div className="about__certs-list">
        {certifications.map((cert) => (
          <div className="cert-badge" key={cert.name} style={{ borderColor: cert.color + '44' }}>
            <span className="cert-badge__dot" style={{ background: cert.color }} />
            <span className="cert-badge__name">{cert.name}</span>
            <span className="cert-badge__level">{cert.level}</span>
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
