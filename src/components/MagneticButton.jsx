import React, { useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const prefersReducedMotion = () => (
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

// Deliberately used only on the two primary hero CTAs, not every button —
// magnetic pull reads as premium exactly because it isn't everywhere.
const MagneticButton = ({
  as = 'button', className, children, strength = 0.3, ...props
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });
  const MotionTag = useMemo(() => motion(as), [as]);

  const handleMouseMove = (event) => {
    if (prefersReducedMotion() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // eslint-disable-next-line react/jsx-props-no-spreading -- generic forwarding wrapper
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export default MagneticButton;
