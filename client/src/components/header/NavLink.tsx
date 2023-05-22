import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAuthentication from "../../hooks/isAuthenticated";
import { NavLinkProps } from "../../interface/props/NavLinkProps";

const NavigateNavLink:React.FC<NavLinkProps> = (props) => {
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
        <span className="cursor-pointer" onClick={handleComposeClick}>
            {props.link}
        </span>
    )
}

export default NavigateNavLink;