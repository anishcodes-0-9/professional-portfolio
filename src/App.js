import React, { useLayoutEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import {
  About, Footer, Header, Skills, Work, Chatbot,
} from './container';
import { Navbar } from './components';
import useLenis from './hooks/useLenis';
import './App.scss';

const App = () => {
  useLenis();

  useLayoutEffect(() => {
    const { pathname, hash, search } = window.location;

    if (hash || search) {
      window.history.replaceState(null, '', pathname);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <Navbar />
        <Header />
        <About />
        <Work />
        <Skills />
        <Footer />
        <Chatbot />
      </div>
    </MotionConfig>
  );
};

export default App;
