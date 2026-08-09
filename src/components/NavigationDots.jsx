import React from 'react';

const NavigationDots = ({ active }) => {
  const sections = ['home', 'about', 'work', 'skills', 'contact'];

  return (
    <div className="app__navigation">
      {sections.map((item) => (
        <a
          href={`#${item}`}
          key={item}
          className={`app__navigation-dot ${active === item ? 'app__navigation-dot--active' : ''}`}
          aria-label={`Navigate to ${item} section`}
          aria-current={active === item ? 'true' : undefined}
        >
          <span className="app__navigation-dot-tooltip">{item}</span>
        </a>
      ))}
    </div>
  );
};

export default NavigationDots;
