import React from "react";

export interface ProfilePictureProps {
  profilePicture: string | null;
  displayName: string;
}

const userAvatar: React.FC<ProfilePictureProps> = (props) => {
  return (
    <>
      {props.profilePicture ? (
        <img src={props.profilePicture} />
      ) : (
        <p className="text-white">
          {props.displayName.charAt(0).toUpperCase()}
        </p>
      )}
    </>
  );
};

export default userAvatar;
