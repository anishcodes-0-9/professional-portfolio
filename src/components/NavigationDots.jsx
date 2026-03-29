import React from 'react';

const NavigationDots = ({ active }) => {
  const sections = ['home', 'about', 'work', 'skills', 'contact'];

  return (
    <div className="app__navigation">
      {sections.map((item) => (
        <a
          href={`#${item}`}
          key={item}
          className="app__navigation-dot"
          style={active === item ? { backgroundColor: '#3b82f6' } : {}}
          aria-label={`Navigate to ${item} section`}
        >
          <span className="sr-only">{item}</span>
        </a>
      ))}
    </div>
  );
};

export default NavigationDots;
