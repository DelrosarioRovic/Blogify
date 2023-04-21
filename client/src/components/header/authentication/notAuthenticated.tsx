import React, { useState, useEffect } from "react";
import { GoSignIn } from 'react-icons/go';
import AuthenticationForm from "./authenticationForm";
import UserProfile, { UserAccountInfo } from "./userProfile";
import ApiCall from "../../../API/Api-call";


const notAuthenticated: React.FC = () => {
  const [isAuthenticationFormShow, setIsAuthenticationFormShow] = useState<boolean>(false);
  const [isLogin, setIsLogIn] = useState<boolean>(false);
  const [user,setUser] = useState<UserAccountInfo>({
    _id: '',
    email: '',
    displayName: '',
    profilePicture: '',
  });
  

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await ApiCall("GET", "http://localhost:3000/user");
        if (res.user) {
          let id = "";
          if (res.user._id) {
            id = res.user._id;
          }
          if (res.user.googleId) {
            id = res.user.googleId;
          }
          setUser({
            _id: id,
            email: res.user.username,
            displayName: res.user.displayName,
            profilePicture:res.user.profilePicture
          });
          setIsLogIn(true);
        } else {}
      } catch (error) {}
    };

    checkAuth();
  }, [isLogin]);


  const ifShowAuthForm = (): void => {
    setIsAuthenticationFormShow(!isAuthenticationFormShow);
  };


  return (
    <div className="flex">
      {isLogin ? (
          <UserProfile
          setIsLogin={setIsLogIn}
          user={user}
          />
      ) : (
        <>
          <button className="bg-blue-500 rounded-full p-3" onClick={ifShowAuthForm}>
          <GoSignIn size={18} color="white" />
          </button>
          <AuthenticationForm
            isAuthenticationFormShow={isAuthenticationFormShow}
            ifShowAuthForm={ifShowAuthForm}
            setIsLogIn={setIsLogIn}
          />
        </>
      )}
    </div>

  );
};

export default notAuthenticated;
