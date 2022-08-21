import React from 'react';
import './navBar.scss';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li key="main">
          <Link to="/">Main</Link>
        </li>
        <li key="tutorial">
          <Link to="tutorial">Tutorial</Link>
        </li>
        <li key="audiocall">
          <Link to="audiocall">Audiocall</Link>
        </li>
        <li key="sprint">
          <Link to="sprint">Sprint</Link>
        </li>
        <li key="statistic">
          <Link to="statistic">Statistic</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
