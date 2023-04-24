import React, {useState} from "react";
import ApiCall from "../../../API/Api-call";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface registerForm {
  isLoginForm: boolean;
  setIsLoginForm: (value: boolean) => void;
  checkStatus: () => void;
}

const Register: React.FC<registerForm> = (props) => {

  const [eMail, setEmail] = useState<string>('');
  const [passWord, setPassword] = useState<string>('');
  const [displayName, setDisplayName] =useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await ApiCall('post', 'http://localhost:3000/auth/register', {email: eMail, password: passWord, displayName: displayName});
      if (result.registerSuccess) {
        toast.success(result.message);
        props.checkStatus();
        //clear input
        setEmail("")
        setPassword("")
        setDisplayName("")
      } else {
        toast.warning(result.response.data.message);
      }
    } catch (error) {
      // handle error
    }
  };

  return (
    <div
      className="w-1/2 duration-300 px-3"
    >
      <form  onSubmit={handleSubmit} className="flex flex-col text-gray-500">
        <label htmlFor="displayName">Display Name</label>
        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="bg-gray-300 py-2 px-1 rounded-sm text-gray-500 text-sm" required/>
        <label htmlFor="E-mail">E-mail</label>
        <input type="email" value={eMail} onChange={(e) => setEmail(e.target.value)} className="bg-gray-300 py-2 px-1 rounded-sm text-gray-500 text-sm" required/>
        <label htmlFor="Password">Password</label>
        <input type="password" value={passWord} onChange={(e) => setPassword(e.target.value)} className="bg-gray-300 py-2 px-1 rounded-sm text-gray-500 text-sm" required/>
        <button
          type="submit"
          className="bg-violet-700 text-white mt-2 py-2 rounded-sm"
        >
          Sign Up
        </button>
      </form>
      <p className="text-xs text-gray-500">
        Already Have an account?
        <button className="text-blue-500" onClick={props.checkStatus}>
          Login
        </button>
      </p>
    </div>
  );
};


export default Register;
