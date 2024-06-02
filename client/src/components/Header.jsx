import React from 'react';
import ObsCoinLogo from '../assets/obscoin-logo.png';

const Header = () => {
  return (
    <div className='header'>
      <h1>OBSCOIN</h1>
      <p className='slogan'>Spinning transactions, smart moves.</p>

      <img
        src={ObsCoinLogo}
        className='logo'
        alt='ObsCoin logo'
      />
    </div>
  );
};
export default Header;
