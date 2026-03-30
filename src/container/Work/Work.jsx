import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsGithub, BsBoxArrowUpRight } from 'react-icons/bs';
import { FaAws } from 'react-icons/fa';
import { SiCognizant, SiGithub, SiMacys } from 'react-icons/si';
import { AppWrap, MotionWrap } from '../../wrapper';
import {
  workHistory,
  enterpriseProjects,
  personalProjects,
  certifications,
} from '../../data/anishData';
import './Work.scss';

const BrandMark = ({ brand, label }) => {
  const marks = {
    alignerr: (
      <div className="brand-mark brand-mark--alignerr" aria-label={label} title={label}>
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M24 7.5 36.5 29H28l-4-6.9-4 6.9h-8.5L24 7.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M19.7 29h8.6L24 36.4 19.7 29Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M24 7.5h8.7L19.6 29h-8.1L24 7.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    claude: (
      <div className="brand-mark brand-mark--claude" aria-label={label} title={label}>
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g fill="currentColor">
            <circle cx="24" cy="12.5" r="4.2" />
            <circle cx="24" cy="35.5" r="4.2" />
            <circle cx="14.2" cy="18" r="4.2" />
            <circle cx="33.8" cy="18" r="4.2" />
            <circle cx="14.2" cy="30" r="4.2" />
            <circle cx="33.8" cy="30" r="4.2" />
          </g>
          <circle cx="24" cy="24" r="5.2" fill="#0f172a" />
        </svg>
      </div>
    ),
    cognizant: (
      <div className="brand-mark brand-mark--cognizant" aria-label={label} title={label}>
        <SiCognizant />
      </div>
    ),
    directv: (
      <div className="brand-mark brand-mark--directv" aria-label={label} title={label}>
        <span className="brand-mark__directv">D</span>
      </div>
    ),
    payments: (
      <div className="brand-mark brand-mark--payments" aria-label={label} title={label}>
        <span className="brand-mark__card" />
      </div>
    ),
    macys: (
      <div className="brand-mark brand-mark--macys" aria-label={label} title={label}>
        <SiMacys />
      </div>
    ),
    aws: (
      <div className="brand-mark brand-mark--aws" aria-label={label} title={label}>
        <FaAws />
      </div>
    ),
    github: (
      <div className="brand-mark brand-mark--github" aria-label={label} title={label}>
        <SiGithub />
      </div>
    ),
  };

  return marks[brand] ?? <span>{label?.slice(0, 1)}</span>;
};

const TABS = [
  { id: 'history', label: 'Work History', icon: '🏢' },
  { id: 'enterprise', label: 'Enterprise Projects', icon: '⚡' },
  { id: 'personal', label: 'Personal Projects', icon: '🛠️' },
  { id: 'certs', label: 'Certifications', icon: '🏆' },
  { id: 'blogs', label: 'Blogs', icon: '✍️', soon: true },
];

const WorkHistoryTab = () => (
  <div className="tab-content">
    {workHistory.map((job, i) => (
      <motion.div
        key={`${job.company}-${job.role}`}
        className="history-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08 }}
      >
        <div className="history-card__header">
          <div className="history-card__logo">
            <BrandMark brand={job.logoKey} label={job.company} />
          </div>
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
          <span className="enterprise-card__emoji">
            <BrandMark brand={proj.logoKey} label={proj.title} />
          </span>
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

const PersonalTab = () => (
  <div className="tab-content">
    <p className="tab-content__subtitle">
      Some things I&apos;ve built while experimenting with systems, AI, and interactive interfaces.
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
          <span className="cert-card__emoji">
            <BrandMark brand={cert.logoKey} label={cert.name} />
          </span>
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

const TAB_COMPONENTS = {
  history: <WorkHistoryTab />,
  enterprise: <EnterpriseTab />,
  personal: <PersonalTab />,
  certs: <CertsTab />,
  blogs: <BlogsTab />,
};

const Work = () => {
  const [activeTab, setActiveTab] = useState('history');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialTab = params.get('tab');

    if (initialTab && TABS.some((tab) => tab.id === initialTab)) {
      setActiveTab(initialTab);
    }

    const handleTabRequest = (event) => {
      const requestedTab = event.detail?.tab;

      if (requestedTab && TABS.some((tab) => tab.id === requestedTab)) {
        setActiveTab(requestedTab);
        const nextUrl = `${window.location.pathname}?tab=${requestedTab}#work`;
        window.history.replaceState(null, '', nextUrl);
      }
    };

    window.addEventListener('portfolio:open-work-tab', handleTabRequest);

    return () => window.removeEventListener('portfolio:open-work-tab', handleTabRequest);
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);

    if (tabId === 'history') {
      window.history.replaceState(null, '', `${window.location.pathname}#work`);
      return;
    }

    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}?tab=${tabId}#work`,
    );
  };

  return (
    <>
      <h2 className="head-text">My <span>Work</span></h2>

      <div className="work-tabs">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={`work-tab ${activeTab === tab.id ? 'work-tab--active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className="work-tab__icon">{tab.icon}</span>
            <span className="work-tab__label">{tab.label}</span>
            {tab.soon && <span className="work-tab__soon">Soon</span>}
          </button>
        ))}
      </div>

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
