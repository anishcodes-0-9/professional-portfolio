import React from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { skills, experiences } from '../../data/anishData';
import './Skills.scss';

const Skills = () => (
  <>
    <h2 className="head-text">Skills & <span>Experience</span></h2>

    <div className="app__skills-container">
      <motion.div className="app__skills-list">
        {skills.map((skill, i) => (
          <motion.div
            whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="app__skills-item app__flex"
            key={skill.name}
          >
            <div className="skill-icon app__flex" style={{ background: skill.bgColor + '18' }}>
              <span className="skill-icon__letter">{skill.name.charAt(0)}</span>
            </div>
            <p className="p-text">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="app__skills-exp">
        <h3 className="skills__exp-heading">Work Timeline</h3>
        {experiences.map((experience) => (
          <motion.div
            whileInView={{ opacity: [0, 1], x: [20, 0] }}
            transition={{ duration: 0.5 }}
            className="app__skills-exp-item"
            key={experience.year}
          >
            <div className="app__skills-exp-year">
              <p className="bold-text">{experience.year}</p>
            </div>
            <motion.div className="app__skills-exp-works">
              {experience.works.map((work) => (
                <div className="app__skills-exp-work" key={work.name}>
                  <h4 className="bold-text">{work.name}</h4>
                  <p className="p-text work__company">{work.company}</p>
                  <p className="p-text work__desc">{work.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
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
