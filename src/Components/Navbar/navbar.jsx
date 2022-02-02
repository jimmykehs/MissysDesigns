import React from "react";
import { Link } from "react-router-dom";
import { user, catalog, cart } from "../../Images";
import "./navbar.css";

const NavBar = () => {
  return (
    <div id="navbar">
      <Link to="/">
        <h1 id="logo">Missy's Designs</h1>
      </Link>
      <div id="nav-icons-container">
        <Link to="/account">
          <img className="nav-icon" src={user} alt="account" />
        </Link>
        <Link to="/cart">
          <img className="nav-icon" src={cart} alt="cart" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
