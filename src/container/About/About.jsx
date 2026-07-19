import React from 'react';
import { motion } from 'framer-motion';
import {
  Server, Palette, Cloud, Bot,
} from 'lucide-react';
import { AppWrap, MotionWrap } from '../../wrapper';
import { fadeUp, staggerContainer, viewportOnce } from '../../wrapper/variants';
import { aboutCards } from '../../data/anishData';
import './About.scss';

const ICONS = {
  '⚙️': Server,
  '🎨': Palette,
  '☁️': Cloud,
  '🤖': Bot,
};

const About = () => (
  <div className="about__layout">
    <div className="about__intro">
      <span className="section-eyebrow">About</span>
      <h2 className="head-text about__heading">
        Systems-minded <span>engineer</span>
      </h2>
      <p className="about__subtitle">
        I like the parts of engineering most people skip — the API contract,
        the failure mode, the metric that tells you something actually
        broke. Four years across backend systems, production interfaces,
        and — more recently — evaluating how AI-generated code holds up
        under real scrutiny.
      </p>
    </div>

    <motion.div
      className="app__profiles"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {aboutCards.map((card) => {
        const Icon = ICONS[card.emoji] ?? Server;
        return (
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="app__profile-item gradient-border"
            key={card.title}
          >
            <div className="profile-icon">
              <Icon size={22} strokeWidth={1.75} />
            </div>
            <h3 className="bold-text">{card.title}</h3>
            <p className="p-text">{card.description}</p>
          </motion.div>
        );
      })}
    </motion.div>
  </div>
);

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
