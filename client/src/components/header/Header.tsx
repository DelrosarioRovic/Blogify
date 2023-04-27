import React from "react";
import Navigation from "./Navigation";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="fixed w-full right-0 top-0 mx-auto border-b bg-white z-[1000] max-lg:px-6">
    <nav className="flex justify-between items-center relative max-w-4xl mx-auto h-20">
      <div className="logo-wrapper flex">
        <NavLink to="/" className="text-2xl bg-blue-100 p-2 rounded-md">
          <span className="font-medium text-blue-700">B</span>
          <span className="">logi</span>
          <span className="italic text-gray-500">.fy</span>
        </NavLink>
      </div>
      <Navigation />
    </nav>
    </header>

  );
};

export default Header;
