import React from "react";
import ApiCall from "../../../API/Api-call";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthentication from "../../../hooks/isAuthenticated";

const UserProfile: React.FC = () => {
  const { data, signOut } = useAuthentication();
  const SignOutApi = async () => {
    const response = await ApiCall("get", "http://localhost:4000/auth/sign-out");
    response.status === 200 && (
      toast.success("Successfully Sign Out"),
      signOut()
    );
    
  };

  return (
    <div className=" z-50 bg-white absolute top-[4rem] right-0 w-[15rem] max-sm:w-full p-2 rounded-md border-[0.5px] border-gray-200 shadow-xl text-sm">
      <p className=" text-gray-700 font-bold p-1 py-3">
        {data?.displayName}
      </p>
      <hr />
      <ul className="block opacity-80 text-gray-800">
        <li className="hover:bg-gray-200 duration-300 p-1 py-2 rounded-md mt-2">
          <a href="">Compose</a>
        </li>
        <li className="hover:bg-gray-200 duration-300 p-1 py-2 rounded-md">
          <a href="">My Profile</a>
        </li>
        <li className="hover:bg-gray-200 duration-300 p-1 py-2 rounded-md mb-2">
          <a href="">Profile Settings</a>
        </li>
        <hr />
        <li className="hover:bg-gray-200 duration-300 p-1 py-2 rounded-md font-semibold mt-3">
          <button onClick={SignOutApi}>Sign Out</button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
