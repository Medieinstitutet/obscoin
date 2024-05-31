import React from 'react';
import ObsCoinLogo from '../assets/obscoin-logo.png';

// TODO create issue and change branch to it
const Header = () => {
  return (
    <div className='header'>
      <h1>OBSCOIN</h1>
      <p>Sligan here, about our very good coin</p>

      <img
        src={ObsCoinLogo}
        className='logo'
        alt='ObsCoin logo'
      />
    </div>
  );
};
export default Header;
