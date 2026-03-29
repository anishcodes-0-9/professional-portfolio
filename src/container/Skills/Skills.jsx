import React from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { skills, experiences } from '../../data/anishData';
import './Skills.scss';

const Skills = () => (
  <>
    <h2 className="head-text">
      Skills & <span>Experience</span>
    </h2>

    <div className="app__skills-container">
      <motion.div className="app__skills-list">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            className="app__skills-item app__flex"
          >
            <div
              className="skill-icon"
              style={{ background: skill.bgColor }}
            >
              <span className="skill-initial">{skill.name.slice(0, 2)}</span>
            </div>
            <p className="p-text">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="app__skills-exp">
        {experiences.map((exp) => (
          <div className="app__skills-exp-item" key={exp.year}>
            <div className="app__skills-exp-year">
              <p className="bold-text">{exp.year}</p>
            </div>
            <div className="app__skills-exp-works">
              {exp.works.map((work) => (
                <div className="app__skills-exp-work" key={work.name}>
                  <h4 className="bold-text">{work.name}</h4>
                  <p className="p-text company">{work.company}</p>
                  <p className="p-text desc">{work.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);
