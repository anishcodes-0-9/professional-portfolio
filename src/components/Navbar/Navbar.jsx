import React, { useState, useEffect } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import './Navbar.scss';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['home', 'about', 'work', 'skills', 'contact'];

  return (
    <nav className={`app__navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="app__navbar-logo">
        <a href="#home" className="logo-text">
          AK<span className="logo-dot">.</span>
        </a>
      </div>

      <ul className="app__navbar-links">
        {navLinks.map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      <a
        href="/Anish_Krishnan_Resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="app__navbar-resume"
      >
        Resume ↗
      </a>

      <div className="app__navbar-menu">
        <button
          type="button"
          className="app__navbar-menu-button"
          onClick={() => setToggle(true)}
          aria-label="Open navigation menu"
          aria-expanded={toggle}
          aria-controls="mobile-navigation"
        >
          <HiMenuAlt4 />
        </button>
        {toggle && (
          <motion.div
            id="mobile-navigation"
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <button
              type="button"
              className="app__navbar-close"
              onClick={() => setToggle(false)}
              aria-label="Close navigation menu"
            >
              <HiX />
            </button>
            <ul>
              {navLinks.map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/Anish_Krishnan_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setToggle(false)}
                >
                  resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
