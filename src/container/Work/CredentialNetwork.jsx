import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import {
  EASE_OUT, fadeUp, scaleIn, viewportOnce,
} from '../../wrapper/variants';

import { certifications } from '../../data/anishData';
import BrandMark from '../../components/shared/BrandMark';

/* -------------------------------------------------------------------------- */
/* Node geometry — one shared 0-100 percentage space so the SVG connector     */
/* lines and the real HTML node buttons can never drift apart.                */
/* -------------------------------------------------------------------------- */

const getNodePosition = (index, count, radiusPct = 38) => {
  const angle = ((index / count) * 360 - 90) * (Math.PI / 180);

  return {
    x: 50 + Math.cos(angle) * radiusPct,
    y: 50 + Math.sin(angle) * radiusPct,
  };
};

/* -------------------------------------------------------------------------- */
/* Credential Node — one connected, selectable credential                     */
/* -------------------------------------------------------------------------- */

const CredentialNode = ({
  cert, index, count, isActive, onSelect, onKeyDown, registerNode,
}) => {
  const { x, y } = getNodePosition(index, count);

  return (
    <motion.button
      type="button"
      ref={registerNode}
      variants={fadeUp}
      role="tab"
      id={`credential-tab-${index}`}
      aria-selected={isActive}
      aria-controls="credential-detail-panel"
      tabIndex={isActive ? 0 : -1}
      className={`credential__node ${isActive ? 'is-active' : ''}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        '--credential-accent': cert.color,
      }}
      onClick={() => onSelect(index)}
      onKeyDown={onKeyDown}
    >
      <span className="credential__node-index mono">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="credential__node-mark" aria-hidden="true">
        <BrandMark brand={cert.logoKey} label={cert.name} />
      </span>

      <span className="credential__node-name">{`${cert.name} — ${cert.org}`}</span>
    </motion.button>
  );
};

/* -------------------------------------------------------------------------- */
/* Credential Detail — supporting information for the selected credential     */
/* -------------------------------------------------------------------------- */

const CredentialDetail = ({ cert, index, reduceMotion }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={cert.credentialId}
      id="credential-detail-panel"
      role="tabpanel"
      aria-labelledby={`credential-tab-${index}`}
      className="credential__detail"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: EASE_OUT }}
    >
      <div className="credential__detail-eyebrow mono">
        <span>{String(index + 1).padStart(2, '0')}</span>

        <span className="credential__detail-eyebrow-sep">/</span>

        Selected Credential
      </div>

      <div className="credential__detail-brand">
        <span className="credential__detail-mark" aria-hidden="true">
          <BrandMark brand={cert.logoKey} label={cert.name} />
        </span>

        <div className="credential__detail-heading">
          <h3 className="credential__detail-name">{cert.name}</h3>

          <span className="credential__detail-org mono">{cert.org}</span>
        </div>
      </div>

      <div className="credential__detail-id">
        <span className="credential__detail-id-label mono">Credential ID</span>

        <span className="credential__detail-id-value mono">{cert.credentialId}</span>
      </div>

      <div className="credential__detail-actions">
        <a
          href={cert.viewUrl}
          target="_blank"
          rel="noreferrer"
          className="credential__detail-link mono"
        >
          View Certificate
          <ArrowUpRight size={13} strokeWidth={2.25} />
        </a>

        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noreferrer"
            className="credential__detail-link credential__detail-link--verify mono"
          >
            Verify Credential
            <ArrowUpRight size={13} strokeWidth={2.25} />
          </a>
        )}
      </div>
    </motion.div>
  </AnimatePresence>
);

/* -------------------------------------------------------------------------- */
/* Credential Network — the core + connected nodes + detail panel             */
/* -------------------------------------------------------------------------- */

const CredentialNetwork = ({ reduceMotion }) => {
  const count = certifications.length;

  const [activeIndex, setActiveIndex] = useState(0);

  const networkRef = useRef(null);
  const nodeRefs = useRef([]);

  const handleSelect = (index) => setActiveIndex(index);

  const handleKeyDown = (event) => {
    let nextIndex = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (activeIndex + 1) % count;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (activeIndex - 1 + count) % count;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = count - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      setActiveIndex(nextIndex);
      nodeRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="credential__grid">
      <motion.div
        className="credential__network"
        ref={networkRef}
        viewport={viewportOnce}
        onViewportEnter={() => networkRef.current?.classList.add('is-live')}
      >
        <svg className="credential__wires" viewBox="0 0 100 100" aria-hidden="true">
          {certifications.map((cert, index) => {
            const { x, y } = getNodePosition(index, count);

            return (
              <line
                key={cert.credentialId}
                x1={50}
                y1={50}
                x2={x}
                y2={y}
                pathLength={1}
                vectorEffect="non-scaling-stroke"
                className={`credential__wire ${index === activeIndex ? 'is-active' : ''}`}
                style={{
                  transitionDelay: `${index * 60}ms`,
                }}
              />
            );
          })}
        </svg>

        <motion.div className="credential__core" variants={scaleIn}>
          <span className="credential__core-tick credential__core-tick--tl" aria-hidden="true" />
          <span className="credential__core-tick credential__core-tick--tr" aria-hidden="true" />
          <span className="credential__core-tick credential__core-tick--bl" aria-hidden="true" />
          <span className="credential__core-tick credential__core-tick--br" aria-hidden="true" />

          <span className="credential__core-count mono">
            {String(count).padStart(2, '0')}
          </span>

          <span className="credential__core-label mono">
            <span>Verified</span>
            <span>Credentials</span>
          </span>
        </motion.div>

        <div
          className="credential__nodes"
          role="tablist"
          aria-label="Certifications"
        >
          {certifications.map((cert, index) => (
            <CredentialNode
              key={cert.credentialId}
              cert={cert}
              index={index}
              count={count}
              isActive={index === activeIndex}
              onSelect={handleSelect}
              onKeyDown={handleKeyDown}
              registerNode={(element) => {
                nodeRefs.current[index] = element;
              }}
            />
          ))}
        </div>
      </motion.div>

      <CredentialDetail
        cert={certifications[activeIndex]}
        index={activeIndex}
        reduceMotion={reduceMotion}
      />
    </div>
  );
};

export default CredentialNetwork;
