import React, { useState } from 'react';
import { BsGithub, BsLinkedin, BsEnvelope } from 'react-icons/bs';
import { AppWrap, MotionWrap } from '../../wrapper';
import { personalInfo } from '../../data/anishData';
import './Footer.scss';

const FORMSPREE_FORM_ID = process.env.REACT_APP_FORMSPREE_FORM_ID;
const HAS_FORMSPREE = Boolean(
  FORMSPREE_FORM_ID && FORMSPREE_FORM_ID !== 'YOUR_FORM_ID',
);

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
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });

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
      <h2 className="head-text">
        Let&apos;s <span>Connect</span>
      </h2>
      <p className="footer__subtitle">
        Open to full-time roles, freelance projects, and interesting
        conversations.
      </p>

      <div className="footer__links">
        <a href={`mailto:${personalInfo.email}`} className="footer__link-card">
          <BsEnvelope />
          <div>
            <span className="link-label">Email</span>
            <span className="link-value">{personalInfo.email}</span>
          </div>
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noreferrer"
          className="footer__link-card"
        >
          <BsLinkedin />
          <div>
            <span className="link-label">LinkedIn</span>
            <span className="link-value">Anish Krishnan</span>
          </div>
        </a>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noreferrer"
          className="footer__link-card"
        >
          <BsGithub />
          <div>
            <span className="link-label">GitHub</span>
            <span className="link-value">anishcodes-0-9</span>
          </div>
        </a>
      </div>

      <div className="footer__form-wrapper">
        {!submitted ? (
          <div className="footer__form">
            <div className="form__row">
              <div className="form__field">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form__field">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form__field form__field--full">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="footer__submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message →'}
            </button>
          </div>
        ) : (
          <div className="footer__success">
            <span>🎉</span>
            <h3>
              {submissionMode === 'form'
                ? "Message sent! I'll get back to you soon."
                : 'Your email draft is ready to send.'}
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg',
);
