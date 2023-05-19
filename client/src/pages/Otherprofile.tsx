import React from "react";
import ProfileLayOut from "../components/reusableComponent/profileLayout";
import seeProfile from "../hooks/see-user-profile";
import UserPost from "../hooks/user-post";

const OtherProfile:React.FC = () => {
    UserPost();
    const { OtherUserData } = seeProfile();

    return (
      <ProfileLayOut 
        size="w-full h-full"
        textSize={true}
        displayName={OtherUserData?.displayName}
        profilePicture={OtherUserData?.profilePicture}
      />
    )
}

export default OtherProfile;