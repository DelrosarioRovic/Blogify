import React from "react"
import ProfileLayOut from "../components/reusableComponent/profileLayout";
import useAuthentication from "../hooks/isAuthenticated";

const Profile:React.FC = () => {
    const { authenticated, data } = useAuthentication();

    return (
        <ProfileLayOut 
            displayName={data?.displayName}
            profilePicture={data?.profilePicture}
            size="w-full h-full"
            textSize={true}
        />
    )
}

export default Profile;