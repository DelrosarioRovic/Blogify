import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ThirdPartyAuth from "./third-party-auth";
// props interface
import { authenticationForm } from "../../../interface/props/authenticationFormProps";

const AuthenticationForm: React.FC<authenticationForm> = (props) => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(false);
  const checkStatus = (): void => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    //WANTS TO ADD ONCLICK WHICH IS IF I CLICK THIS DIV IT WILL RETURN FALSE BUT IF I CLICK THE DIV INSIDE THIS CONTAINER
    <div
      className={`fixed right-0 top-0 w-[100%] min-h-[100vh] flex justify-center items-center bg-gray-500 bg-opacity-40 backdrop-blur-sm  
    ${props.isAuthenticationFormShow ? "!opacity-100 !z-[100]" : "!opacity-0 !-z-[100] !scale-0"}
    `}
      onClick={props.ifShowAuthForm}
    >
      <div
        className={`w-[360px] flex flex-col py-3 gap-y-3 overflow-hidden bg-white rounded-md duration-300 shadow-lg
        ${
          props.isAuthenticationFormShow
            ? "relative inset-0"
            : "relative -top-full opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <ThirdPartyAuth />
        <div className="flex flex-row items-center text-center gap-x-2 px-3">
          <span className="w-3/6 h-0.5 bg-gray-950"></span>
          <span className="text-sm font-semibold">OR</span>
          <span className="w-3/6 h-0.5 bg-gray-950"></span>
        </div>
        <div
          className={`flex flex-row w-[200%] ${
            isLoginForm ? "h-[19.5rem]" : "h-[12rem]"
          }`}
        >
          <Login
            isLoginForm={isLoginForm}
            setIsLoginForm={setIsLoginForm}
            checkStatus={checkStatus}
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
