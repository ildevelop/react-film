import React from "react";
import { NavLink } from "react-router-dom";
import './header.scss'
const Header = () => {
  return (
    <div className="menu">
      <NavLink
        exact to="/"
        activeStyle={{backgroundColor: "#007bff", color: "#fff", height: "40px"}}>
        Home
      </NavLink>
      <NavLink
        to="/MyFavorites"
        activeStyle={{backgroundColor: "#007bff", color: "#fff", height: "40px"}}>
        My Favorites
      </NavLink>
    </div>
  );
};

export default Header;