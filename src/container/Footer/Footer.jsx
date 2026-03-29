import React, { useState } from 'react';
import { BsGithub, BsLinkedin, BsEnvelope } from 'react-icons/bs';
import { AppWrap, MotionWrap } from '../../wrapper';
import { personalInfo } from '../../data/anishData';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);

    try {
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="head-text">
        Let&apos;s <span>Connect</span>
      </h2>
      <p className="footer__subtitle">
        Open to full-time roles, freelance projects, and interesting conversations.
      </p>

      <div className="footer__content">
        <div className="footer__links">
          <a href={`mailto:${personalInfo.email}`} className="footer__link-card">
            <BsEnvelope />
            <div>
              <span className="link-label">Email</span>
              <span className="link-value">{personalInfo.email}</span>
            </div>
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="footer__link-card">
            <BsLinkedin />
            <div>
              <span className="link-label">LinkedIn</span>
              <span className="link-value">anish-krishnan</span>
            </div>
          </a>
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="footer__link-card">
            <BsGithub />
            <div>
              <span className="link-label">GitHub</span>
              <span className="link-value">AnishKrishnan73</span>
            </div>
          </a>
        </div>

        <div className="footer__form">
          {!submitted ? (
            <>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="form-input form-textarea"
              />
              <button
                type="button"
                className="form-submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </>
          ) : (
            <div className="form-success">
              <span>🎉</span>
              <h3>Message sent! I&apos;ll get back to you soon.</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg',
);
