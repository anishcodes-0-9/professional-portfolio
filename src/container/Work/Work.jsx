import React, { useState } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { projects } from '../../data/anishData';
import './Work.scss';

const categories = ['All', 'Enterprise', 'AI', 'Backend', 'React'];

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });
    setTimeout(() => setAnimateCard({ y: 0, opacity: 1 }), 400);
  };

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter) || p.category === activeFilter);

  return (
    <>
      <h2 className="head-text">My <span>Projects</span></h2>
      <p className="work__subtitle">
        Enterprise-scale systems, AI tooling, and everything in between.
      </p>

      <div className="app__work-filter">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.4 }}
        className="app__work-portfolio"
      >
        {filtered.map((work, index) => (
          <motion.div
            whileHover={{ y: -6 }}
            className="app__work-item app__flex"
            key={index}
          >
            <div className="app__work-header">
              <div className="work-item__category">{work.category}</div>
              <div className="work-item__period">{work.period}</div>
            </div>

            <div className="app__work-img app__flex">
              <div className="work-img__placeholder">
                <span>{work.title.charAt(0)}</span>
              </div>
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25 }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileHover={{ scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileHover={{ scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text">{work.description}</p>

              <div className="work-item__highlights">
                {work.highlights.map((h, i) => (
                  <span key={i} className="highlight-tag">{h}</span>
                ))}
              </div>

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);
