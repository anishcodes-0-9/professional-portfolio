import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../wrapper/variants';
import { workHistory } from '../../data/anishData';
import BrandMark from '../../components/shared/BrandMark';

const ExperienceRecords = () => (
  <div className="work__experience-records">
    <ul className="work__ledger">
      {workHistory.map((job, index) => (
        <motion.li
          key={`${job.company}-${job.role}`}
          className="work__ledger-row"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          transition={{ delay: Math.min(index * 0.08, 0.32) }}
        >
          <span className="work__ledger-mark" aria-hidden="true">
            <BrandMark brand={job.logoKey} label={job.company} />
          </span>
          <div className="work__ledger-copy">
            <h4 className="work__ledger-role">{job.role}</h4>
            <span className="work__ledger-company mono">{job.company}</span>
            <p className="work__ledger-desc">{job.description}</p>
          </div>
          <span className="work__ledger-period mono">{job.period}</span>
        </motion.li>
      ))}
    </ul>
  </div>
);

export default ExperienceRecords;
