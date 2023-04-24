import React from "react";
import NotAuthenticated from "./authentication/notAuthenticated";
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface navigationProps {
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
}

const Navigation: React.FC<navigationProps> = (props) => {
  
  return (
    <div className="flex items-center gap-x-12">
      <NavLink
        onClick={()=>{!props.isLogin && toast.error("You need to Login First to access this page")}}
        to="/compose"
        className={` py-2 px-4 hover:bg-slate-600 hover:text-white border border-slate-600 rounded-md active:scale-90 duration-300`}
      >
        Compose
      </NavLink>
      <NotAuthenticated 
      isLogin={props.isLogin}
      setIsLogin={props.setIsLogin}
      />
    </div>
  );
};

export default Navigation;
