import React from 'react';
import logo from '../images/Logo.png';
import image1 from '../images/Question.png'; // Import other images as needed
import image2 from '../images/Search.png';

const Navbar = () => {
  return (
    <div className="navbar" style={{ backgroundColor: '#001529', color: 'white' }}>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="other-images">
        <img src={image1} alt="Image 1" />
        <img src={image2} alt="Image 2" />
      </div>
    </div>
  );
};

export default Navbar;
