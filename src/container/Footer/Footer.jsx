import React, { useState } from "react";
import { motion } from "framer-motion";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { AppWrap, MotionWrap } from "../../wrapper";
import { personalInfo } from "../../data/anishData";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    // Replace with your preferred form submission (Formspree, EmailJS, etc.)
    const mailtoLink = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoLink);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <>
      <h2 className="head-text">
        Let's <span>Connect</span>
      </h2>
      <p className="footer__subtitle">
        Open to full-time roles, freelance projects, and interesting
        conversations.
      </p>

      <div className="footer__links">
        <a href={`mailto:${personalInfo.email}`} className="footer__link-card">
          <HiMail />
          <span>{personalInfo.email}</span>
        </a>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noreferrer"
          className="footer__link-card"
        >
          <BsGithub />
          <span>github.com/anishcodes-0-9</span>
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noreferrer"
          className="footer__link-card"
        >
          <BsLinkedin />
          <span>linkedin.com/in/anishkrishnan09/</span>
        </a>
      </div>

      {!isSubmitted ? (
        <div className="app__footer-form">
          <h3 className="footer__form-title">Drop a message</h3>
          <div className="form__row">
            <div className="app__flex form__field">
              <input
                className="p-text"
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="app__flex form__field">
              <input
                className="p-text"
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="app__flex form__field">
            <textarea
              className="p-text"
              placeholder="Your message..."
              value={formData.message}
              name="message"
              onChange={handleChange}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="footer__submit-btn"
            onClick={handleSubmit}
          >
            {loading ? "Sending..." : "Send Message →"}
          </motion.button>
        </div>
      ) : (
        <motion.div
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          className="footer__success"
        >
          <span>✅</span>
          <h3>Thanks for reaching out! I'll get back to you soon.</h3>
        </motion.div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg",
);
