import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/anishData';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
        <FaGithub size={18} />
      </a>
    </div>
    <div>
      <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <FaLinkedin size={18} />
      </a>
    </div>
  </div>
);

export default SocialMedia;
