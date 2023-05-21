import React from "react";
// interface props
import { ProfilePictureProps } from "../interface/props/profilePictureProps";

const userAvatar: React.FC<ProfilePictureProps> = (props) => {
  const { profilePicture, displayName, size, textSize } = props;

  return (
    <div className={`rounded-full bg-blue-500 flex justify-center items-center overflow-hidden
      ${size}  
    `}>
      {profilePicture ? (
        <img src={profilePicture} />
      ) : (
        <p className={`text-white ${textSize ? "text-7xl" : "text-base"}`}>
          {displayName?.charAt(0).toUpperCase() ?? ''}
        </p>
      )}
    </div>
  );
};

export default userAvatar;
