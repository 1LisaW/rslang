import React from 'react';
import './navBar.scss';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item" key="main">
          <Link to="/">MAIN</Link>
        </li>
        <li className="navbar__item" key="tutorial">
          <Link to="tutorial">TUTORIAL</Link>
        </li>
        <li className="navbar__item" key="audiocall">
          <Link to="audiocall">AUDIOCALL</Link>
        </li>
        <li className="navbar__item" key="sprint">
          <Link to="sprint">SPRINT</Link>
        </li>
        <li className="navbar__item" key="statistic">
          <Link to="statistic">STATISTIC</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
