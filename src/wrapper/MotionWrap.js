import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from './variants';

const MotionWrap = (Component, classNames) => function HOC() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`${classNames} app__flex`}
    >
      <Component />
    </motion.div>
  );
};

export default MotionWrap;
