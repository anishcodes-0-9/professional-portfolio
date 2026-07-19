import React from 'react';
import { motion } from 'framer-motion';
import { FaAws, FaJava } from 'react-icons/fa';
import {
  SiDocker,
  SiDynatrace,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTerraform,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';
import { AppWrap, MotionWrap } from '../../wrapper';
import { fadeUp, staggerContainer, viewportOnce } from '../../wrapper/variants';
import { skillGroups } from '../../data/anishData';
import './Skills.scss';

// Real technology logos, kept as brand-accurate marks rather than folded
// into the generic Lucide icon set — recognizability is the point here.
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
  MySQL: { icon: SiMysql, color: '#4479a1' },
  MongoDB: { icon: SiMongodb, color: '#47a248' },
  Docker: { icon: SiDocker, color: '#2496ed' },
  Kubernetes: { icon: SiKubernetes, color: '#326ce5' },
  AWS: { icon: FaAws, color: '#ff9900' },
  Terraform: { icon: SiTerraform, color: '#7b42bc' },
  Dynatrace: { icon: SiDynatrace, color: '#1496ff' },
  'Vue.js': { icon: SiVuedotjs, color: '#4fc08d' },
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
      Skills & <span>Tools</span>
    </h2>
    <p className="skills__subtitle">
      Grouped by how much real weight each one carries across the work
      above — not an alphabetical wall of logos.
    </p>

    <div className="app__skills-container">
      {skillGroups.map((group) => (
        <motion.div
          className={`skills-tier skills-tier--${group.tier === 'Core stack' ? 'core' : 'secondary'}`}
          key={group.tier}
          variants={staggerContainer(0.04)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <h3 className="skills-tier__label">{group.tier}</h3>
          <div className="skills-tier__list">
            {group.skills.map((name) => (
              <motion.div
                key={name}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="app__skills-item app__flex"
              >
                <div className="skill-icon app__flex">
                  <SkillIcon name={name} />
                </div>
                <p className="p-text">{name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </>
);

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);
