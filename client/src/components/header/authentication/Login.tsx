import React, { useState } from "react";
import ApiCall from "../../../API/Api-call";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
interface loginForm {
  isLoginForm: boolean;
  setIsLoginForm: (value: boolean) => void;
  checkStatus: () => void;
  setIsLogin: (value: boolean) => void;
  ifShowAuthForm: () => void;
}

const Login: React.FC<loginForm> = (props) => {
  const [eMail, setEmail] = useState<string>("");
  const [passWord, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await ApiCall("post", "http://localhost:3000/auth/login", {
        email: eMail,
        password: passWord,
      })
      
      // handle success
      if (result.user) {
        toast.success(result.message);
        console.log(result.message);
        props.setIsLogin(true);
        props.ifShowAuthForm();
        //clear input
        setEmail("")
        setPassword("")
      } else {
        toast.warning(result.response.data.message);
        console.log(result.response.data.message);
      }
    } catch (err) {}
  };

  return (
    <>
    <div
      className={`w-1/2 duration-300 px-3 gap-y-1 ${
        props.isLoginForm ? "-ml-[50%]" : "ml-0"
      }`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col text-gray-500">
        <label htmlFor="email-input">E-mail</label>
        <input
          type="email"
          id="email-input"
          value={eMail}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-300 py-2 px-1 rounded-sm text-gray-500 text-sm"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={passWord}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-300 py-2 px-1 rounded-sm text-gray-500 text-sm"
        />
        <button
          type="submit"
          className="bg-violet-700 text-white mt-2 py-2 rounded-sm"
        >
          LOGIN
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-2">
        Don't Have an Account?
        <button className="text-blue-500" onClick={props.checkStatus}>
          {" "}
          Register
        </button>
      </p>
    </div>
    </>
  );
};

export default Login;
