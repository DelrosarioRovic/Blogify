import React from "react"
import ProfileLayOut from "../components/reusableComponent/profileLayout";
import useAuthentication from "../hooks/isAuthenticated";
import UserPost from "../hooks/user-post";


const Profile:React.FC = () => {
    const { data } = useAuthentication();
    UserPost();

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