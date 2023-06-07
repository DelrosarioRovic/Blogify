import React, { useState } from "react";
import axios from "axios";
import ApiCall from "../../../API/Api-call";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthentication from "../../../hooks/isAuthenticated";
// props interface
import { loginForm } from "../../../interface/props/login&RegFormProps";


const Login: React.FC<loginForm> = (props) => {
  const { signIn } =useAuthentication();
  const [eMail, setEmail] = useState<string>("");
  const [passWord, setPassword] = useState<string>("");
  const [promiseLogin, setPromiseLogin] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPromiseLogin(true);
    try {
      const response = await axios.post("https://blogify-api-server.vercel.app/auth/login", {
        email: eMail,
        password: passWord,
      })
      // handle success
      console.log(response.status);
      if (response.status === 200) {
        const token = response.data.token;
        
        // Store the token in local storage or a cookie
        localStorage.setItem('token', token);
        toast.success(response.data.message);
        signIn();
        props.ifShowAuthForm();
        //clear input
        setEmail("");
        setPassword("");
      } else {
        toast.warning(response.data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setPromiseLogin(false);
    }
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
          className={`bg-violet-700 text-white mt-2 py-2 rounded-sm duration-300 ${promiseLogin && "opacity-50"}`}
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
