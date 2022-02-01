import React from "react";
import { user, catalog, cart } from "../../Images";
import "./navbar.css";

const NavBar = () => {
  return (
    <div id="navbar">
      <img className="nav-icon" src={catalog} alt="catalog" />
      <img className="nav-icon" src={user} alt="account" />
      <img className="nav-icon" src={cart} alt="cart" />
    </div>
  );
};

export default NavBar;
