import React, { useState } from "react";
import ApiCall from "../../../API/Api-call";
import { UserAccountInfo } from "./userProfile";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserProfileProps {
    user: UserAccountInfo;
    setIsLogin: (value: boolean) => void;
}
const UserProfile:React.FC<UserProfileProps> = (props) => {
  
    const SignOutApi = async () => {
        await ApiCall("get", "http://localhost:3000/auth/sign-out");
        toast.success("Successfully Sign Out");
        props.setIsLogin(false);
    }

    return (
        <div className="absolute -bottom-[160px] w-[11rem] right-0 p-2 rounded-md border-[0.5px] border-gray-200 shadow-xl text-sm">
            <span className="px-1 text-gray-700 font-bold">
                {props.user.displayName}
            </span> 
            <span className="h-[0.5px] w-full bg-gray-300 block"></span>
            <ul className="block opacity-80 text-gray-800">
                <li className="hover:bg-gray-200 duration-300 p-1">
                    <a href="">Compose</a>
                </li>
                <li className="hover:bg-gray-200 duration-300 p-1">
                    <a href="">My Profile</a>
                </li>
                <li className="hover:bg-gray-200 duration-300 p-1">
                    <a href="">Profile Settings</a>
                </li>
                <span className="h-[0.5px] w-full bg-gray-300 block"></span>
                <li className="hover:bg-gray-200 duration-300 p-1">
                    <button onClick={SignOutApi}>Sign Out</button>
                </li>
            </ul>
        </div>
    )
}

export default UserProfile;