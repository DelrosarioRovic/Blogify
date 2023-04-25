import React, { useState, useEffect } from "react";
import { GoSignIn } from 'react-icons/go';
import AuthenticationForm from "./authenticationForm";
import UserProfile, { UserAccountInfo } from "./userProfile";
import ApiCall from "../../../API/Api-call";

interface NotAuthenticatedProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const NotAuthenticated: React.FC<NotAuthenticatedProps> = (props) => {
  const [isAuthenticationFormShow, setIsAuthenticationFormShow] = useState(false);
  const [user, setUser] = useState<UserAccountInfo>({
    _id: '',
    email: '',
    displayName: '',
    profilePicture: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await ApiCall("GET", "http://localhost:3000/route/user");
        if (res.status === 200) {
          const { user } = res.data;
          const id = user._id || user.googleId || '';
          setUser({
            _id: id,
            email: user.username,
            displayName: user.displayName,
            profilePicture: user.profilePicture,
          });
          props.setIsLogin(true);
        } 
      } catch (error) {console.log(error)}
    };
    checkAuth();
  }, [props.isLogin]);

  const ifShowAuthForm = () => {
    setIsAuthenticationFormShow(!isAuthenticationFormShow);
  };

  return (
    <div className="flex">
      {props.isLogin ? (
        <UserProfile setIsLogin={props.setIsLogin} user={user} />
      ) : (
        <>
          <button className="bg-blue-500 rounded-full p-3" onClick={ifShowAuthForm}>
            <GoSignIn size={18} color="white" />
          </button>
          <AuthenticationForm
            isAuthenticationFormShow={isAuthenticationFormShow}
            ifShowAuthForm={ifShowAuthForm}
            setIsLogIn={props.setIsLogin}
          />
        </>
      )}
    </div>
  );
};

export default NotAuthenticated;
