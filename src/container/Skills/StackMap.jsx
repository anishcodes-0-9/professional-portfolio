import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

import {
  EASE_OUT, fadeUp, scaleIn, staggerContainer, viewportOnce,
} from '../../wrapper/variants';

import { skillDomains } from '../../data/anishData';
import BrandMark from '../../components/shared/BrandMark';
import './StackMap.scss';

/* -------------------------------------------------------------------------- */
/* Utilities                                                                  */
/* -------------------------------------------------------------------------- */

const prefersReducedMotion = () => (
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

/* -------------------------------------------------------------------------- */
/* Technology icons                                                          */
/* -------------------------------------------------------------------------- */

// Real technology logos, brand-accurate rather than a generic icon set.
// Claude and Hugging Face have no official mark in the installed
// react-icons version — Claude reuses BrandMark's real Anthropic asterisk
// (SkillIcon below), Hugging Face falls back to a restrained text initial.
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
  if (name === 'Claude') {
    return <BrandMark brand="claude" label={name} />;
  }

  const logo = logos[name];

  if (!logo) {
    return <span className="skill-initial">{name.slice(0, 2)}</span>;
  }

  const Icon = logo.icon;

  return <Icon style={{ color: logo.color }} aria-hidden="true" />;
};

/* -------------------------------------------------------------------------- */
/* Domain Node — one branch of the engineering stack                          */
/* -------------------------------------------------------------------------- */

const DomainNode = ({
  domainGroup, index, isActive, onSelect, onKeyDown, registerNode,
}) => (
  <motion.button
    type="button"
    ref={registerNode}
    variants={fadeUp}
    role="tab"
    id={`stack-tab-${index}`}
    aria-selected={isActive}
    aria-controls="stackmap-panel"
    tabIndex={isActive ? 0 : -1}
    className={`stackmap__domain ${isActive ? 'is-active' : ''}`}
    style={{
      '--stem-delay': `${300 + index * 60}ms`,
    }}
    onClick={(event) => {
      event.currentTarget.focus();
      onSelect(index);
    }}
    onKeyDown={onKeyDown}
  >
    <span className="stackmap__domain-index mono">
      {String(index + 1).padStart(2, '0')}
    </span>

    <span className="stackmap__domain-label">{domainGroup.domain}</span>

    <span className="stackmap__domain-count mono">
      {domainGroup.technologies.length}
    </span>
  </motion.button>
);

/* -------------------------------------------------------------------------- */
/* Technology Chip — one real technology within the active domain             */
/* -------------------------------------------------------------------------- */

const TechnologyChip = ({ tech, isActive, onSelect }) => (
  <motion.button
    type="button"
    variants={fadeUp}
    aria-pressed={isActive}
    className={`stackmap__chip ${isActive ? 'is-active' : ''}`}
    onClick={onSelect}
  >
    <span className="stackmap__chip-icon" aria-hidden="true">
      <SkillIcon name={tech.name} />
    </span>

    <span className="stackmap__chip-name">{tech.name}</span>
  </motion.button>
);

/* -------------------------------------------------------------------------- */
/* Skill Detail — supporting information for the selected technology          */
/* -------------------------------------------------------------------------- */

const SkillDetail = ({ domain, tech, reduceMotion }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={tech.name}
      className="stackmap__detail"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: EASE_OUT }}
    >
      <div className="stackmap__detail-eyebrow mono">
        <span>{domain.domain}</span>

        <span className="stackmap__detail-eyebrow-sep">/</span>

        Selected Technology
      </div>

      <div className="stackmap__detail-heading">
        <span className="stackmap__detail-icon" aria-hidden="true">
          <SkillIcon name={tech.name} />
        </span>

        <h3 className="stackmap__detail-name">{tech.name}</h3>
      </div>

      {domain.description && (
        <p className="stackmap__detail-desc">{domain.description}</p>
      )}

      {tech.usedIn.length > 0 && (
        <div className="stackmap__detail-usedin">
          <span className="stackmap__detail-usedin-label mono">Used In</span>

          <div className="stackmap__detail-usedin-list">
            {tech.usedIn.map((entry) => (
              <span key={entry} className="stackmap__detail-usedin-chip mono">
                {entry}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  </AnimatePresence>
);

/* -------------------------------------------------------------------------- */
/* Stack Map — core + domains + technologies + detail                        */
/* -------------------------------------------------------------------------- */

const StackMap = () => {
  const domainCount = skillDomains.length;

  const [reduceMotion] = useState(prefersReducedMotion);
  const [activeDomainIndex, setActiveDomainIndex] = useState(0);
  const [activeTechIndex, setActiveTechIndex] = useState(0);

  const mapRef = useRef(null);
  const domainRefs = useRef([]);

  const activeDomain = skillDomains[activeDomainIndex];
  const activeTech = activeDomain.technologies[activeTechIndex];

  const handleSelectDomain = (index) => {
    setActiveDomainIndex(index);
    setActiveTechIndex(0);
  };

  const handleDomainKeyDown = (event) => {
    let nextIndex = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (activeDomainIndex + 1) % domainCount;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (activeDomainIndex - 1 + domainCount) % domainCount;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = domainCount - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      handleSelectDomain(nextIndex);
      domainRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="stackmap-wrap">
      <motion.div
        className="stackmap"
        ref={mapRef}
        variants={staggerContainer(reduceMotion ? 0 : 0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        onViewportEnter={() => mapRef.current?.classList.add('is-live')}
      >
        <motion.div className="stackmap__core" variants={scaleIn}>
          <span className="stackmap__core-count mono">
            {String(domainCount).padStart(2, '0')}
          </span>

          <span className="stackmap__core-label mono">
            <span>Engineering</span>
            <span>Domains</span>
          </span>
        </motion.div>

        <span className="stackmap__trunk" aria-hidden="true" />
        <span className="stackmap__branch-bar" aria-hidden="true" />

        <div
          className="stackmap__domains"
          role="tablist"
          aria-label="Engineering domains"
        >
          {skillDomains.map((domainGroup, index) => (
            <DomainNode
              key={domainGroup.domain}
              domainGroup={domainGroup}
              index={index}
              isActive={index === activeDomainIndex}
              onSelect={handleSelectDomain}
              onKeyDown={handleDomainKeyDown}
              registerNode={(element) => {
                domainRefs.current[index] = element;
              }}
            />
          ))}
        </div>
      </motion.div>

      <div
        className="stackmap__panel"
        role="tabpanel"
        id="stackmap-panel"
        aria-labelledby={`stack-tab-${activeDomainIndex}`}
      >
        <motion.span
          key={activeDomain.domain}
          className="stackmap__tech-stem"
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE_OUT }}
        />

        <motion.div
          key={`${activeDomain.domain}-chips`}
          className="stackmap__technologies"
          role="group"
          aria-label={`${activeDomain.domain} technologies`}
          variants={staggerContainer(reduceMotion ? 0 : 0.03)}
          initial="hidden"
          animate="show"
        >
          {activeDomain.technologies.map((tech, index) => (
            <TechnologyChip
              key={tech.name}
              tech={tech}
              isActive={index === activeTechIndex}
              onSelect={() => setActiveTechIndex(index)}
            />
          ))}
        </motion.div>

        <SkillDetail
          domain={activeDomain}
          tech={activeTech}
          reduceMotion={reduceMotion}
        />
      </div>
    </div>
  );
};

export default StackMap;
