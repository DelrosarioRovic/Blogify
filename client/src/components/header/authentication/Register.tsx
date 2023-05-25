import React, {useState} from "react";
import ApiCall from "../../../API/Api-call";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//interface props
import { registerForm } from "../../../interface/props/login&RegFormProps";
import { ImageUploader } from "../../../reusableComponent/uploadPicture";

const Register: React.FC<registerForm> = (props) => {

  const [eMail, setEmail] = useState<string>('');
  const [addPic, setAddPic] = useState<string>('');
  const [passWord, setPassword] = useState<string>('');
  const [displayName, setDisplayName] =useState<string>('');
  const [promiseRegister, setPromiseRegister] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPromiseRegister(true);
    try {
      const result:any = await ApiCall(
        'post', 
        'https://blogify-api-server.vercel.app/auth/register',
        {email: eMail, password: passWord, displayName: displayName, profilePicture :addPic && addPic});
      if (result.status === 200) {
        toast.success(result.data.message);
        props.checkStatus();
        //clear input
        setEmail("");
        setPassword("");
        setDisplayName("");
        setAddPic("");
      } else {
        toast.warning(result.data.message);
      }
    } catch (error) {
      console.log(error);
      // handle error
    } finally {
      setPromiseRegister(false);
    }
  };

  return (
    <div className="w-1/2 duration-300 px-3">
      <form  onSubmit={handleSubmit} className="flex flex-col text-gray-500">
        <label htmlFor="displayName">Display Name</label>
        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="bg-gray-300 py-2 px-1 rounded-sm text-gray-500 text-sm" required/>
        <label htmlFor="E-mail">E-mail</label>
        <input type="email" value={eMail} onChange={(e) => setEmail(e.target.value)} className="bg-gray-300 py-2 px-1 rounded-sm text-gray-500 text-sm" required/>
        <label htmlFor="Password">Password</label>
        <input type="password" value={passWord} onChange={(e) => setPassword(e.target.value)} className="bg-gray-300 py-2 px-1 rounded-sm text-gray-500 text-sm" required/>
        <div className="my-5">
          <ImageUploader buttonName="Upload Profile" setAddPic={setAddPic}/>
        </div>
        
        <button
          type="submit"
          className={`bg-violet-700 text-white py-2 rounded-sm 
          ${promiseRegister && "opacity-50"}`}>
          Sign Up
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-2">
        Already Have an account?
        <button className="text-blue-500" onClick={props.checkStatus}>
          Login
        </button>
      </p>
    </div>
  );
};


export default Register;
