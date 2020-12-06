import React from 'react';
import Menu from './Menu';
import logo from '../../assets/img/logo.png';
import './Home.css';

const Home = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} alt="logo" style={{ width: '200px' }} />
        <span style={{ paddingBottom: '30px', color: '#d4af37' }}>
          Serverless Bank
        </span>
        <Menu />
        <a
          href="https://github.com/amirelemam/demo-bank-webapp"
          className="source-code"
        >
          Source code
        </a>
      </header>
    </div>
  );
};

export default Home;
