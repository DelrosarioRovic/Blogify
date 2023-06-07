import React, { useEffect } from "react"
import ProfileLayOut from "../reusableComponent/profileLayout";
import useAuthentication from "../hooks/isAuthenticated";

const Profile:React.FC = () => {
    const { data } = useAuthentication();

    return (
        <ProfileLayOut 
            displayName={data?.displayName}
            profilePicture={data?.profilePicture}
            size="w-full h-full"
            textSize={true}
            type="profile"
            state={data}
        />
    )
}

export default Profile;