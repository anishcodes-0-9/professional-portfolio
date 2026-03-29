import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsGithub, BsBoxArrowUpRight } from 'react-icons/bs';
import { AppWrap, MotionWrap } from '../../wrapper';
import {
  workHistory,
  enterpriseProjects,
  personalProjects,
  certifications,
} from '../../data/anishData';
import './Work.scss';

// ─── Tab definitions ──────────────────────────
const TABS = [
  { id: 'history',    label: 'Work History',        icon: '🏢' },
  { id: 'enterprise', label: 'Enterprise Projects',  icon: '⚡' },
  { id: 'personal',   label: 'Personal Projects',    icon: '🛠️' },
  { id: 'certs',      label: 'Certifications',       icon: '🏆' },
  { id: 'blogs',      label: 'Blogs',                icon: '✍️', soon: true },
];

// ─── Work History Tab ─────────────────────────
const WorkHistoryTab = () => (
  <div className="tab-content">
    {workHistory.map((job, i) => (
      <motion.div
        key={job.company + job.role}
        className="history-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08 }}
      >
        <div className="history-card__header">
          <div className="history-card__logo">{job.logo}</div>
          <div className="history-card__meta">
            <h3 className="history-card__company">{job.company}</h3>
            <p className="history-card__role">{job.role}</p>
            <span className="history-card__period">{job.period}</span>
          </div>
        </div>
        <p className="history-card__desc">{job.description}</p>
        <ul className="history-card__bullets">
          {job.bullets.map((b, bi) => (
            <li key={bi}>{b}</li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

// ─── Enterprise Projects Tab ──────────────────
const EnterpriseTab = () => (
  <div className="tab-content">
    {enterpriseProjects.map((proj, i) => (
      <motion.div
        key={proj.title}
        className="enterprise-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08 }}
      >
        <div className="enterprise-card__header">
          <span className="enterprise-card__emoji">{proj.emoji}</span>
          <div>
            <h3 className="enterprise-card__title">{proj.title}</h3>
            <span className="enterprise-card__period">{proj.period}</span>
          </div>
        </div>
        <p className="enterprise-card__desc">{proj.description}</p>
        <ul className="enterprise-card__bullets">
          {proj.bullets.map((b, bi) => (
            <li key={bi}>{b}</li>
          ))}
        </ul>
        <div className="enterprise-card__tags">
          {proj.tags.map((t) => (
            <span key={t} className="chip chip--blue">{t}</span>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
);

// ─── Personal Projects Tab ────────────────────
const PersonalTab = () => (
  <div className="tab-content">
    <p className="tab-content__subtitle">
      Some things I've built while experimenting with systems, AI, and interactive interfaces.
    </p>
    {personalProjects.map((proj, i) => (
      <motion.div
        key={proj.title}
        className="personal-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08 }}
      >
        <div className="personal-card__top">
          <h3 className="personal-card__title">{proj.title}</h3>
          <div className="personal-card__links">
            {proj.github && (
              <a href={proj.github} target="_blank" rel="noreferrer" className="icon-link" title="View on GitHub">
                <BsGithub />
                <span>View on GitHub</span>
              </a>
            )}
            {proj.live && (
              <a href={proj.live} target="_blank" rel="noreferrer" className="icon-link icon-link--live" title="Live Demo">
                <BsBoxArrowUpRight />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
        <p className="personal-card__desc">{proj.description}</p>
        <div className="personal-card__tags">
          {proj.tags.map((t) => (
            <span key={t} className="chip chip--gray">{t}</span>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
);

// ─── Certifications Tab ───────────────────────
const CertsTab = () => (
  <div className="tab-content">
    {certifications.map((cert, i) => (
      <motion.div
        key={cert.name}
        className="cert-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08 }}
      >
        <div className="cert-card__header">
          <span className="cert-card__emoji">{cert.emoji}</span>
          <h3 className="cert-card__name">{cert.name}</h3>
        </div>
        <div className="cert-card__row">
          <span className="cert-card__label">Issuing Organization:</span>
          <span className="cert-card__value">{cert.org}</span>
        </div>
        <div className="cert-card__row">
          <span className="cert-card__label">Credential ID:</span>
          <code className="cert-card__id">{cert.credentialId}</code>
        </div>
        <div className="cert-card__actions">
          <a href={cert.viewUrl} target="_blank" rel="noreferrer" className="cert-btn cert-btn--primary">
            View Certificate
          </a>
          <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="cert-btn cert-btn--secondary">
            Verify Credential
          </a>
        </div>
      </motion.div>
    ))}
  </div>
);

// ─── Blogs Tab (Coming Soon) ──────────────────
const BlogsTab = () => (
  <div className="tab-content tab-content--centered">
    <motion.div
      className="coming-soon"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <span className="coming-soon__icon">✍️</span>
      <h3 className="coming-soon__title">Blogs Coming Soon</h3>
      <p className="coming-soon__text">
        Writing about distributed systems, AI evaluation, and full-stack engineering.
        <br />
        Stay tuned — first post dropping soon.
      </p>
      <span className="coming-soon__badge">Coming Soon</span>
    </motion.div>
  </div>
);

// ─── Tab content map ──────────────────────────
const TAB_COMPONENTS = {
  history:    <WorkHistoryTab />,
  enterprise: <EnterpriseTab />,
  personal:   <PersonalTab />,
  certs:      <CertsTab />,
  blogs:      <BlogsTab />,
};

// ─── Main Work Component ──────────────────────
const Work = () => {
  const [activeTab, setActiveTab] = useState('history');

  return (
    <>
      <h2 className="head-text">My <span>Work</span></h2>

      {/* Tab bar */}
      <div className="work-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`work-tab ${activeTab === tab.id ? 'work-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="work-tab__icon">{tab.icon}</span>
            <span className="work-tab__label">{tab.label}</span>
            {tab.soon && <span className="work-tab__soon">Soon</span>}
          </button>
        ))}
      </div>

      {/* Tab panel */}
      <div className="work-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {TAB_COMPONENTS[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);
