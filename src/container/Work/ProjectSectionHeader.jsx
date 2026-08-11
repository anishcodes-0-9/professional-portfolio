import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../wrapper/variants';

const ProjectSectionHeader = ({ sectionNumber, sectionTitle, sectionSubtitle }) => (
  <motion.div
    className="work__section-header"
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={viewportOnce}
  >
    <div className="work__section-index">
      <span className="work__section-number mono">{String(sectionNumber).padStart(2, '0')}</span>
      <span className="work__section-divider">/</span>
    </div>
    <h2 className="work__section-title">
      {sectionTitle}
    </h2>
    <p className="work__section-subtitle">
      {sectionSubtitle}
    </p>
  </motion.div>
);

export default ProjectSectionHeader;
