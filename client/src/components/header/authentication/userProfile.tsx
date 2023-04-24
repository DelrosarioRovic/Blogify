import React, { useState } from "react";
import UserProfileMenu from "./userProfileMenu";
import UserAvatar from "../../reusableComponent/userAvatar";

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
    <div className="rounded-full bg-slate-600">
      <div
        onClick={() => setIsProfileClick(!isProfileClick)}
        className={`h-[41.3px] w-[41.3px] rounded-full flex justify-center items-center overflow-hidden active:scale-[.9] duration-300
        ${isProfileClick ? "scale-[.9]" : ""}`}
      >
        <UserAvatar
          profilePicture={props.user.profilePicture}
          displayName={props.user.displayName}
        />
      </div>
      {/* return only true */}
      {isProfileClick && (
        <UserProfileMenu setIsLogin={props.setIsLogin} user={props.user} />
      )}
    </div>
  );
};

export default UserProfile;
