import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.scss';

const NAV_LINKS = ['home', 'about', 'work', 'skills', 'contact'];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`app__navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="app__navbar-logo">
        <a href="#home" className="logo-text">
          AK<span className="logo-dot">.</span>
        </a>
      </div>

      <ul className="app__navbar-links">
        {NAV_LINKS.map((item) => (
          <li key={item} className={active === item ? 'is-active' : ''}>
            <a href={`#${item}`}>{item}</a>
            {active === item && (
              <motion.span
                layoutId="nav-active-pill"
                className="app__navbar-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </li>
        ))}
      </ul>

      <a
        href="/Anish_Krishnan_Resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="app__navbar-resume"
      >
        Resume
        <ArrowUpRight size={15} strokeWidth={2.25} />
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
          <Menu size={20} strokeWidth={2} />
        </button>
        <AnimatePresence>
          {toggle && (
            <motion.div
              id="mobile-navigation"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                className="app__navbar-close"
                onClick={() => setToggle(false)}
                aria-label="Close navigation menu"
              >
                <X size={22} strokeWidth={2} />
              </button>
              <ul>
                {NAV_LINKS.map((item) => (
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
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
