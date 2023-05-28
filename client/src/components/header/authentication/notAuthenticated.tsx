import React, { useState } from "react";
import { GoSignIn } from 'react-icons/go';
import AuthenticationForm from "./authenticationForm";
import UserProfile from "./userProfile";
import useAuthentication from "../../../hooks/isAuthenticated";


const NotAuthenticated: React.FC = () => {
  const { authenticated, data } = useAuthentication();
  const [isAuthenticationFormShow, setIsAuthenticationFormShow] = useState(false);

  const ifShowAuthForm = () => {
    setIsAuthenticationFormShow(!isAuthenticationFormShow);
  };
  
  return (
    <div className="flex">
      {authenticated ? (
        <UserProfile />
      ) : (
        <>
          <button className="bg-blue-500 rounded-full p-3 w-11 h-11" onClick={ifShowAuthForm}>
            <GoSignIn size={18} color="white" />
          </button>
          <AuthenticationForm
            isAuthenticationFormShow={isAuthenticationFormShow}
            ifShowAuthForm={ifShowAuthForm}
          />
        </>
      )}
    </div>
  );
};

export default NotAuthenticated;
