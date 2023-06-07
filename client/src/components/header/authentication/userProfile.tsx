import React, { useState } from "react";
import UserProfileMenu from "./userProfileMenu";
import UserAvatar from "../../../reusableComponent/userAvatar";
import useAuthentication from "../../../hooks/isAuthenticated"; 
import { NavLink } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { data } = useAuthentication();

  const [isProfileClick, setIsProfileClick] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setIsProfileClick(!isProfileClick)}
        className={`h-11 w-11 rounded-full flex justify-center items-center overflow-hidden active:scale-[.9] duration-300 cursor-pointer
        ${isProfileClick ? "scale-[.9]" : ""}`}
      >
        <UserAvatar
          profilePicture={data?.profilePicture}
          displayName={data?.displayName}
          size="w-11 h-11"
        />
      </div>
      {/* return only true */}
      {isProfileClick && (
        <UserProfileMenu displayName={data?.displayName} link={<NavLink to={"/compose"}>Compose</NavLink>}/>
      )}
    </>
  );
};

export default UserProfile;
