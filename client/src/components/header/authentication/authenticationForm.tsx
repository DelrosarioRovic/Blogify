import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ThirdPartyAuth from "./third-party-auth";

interface authenticationForm {
  isAuthenticationFormShow: boolean;
  setIsLogIn:   (value: boolean) => void;
  ifShowAuthForm: () => void;
}

const AuthenticationForm: React.FC<authenticationForm> = (props) => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(false);
  const checkStatus = (): void => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    //WANTS TO ADD ONCLICK WHICH IS IF I CLICK THIS DIV IT WILL RETURN FALSE BUT IF I CLICK THE DIV INSIDE THIS CONTAINER
    <div
      className={`flex justify-center items-center absolute text-sm inset-0 overflow-hidden w-full h-full bg-gray-500 bg-opacity-40 backdrop-blur-sm  
    ${props.isAuthenticationFormShow ? "opacity-100 z-50" : "opacity-0 -z-50"}
    `}
      onClick={props.ifShowAuthForm}
    >
      <div
        className={`w-80 flex flex-col py-3 gap-y-3 overflow-hidden bg-white rounded-sm duration-300
        ${props.isAuthenticationFormShow ? "relative inset-0" : "relative -top-full opacity-0"}`}
        onClick={(event) => event.stopPropagation()}
      >
        <ThirdPartyAuth />
        <div className="flex flex-row items-center text-center gap-x-2 px-3">
          <span className="w-3/6 h-0.5 bg-gray-950"></span>
          <span className="text-sm font-semibold">OR</span>
          <span className="w-3/6 h-0.5 bg-gray-950"></span>
        </div>
        <div className={`flex flex-row w-[200%] ${isLoginForm ? "h-[13rem]" : "h-[10rem]"}`}>
          <Login
            isLoginForm={isLoginForm}
            setIsLoginForm={setIsLoginForm}
            checkStatus={checkStatus}
            setIsLogin={props.setIsLogIn}
            ifShowAuthForm={props.ifShowAuthForm}
          />
          <Register
            isLoginForm={isLoginForm}
            setIsLoginForm={setIsLoginForm}
            checkStatus={checkStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthenticationForm;
