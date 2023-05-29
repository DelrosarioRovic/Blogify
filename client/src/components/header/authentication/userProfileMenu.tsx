import React from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import useAuthentication from "../../../hooks/isAuthenticated";
import NavigateNavLink from "../NavLink";

//interface
import { NavLinkProps } from "../../../interface/props/NavLinkProps";
interface userProfileMenu extends NavLinkProps{
  displayName? : string;
}

const UserProfile: React.FC<userProfileMenu> = (props) => {
  const navigate = useNavigate();
  const { signOut, data} = useAuthentication();
  const SignOutApi = () => {
    try {
      signOut();
      toast.success("Successfully Sign Out");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" z-50 bg-white absolute top-[4rem] right-0 w-[15rem] max-sm:w-full p-2 rounded-md border-[0.5px] border-gray-200 shadow-xl text-sm">
      <p className=" text-gray-700 font-bold p-1 py-3">
        {props.displayName}
      </p>
      <hr />
      <ul className="block opacity-80 text-gray-800 py-1">
        <li className="hover:bg-gray-200 duration-300 p-1 py-2 rounded-md">
          <NavigateNavLink link={props.link} />
        </li>
        <li className="hover:bg-gray-200 duration-300 p-1  rounded-md">
          <Link to={"/profile"} className="w-full h-full block py-1">My Profile</Link>
        </li>
        <li className="hover:bg-gray-200 duration-300 p-1 rounded-md mb-1">
          <Link to={"/profile/settings"} state={data} className="w-full h-full block py-1">Profile Settings</Link>
        </li>
        <hr />
        <li className="hover:bg-gray-200 duration-300 px-1 rounded-md font-semibold mt-1">
          <button onClick={SignOutApi} className="w-full h-full block text-left py-2">Sign Out</button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
