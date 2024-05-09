import React from 'react';
import './index.css'; // Import your CSS file for styling
import { Sidebar } from './components/Sidebar';
import ConcentForm from './components/ConcentForm';
import ButtonComponent from './components/ButtonComponent';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';

const Layout = () => {
  return (
    <div className="container">
      <div className="content-sidebar">
            <Sidebar/>     
        <div className="content">
                <ConcentForm/>
                <ButtonComponent/>
                <Section1/>
                <Section2/>
                <Section3/>
                <Section4/>
        </div>
      </div>
      <div className="footer">Footer</div>
    </div>
  );
};

export default Layout;
