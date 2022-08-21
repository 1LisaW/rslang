import React from 'react';
import Navbar from '../NavBar/navBar';
import Authorization from '../Authorization/authorization';
import './header.scss';

function Header() {
  return (
    <header className="header">
      <div className="logo__container">
        <h1 className="logo__title">IngLang</h1>
      </div>
      <Navbar />
      <Authorization />
    </header>
  );
}

export default Header;
