import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { AppWrap, MotionWrap } from '../../wrapper';
import { fadeUp, staggerContainer, viewportOnce } from '../../wrapper/variants';
import { testimonials } from '../../data/anishData';
import './Testimonials.scss';

const Testimonials = () => (
  <>
    <span className="section-eyebrow">Recommendations</span>
    <h2 className="head-text">
      Kind <span>Words</span>
    </h2>

    <motion.div
      className="testimonials__grid"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {testimonials.map((item) => (
        <motion.figure
          key={item.name}
          className="testimonial-card gradient-border"
          variants={fadeUp}
        >
          <Quote className="testimonial-card__mark" aria-hidden="true" />
          <blockquote className="testimonial-card__quote">
            {item.quote}
          </blockquote>
          <figcaption className="testimonial-card__author">
            <span className="testimonial-card__avatar" aria-hidden="true">{item.initials}</span>
            <div>
              <span className="testimonial-card__name">{item.name}</span>
              <span className="testimonial-card__role">{item.role}</span>
            </div>
          </figcaption>
        </motion.figure>
      ))}
    </motion.div>
  </>
);

export default AppWrap(
  MotionWrap(Testimonials, 'app__testimonials'),
  'testimonials',
  'app__tintbg',
);
