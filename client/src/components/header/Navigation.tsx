import React from "react";
import NotAuthenticated from "./authentication/notAuthenticated";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <div className="flex items-center gap-x-12">
      <NavLink
        to="/compose"
        className={` py-2 px-4 hover:bg-slate-600 hover:text-white border border-slate-600 rounded-md active:scale-90 duration-300`}
      >
        Compose
      </NavLink>
      <NotAuthenticated />
    </div>
  );
};

export default Navigation;
