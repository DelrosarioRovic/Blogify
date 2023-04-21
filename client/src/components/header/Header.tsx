import React from "react";
import Navigation from "./Navigation";
import { NavLink } from "react-router-dom";
const Header: React.FC = () => {
  return (
    <nav className="flex justify-between items-center h-[5rem] relative">
      <div className="logo-wrapper flex">
        <NavLink to="/" className="text-2xl">
          <span className="font-medium text-blue-500">B</span>
          <span className="">logi</span>
          <span className="italic">.fy</span>
        </NavLink>
      </div>
      <Navigation />
    </nav>
  );
};

export default Header;
