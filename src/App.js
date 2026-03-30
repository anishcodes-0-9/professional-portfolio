import React from 'react';
import { About, Footer, Header, Skills, Work, Chatbot } from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => (
  <div className='app'>
    <Navbar />
    <Header />
    <About />
    <Work />
    <Skills />
    <Footer />
    <Chatbot />
  </div>
);

export default App;
