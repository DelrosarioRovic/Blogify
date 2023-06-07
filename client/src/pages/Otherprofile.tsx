import React from "react";
import ProfileLayOut from "../reusableComponent/profileLayout";
import seeProfile from "../hooks/see-user-profile";

const OtherProfile:React.FC = () => {
    const { OtherUserData } = seeProfile();
 
    return (
      <ProfileLayOut 
        id={OtherUserData?._id}
        size="w-full h-full"
        textSize={true}
        displayName={OtherUserData?.displayName}
        profilePicture={OtherUserData?.profilePicture}
        bio={OtherUserData?.bio}
        following={OtherUserData?.followed}
        type="OtherProfile"
      />
    )
}

export default OtherProfile;