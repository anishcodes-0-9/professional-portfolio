import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../wrapper/variants';

const ExperienceSectionHeader = () => (
  <motion.div
    className="work__section-header"
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
  >
    <div className="work__section-index">
      <span className="work__section-number mono">01</span>
      <span className="work__section-divider">/</span>
    </div>
    <h2 className="work__section-title">
      PROFESSIONAL EXPERIENCE
    </h2>
    <p className="work__section-subtitle">
      Companies and organizations
    </p>
  </motion.div>
);

export default ExperienceSectionHeader;

