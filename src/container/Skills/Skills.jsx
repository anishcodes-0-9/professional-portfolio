import React from 'react';
import { AppWrap, MotionWrap } from '../../wrapper';
import { skillDomains } from '../../data/anishData';
import StackMap from './StackMap';
import './Skills.scss';

const totalTechnologies = skillDomains.reduce(
  (sum, domainGroup) => sum + domainGroup.technologies.length,
  0,
);

const Skills = () => (
  <>
    <h2 className="head-text">
      Skills & <span>Tools</span>
    </h2>
    <p className="skills__subtitle">
      {`Organized by where each of the ${totalTechnologies} technologies below actually sits in the stack — not an alphabetical wall of logos.`}
    </p>

    <StackMap />
  </>
);

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);
