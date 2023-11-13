import React from "react";
import "./Navbar.css";

export interface NavbarProps {
  items?: Array<any>;
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  return (
    <div className="navbar">
      <ul className="navbar-list">
        {items?.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Navbar;
