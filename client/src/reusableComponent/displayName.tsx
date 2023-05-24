import { Link } from "react-router-dom";
import useAuthentication from "../hooks/isAuthenticated";
import { useState } from "react";
import ProfileCard from "./profileCard";
import UserAvatar from "./userAvatar";
import { ProfilePictureProps } from "../interface/props/profilePictureProps";

interface displayNameProps extends ProfilePictureProps{
    userId: string;
    displayName: string;
    bio: string;
}

const displayName = (props: displayNameProps) => {
    const { data } = useAuthentication();
    const [isHoverProfile, setIsHoverProfile] = useState<boolean>(false);

    const handleHover = () => {
      setIsHoverProfile(!isHoverProfile);
    }

    return (
        <Link
            onClick={()=>window.scrollTo({ top: 0 })}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            to={data?._id === props.userId ? '/profile' : `/profile/${props.userId}`} className="z-10 relative">{props.displayName} 
            {isHoverProfile && (<ProfileCard 
                id={props.userId}
                avatar={<UserAvatar
                profilePicture={props.profilePicture}
                displayName={props.displayName}
                size={props.size}
            /> } 
                displayName={props.displayName} bio={props.bio}/> )}
        </Link>
    )
}

export default displayName;