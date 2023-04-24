import React from "react";
import Navigation from "./Navigation";
import { NavLink } from "react-router-dom";

interface headerProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const Header: React.FC<headerProps> = (props) => {
  return (
    <nav className="flex justify-between items-center h-[5rem] relative">
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
  );
};

export default Header;
