import React from "react";
// interface props
import { ProfilePictureProps } from "../../interface/props/profilePictureProps";

const userAvatar: React.FC<ProfilePictureProps> = (props) => {
  const { profilePicture, displayName } = props;

  return (
    <div className="rounded-full bg-blue-500 flex justify-center items-center w-11 h-11 overflow-hidden">
      {profilePicture ? (
        <img src={profilePicture} />
      ) : (
        <p className="text-white">
          {displayName?.charAt(0).toUpperCase() ?? ''}
        </p>
      )}
    </div>
  );
};

export default userAvatar;
