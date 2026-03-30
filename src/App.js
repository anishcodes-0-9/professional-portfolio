import React, { useLayoutEffect } from 'react';
import { About, Footer, Header, Skills, Work, Chatbot } from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => {
  useLayoutEffect(() => {
    const { pathname, hash, search } = window.location;

    if (hash || search) {
      window.history.replaceState(null, '', pathname);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
