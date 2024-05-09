import React, { useState } from 'react';

const ButtonComponent = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (scrollValue) => {
    setActiveButton(scrollValue);
    // Scroll to the specified position
    window.scrollTo({ top: scrollValue, behavior: 'smooth' });
  };

  return (
    <div className='another-rectangle'>
      <div className='button-container'>
        <button className={`button ${activeButton === 0 ? 'active' : ''}`} onClick={() => handleClick(0)}>Section 1</button>
        <button className={`button ${activeButton === 1 ? 'active' : ''}`} onClick={() => handleClick(1200)}>Section 2</button>
        <button className={`button ${activeButton === 2 ? 'active' : ''}`} onClick={() => handleClick(2200)}>Section 3</button>
        <button className={`button ${activeButton === 3 ? 'active' : ''}`} onClick={() => handleClick(3200)}>Section 4</button>
      </div>
      <div className="line"></div>
    </div>
  );
}

export default ButtonComponent;
