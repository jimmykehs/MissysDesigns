import React from "react";
import { Link } from "react-router-dom";
import { home, cart } from "../../Images";
import "./navbar.css";

const NavBar = ({ navContent }) => {
  return (
    <div id="navbar">
      <Link to={navContent.navTextLink}>
        <h1 id="logo">{navContent.navText}</h1>
      </Link>
      <div id="nav-icons-container">
        {navContent.navHome && (
          <Link to="/">
            <img className="nav-icon" src={home} alt="account" />
          </Link>
        )}
        {navContent.navCart && (
          <Link to="/cart">
            <img className="nav-icon" src={cart} alt="cart" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
