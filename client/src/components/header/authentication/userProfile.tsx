import React, { useState } from "react";
import UserProfileMenu from "./userProfileMenu";
export interface UserAccountInfo {
  _id: string;
  email: string;
  displayName: string;
  profilePicture: string | null;
}

interface UserAccountInfoProps {
  user: UserAccountInfo;
  setIsLogin: (value: boolean) => void;
}

const UserProfile: React.FC<UserAccountInfoProps> = (props) => {
  const [isProfileClick, setIsProfileClick] = useState<boolean>(false);

  
  return (
    <div className="rounded-full bg-blue-500">
      <div
        onClick={()=>setIsProfileClick(!isProfileClick)}
        className={`h-[41.3px] w-[41.3px] rounded-full flex justify-center items-center overflow-hidden active:scale-[.9] duration-300
        ${isProfileClick ? "scale-[.9]" : ""}`}
      >
        {props.user.profilePicture ? (
          <img src={props.user.profilePicture} />
        ) : (
          <p className="text-white">
            {props.user.displayName.charAt(0).toUpperCase()}
          </p>
        )}
      </div>
      {/* return only true */}
      {isProfileClick && <UserProfileMenu setIsLogin={props.setIsLogin} user={props.user} />}
    </div>
  );
};

export default UserProfile;
