import React from "react";
import Navigation from "./Navigation";
import { NavLink } from "react-router-dom";

interface headerProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const Header: React.FC<headerProps> = (props) => {
  return (
    <header className="fixed w-full right-0 top-0 mx-auto border-b bg-white z-[1000]">
    <nav className="flex justify-between items-center relative max-w-4xl mx-auto h-20">
      <div className="logo-wrapper flex">
        <NavLink to="/" className="text-2xl">
          <span className="font-medium text-blue-500">B</span>
          <span className="">logi</span>
          <span className="italic">.fy</span>
        </NavLink>
      </div>
      <Navigation 
      isLogin={props.isLogin}
      setIsLogin={props.setIsLogin}
      />
    </nav>
    </header>

  );
};

export default Header;
