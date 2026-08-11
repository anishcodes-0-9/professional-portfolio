import React from 'react';
import { motion, useTransform } from 'framer-motion';

// A real flex sibling of the pinned stage's main area, not an absolutely
// positioned overlay — its height is genuinely reserved from the stage's
// 100vh, so content above it can never grow into the same pixels. Shared
// by the project carousels and the experience story so both pinned
// sequences report progress identically.
const SectionProgress = ({
  count,
  totalSteps,
  virtualPosition,
  activeIndex,
  label,
}) => {
  const fillScale = useTransform(virtualPosition, (value) => Math.min(1, Math.max(0, value / totalSteps)));

  const tickSize = `${100 / Math.max(count, 1)}% 100%`;

  return (
    <div className="work__progress" aria-hidden="true">
      {label && <span className="work__progress-label mono">{label}</span>}

      <div className="work__progress-index mono">
        <span className="work__progress-current">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>

        <span className="work__progress-sep">/</span>

        <span className="work__progress-total">
          {String(count).padStart(2, '0')}
        </span>
      </div>

      <div
        className="work__progress-track"
        style={{
          backgroundSize: tickSize,
        }}
      >
        <motion.div
          className="work__progress-fill"
          style={{
            scaleX: fillScale,
            backgroundSize: tickSize,
          }}
        />
      </div>

      <div className="work__progress-signal">
        {Array.from({ length: count }, (_, index) => (
          <span
            key={index}
            className={`work__progress-dot ${
              index === activeIndex ? 'is-active' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionProgress;
