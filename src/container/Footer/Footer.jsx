import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, ArrowUpRight, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { AppWrap, MotionWrap } from '../../wrapper';
import { fadeUp, staggerContainer, viewportOnce } from '../../wrapper/variants';
import { personalInfo } from '../../data/anishData';
import './Footer.scss';

const FORMSPREE_FORM_ID = process.env.REACT_APP_FORMSPREE_FORM_ID;
const HAS_FORMSPREE = Boolean(
  FORMSPREE_FORM_ID && FORMSPREE_FORM_ID !== 'YOUR_FORM_ID',
);

const NAV_LINKS = ['home', 'about', 'work', 'skills'];

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissionMode, setSubmissionMode] = useState('form');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openMailClient = () => {
    const subject = encodeURIComponent(
      `Portfolio inquiry from ${formData.name}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        '',
        formData.message,
      ].join('\n'),
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);

    try {
      if (HAS_FORMSPREE) {
        const response = await fetch(
          `https://formspree.io/f/${FORMSPREE_FORM_ID}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(formData),
          },
        );

        if (!response.ok) {
          throw new Error('Form submission failed');
        }

        setSubmissionMode('form');
      } else {
        openMailClient();
        setSubmissionMode('mailto');
      }

      setSubmitted(true);
    } catch {
      openMailClient();
      setSubmissionMode('mailto');
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <span className="section-eyebrow">Contact</span>
      <h2 className="head-text">
        Let&apos;s <span>Connect</span>
      </h2>
      <p className="footer__subtitle">
        Open to full-time roles, freelance work, and conversations about hard
        engineering problems.
      </p>

      <motion.div
        className="footer__links"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.a
          href={`mailto:${personalInfo.email}`}
          className="footer__link-card"
          variants={fadeUp}
        >
          <Mail size={19} strokeWidth={1.75} />
          <div>
            <span className="link-label">Email</span>
            <span className="link-value">{personalInfo.email}</span>
          </div>
        </motion.a>
        <motion.a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noreferrer"
          className="footer__link-card"
          variants={fadeUp}
        >
          <FaLinkedin size={19} />
          <div>
            <span className="link-label">LinkedIn</span>
            <span className="link-value">Anish Krishnan</span>
          </div>
        </motion.a>
        <motion.a
          href={personalInfo.github}
          target="_blank"
          rel="noreferrer"
          className="footer__link-card"
          variants={fadeUp}
        >
          <FaGithub size={19} />
          <div>
            <span className="link-label">GitHub</span>
            <span className="link-value">anishcodes-0-9</span>
          </div>
        </motion.a>
      </motion.div>

      <div className="footer__form-wrapper">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              className="footer__form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="form__row">
                <div className="form__field">
                  <label htmlFor="contact-name">
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder=" "
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <span>Your Name</span>
                  </label>
                </div>
                <div className="form__field">
                  <label htmlFor="contact-email">
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <span>Your Email</span>
                  </label>
                </div>
              </div>
              <div className="form__field form__field--full">
                <label htmlFor="contact-message">
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder=" "
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <span>Your Message</span>
                </label>
              </div>
              <button
                type="button"
                className="footer__submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="footer__success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <CheckCircle2 size={40} strokeWidth={1.5} />
              <h3>
                {submissionMode === 'form'
                  ? "Message sent — I'll get back to you soon."
                  : 'Your email draft is ready to send.'}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="site-footer">
        <div className="site-footer__row">
          <a href="#home" className="site-footer__logo">
            AK<span>.</span>
          </a>

          <nav className="site-footer__nav" aria-label="Footer">
            {NAV_LINKS.map((item) => (
              <a key={item} href={`#${item}`}>
                {item}
              </a>
            ))}
            <a
              href="/Anish_Krishnan_Resumè.pdf"
              target="_blank"
              rel="noreferrer"
              className="site-footer__resume"
            >
              Resume
              <ArrowUpRight size={13} strokeWidth={2.25} />
            </a>
          </nav>

          <div className="site-footer__socials">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub size={17} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={17} />
            </a>
          </div>
        </div>

        <div className="site-footer__row site-footer__row--bottom">
          <p>© 2026 Anish Krishnan. All rights reserved.</p>
          <a href="#home" className="site-footer__top">
            Back to top
            <ArrowUp size={13} strokeWidth={2.25} />
          </a>
        </div>
      </footer>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg',
);
