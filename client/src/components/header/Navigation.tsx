import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAuthentication from "../../hooks/isAuthenticated";
import NotAuthenticated from "./authentication/notAuthenticated";

const Navigation: React.FC = () => {
  const { authenticated } = useAuthentication();
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const currentPath = currentLocation.pathname;
  const handleComposeClick = () => {
    if (authenticated) {
      navigate('/compose');
    } else {
      navigate(currentPath);
      toast.info("You need to Login First to access this page");
    }
  }

  return (
    <div className="flex items-center gap-5">
      <button onClick={handleComposeClick}>
        <NavLink
          to="/compose"
          className={` py-2 px-4 hover:bg-slate-600 hover:text-white border border-slate-600 rounded-md active:scale-90 duration-300`}
        >
          Compose
        </NavLink>
      </button>
      
      <NotAuthenticated />
    </div>
  );
};

export default Navigation;
