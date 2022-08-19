import React from 'react';
import icon from '../../assets/icons/login-icon.png';
import './autorisation.scss';

function Autorisation() {
  return (
    <div className="autorisation__container">
      <img className="autorisation-icon" src={icon} alt="login-icon" />
    </div>
  );
}

export default Autorisation;
