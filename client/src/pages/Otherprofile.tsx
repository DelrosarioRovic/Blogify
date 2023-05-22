import React, { useEffect } from "react";
import ProfileLayOut from "../reusableComponent/profileLayout";
import seeProfile from "../hooks/see-user-profile";

const OtherProfile:React.FC = () => {
    const { OtherUserData } = seeProfile();

    return (
      <ProfileLayOut 
        size="w-full h-full"
        textSize={true}
        displayName={OtherUserData?.displayName}
        profilePicture={OtherUserData?.profilePicture}
        bio={OtherUserData?.bio}
        type="OtherProfile"
      />
    )
}

export default OtherProfile;