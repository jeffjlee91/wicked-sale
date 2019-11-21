import React from 'react';

function Header(props) {
  return (
    <nav className="navbar navbar-light bg-dark fix-position-top justify-content-between">
      <a className="navbar-brand text-white" href='localhost:3000'>
        <i className="fas fa-dollar-sign"></i>
        {' '} Wicked Sales
      </a>
      <div className='navbar-brand text-white'>{props.cartItemCount} Item{itemMultiple(props)} {' '}
        <i className="fas fa-shopping-cart"></i>
      </div>
    </nav>
  );
}

function itemMultiple(props) {
  if (props.cartItemCount === 0 || props.cartItemCount > 1) {
    return 's';
  }
}

export default Header;
