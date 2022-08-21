import React from 'react';
import icon from '../../assets/icons/login-icon.png';
import './athorization.scss';

function Athorization() {
  return (
    <div className="athorization__container">
      <img className="athorization-icon" src={icon} alt="login-icon" />
    </div>
  );
}

export default Athorization;
