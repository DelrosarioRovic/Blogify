import React from "react";

export interface ProfilePictureProps {
  profilePicture?: string | null;
  displayName?: string;
}

const userAvatar: React.FC<ProfilePictureProps> = (props) => {
  const { profilePicture, displayName } = props;

  return (
    <>
      {profilePicture ? (
        <img src={profilePicture} />
      ) : (
        <p className="text-white">
          {displayName?.charAt(0).toUpperCase() ?? ''}
        </p>
      )}
    </>
  );
};

export default userAvatar;