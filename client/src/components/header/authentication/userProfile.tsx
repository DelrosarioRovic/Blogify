import React, { useState } from "react";
import UserProfileMenu from "./userProfileMenu";
import UserAvatar from "../../reusableComponent/userAvatar";
import useAuthentication from "../../../hooks/isAuthenticated"; {  }


const UserProfile: React.FC = () => {
  const { data } = useAuthentication();

  const [isProfileClick, setIsProfileClick] = useState<boolean>(false);
  return (
    <div className="rounded-full bg-slate-600">
      <div
        onClick={() => setIsProfileClick(!isProfileClick)}
        className={`h-[41.3px] w-[41.3px] rounded-full flex justify-center items-center overflow-hidden active:scale-[.9] duration-300
        ${isProfileClick ? "scale-[.9]" : ""}`}
      >
        <UserAvatar
          profilePicture={data?.profilePicture}
          displayName={data?.displayName}
        />
      </div>
      {/* return only true */}
      {isProfileClick && (
        <UserProfileMenu />
      )}
    </div>
  );
};

export default UserProfile;
