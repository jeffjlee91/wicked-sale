import React from 'react';

function Header() {
  return (
    <nav className="navbar navbar-light bg-dark">
      <a className="navbar-brand text-white" href='localhost:3000'>
        <i className="fas fa-dollar-sign"></i>
        {' '} Wicked Sales
      </a>
    </nav>
  );
}

export default Header;
