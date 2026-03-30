import React from 'react';
import { motion } from 'framer-motion';
import { FaAws, FaJava } from 'react-icons/fa';
import {
  SiDocker,
  SiDynatrace,
  SiGraphql,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiTerraform,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';
import { AppWrap, MotionWrap } from '../../wrapper';
import { skills, experiences } from '../../data/anishData';
import './Skills.scss';

const logos = {
  Java: { icon: FaJava, color: '#f89820' },
  'Spring Boot': { icon: SiSpringboot, color: '#6db33f' },
  React: { icon: SiReact, color: '#61dafb' },
  'Next.js': { icon: SiNextdotjs, color: '#ffffff' },
  'Node.js': { icon: SiNodedotjs, color: '#5fa04e' },
  Python: { icon: SiPython, color: '#3776ab' },
  JavaScript: { icon: SiJavascript, color: '#f7df1e' },
  TypeScript: { icon: SiTypescript, color: '#3178c6' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169e1' },
  MongoDB: { icon: SiMongodb, color: '#47a248' },
  Redis: { icon: SiRedis, color: '#dc382d' },
  Docker: { icon: SiDocker, color: '#2496ed' },
  Kubernetes: { icon: SiKubernetes, color: '#326ce5' },
  AWS: { icon: FaAws, color: '#ff9900' },
  Terraform: { icon: SiTerraform, color: '#7b42bc' },
  Dynatrace: { icon: SiDynatrace, color: '#1496ff' },
  'Vue.js': { icon: SiVuedotjs, color: '#4fc08d' },
  GraphQL: { icon: SiGraphql, color: '#e10098' },
};

const SkillIcon = ({ name }) => {
  const logo = logos[name];

  if (!logo) {
    return <span className="skill-initial">{name.slice(0, 2)}</span>;
  }

  const Icon = logo.icon;

  return <Icon style={{ color: logo.color }} aria-label={name} title={name} />;
};

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
            <div className="skill-icon app__flex">
              <SkillIcon name={skill.name} />
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
