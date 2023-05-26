import React from "react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlineGoogle,
} from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

const ThirdPartyAuth: React.FC = () => {
  const googleSigIn = async () => {
    window.open("https://blogify-api-server.vercel.app/auth/google", "_self");
  };

  const gitHubSigIn = () => {
    window.open("https://blogify-api-server.vercel.app/auth/github", "_self");
  };

  return (
    <>
      <div className="text-white text-sm flex flex-col gap-y-2 px-3">
        <button
          onClick={googleSigIn}
          className="bg-red-600 p-2 rounded-md flex justify-center flex-row gap-x-2 items-center hover:shadow-lg hover:transition-shadow hover:shadow-red-300 duration-300"
        >
          <AiOutlineGoogle size={"24"} />
          <span>Continue In with Google</span>
        </button>
        <button className="bg-blue-500 p-2 rounded-md flex justify-center flex-row gap-x-2 items-center hover:shadow-lg hover:transition-shadow hover:shadow-blue-300 duration-300">
          <AiOutlineTwitter size={"24"} />
          <span>Continue In with Twitter</span>
        </button>
        <button
          onClick={gitHubSigIn}
          className="bg-gray-950 p-2 rounded-md flex justify-center flex-row gap-x-2 items-center hover:shadow-lg hover:transition-shadow hover:shadow-gray-400 duration-300"
        >
          <AiFillGithub size={"24"} />
          <span>Continue In with Github</span>
        </button>
      </div>
    </>
  );
};

export default ThirdPartyAuth;
