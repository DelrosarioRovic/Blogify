import React from "react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlineGoogle,
} from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThirdPartyAuth: React.FC = () => {
  const googleSigIn = () => {
      window.open("http://localhost:3000/auth/google", "_self");
  }

  const gitHubSigIn = () => {
    window.open("http://localhost:3000/auth/github", "_self");
  }

  return (
    <>
      <div className="text-white text-sm flex flex-col gap-y-2 px-3">
        <button onClick={googleSigIn} className="bg-red-600 p-2 rounded-md flex flex-row gap-x-2 items-center">
          <AiOutlineGoogle size={"24"} />
          <span>
            Continue In with Google
          </span>
        </button>
        <button className="bg-blue-500 p-2 rounded-md flex flex-row gap-x-2 items-center">
          <AiOutlineTwitter size={"24"} />
          <span>
          Continue In with Google
          </span>
        </button>
        <button onClick={gitHubSigIn} className="bg-gray-950 p-2 rounded-md flex flex-row gap-x-2 items-center">
          <AiFillGithub size={"24"} />
          <span>
          Continue In with Github
          </span>
        </button>
      </div>
    </>
  );
};

export default ThirdPartyAuth;
