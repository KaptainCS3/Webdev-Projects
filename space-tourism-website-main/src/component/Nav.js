import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/shared/logo.svg'
const Nav = () => {
  return (
    <header>
    <nav className="nav">
      <div className="logo">
        <img src={logo} alt="image-logo" className="img__logo" />
      </div>
      <div className="container__nav">
        <div className="border__nav"></div>
        <ul className="nav__bar">
          <Link to="/" className="route__links">
            <span>0 0</span>Home
          </Link>
          <Link to="/Destination" className="route__links">
            <span>0 1</span>Destination
          </Link>
          <Link to="/Crew" className="route__links">
            <span>0 2</span>Crew
          </Link>
          <Link to="/Technology" className="route__links">
            <span>0 3</span>Technology
          </Link>
        </ul>
      </div>
    </nav>
    </header>
  );
}

export default Nav