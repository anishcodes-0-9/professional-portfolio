import React from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { personalInfo } from '../data/anishData';

const SocialMedia = () => (
  <div className='app__social'>
    <div>
      <a href={personalInfo.github} target='_blank' rel='noreferrer'>
        <BsGithub />
      </a>
    </div>
    <div>
      <a href={personalInfo.linkedin} target='_blank' rel='noreferrer'>
        <BsLinkedin />
      </a>
    </div>
  </div>
);

export default SocialMedia;
