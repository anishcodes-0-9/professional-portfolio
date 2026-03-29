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
          title={item}
        />
      ))}
    </div>
  );
};

export default NavigationDots;
