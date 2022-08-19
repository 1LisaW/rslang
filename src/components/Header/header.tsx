import React from 'react';
import './header.scss';
import Navbar from '../NavBar/navBar';
import Autorisation from '../Autorisation/autorisation';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="logo__container">
          <h1 className="logo__title">IngLang</h1>
        </div>
        <Navbar />
        <Autorisation />
      </div>
    </header>
  );
}

export default Header;
