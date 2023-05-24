import CrudMenu from "../components/posteduser/crudMenu";
import Like from "./like";
import Comment from "./comment";
import UserComment from "../components/posteduser/usercomment/UserComment";
import UserAvatar from "./userAvatar";
import { Link } from "react-router-dom";
import { PostObj } from "../interface/hook/PostObj";
import useAuthentication from "../hooks/isAuthenticated";

import ProfileCard from "./profileCard";
import { useState } from "react";

interface SinglePostCardProps extends PostObj {
    post: PostObj;
}

const SinglePostCard = (props: SinglePostCardProps) => {
    const { data, authenticated } = useAuthentication();
    const [isHoverProfile, setIsHoverProfile] = useState<boolean>(false);

    const handleHover = () => {
      setIsHoverProfile(!isHoverProfile);
    }

    return (
            <>
                <div className="flex justify-between">
                    <div className="flex gap-6">
                        <UserAvatar
                            profilePicture={props.profilePicture}
                            displayName={props.displayName}
                            size="w-11 h-11"
                        />
                        <div>
                            <div className="font-semibold hover:text-blue-900">
                                <Link 
                                    to={`/profile/${props.userId}`}
                                    className="relative"
                                    onMouseEnter={handleHover}
                                    onMouseLeave={handleHover}
                                >
                                    {props.displayName}
                                    {isHoverProfile && (
                                    <ProfileCard 
                                        id={props.userId}
                                        displayName={props.displayName}
                                        bio={props.bio}
                                        avatar={
                                            <UserAvatar
                                                profilePicture={props.profilePicture}
                                                displayName={props.displayName}
                                                size="w-11 h-11"
                                            /> } 
                                        /> )}
                                </Link>
                            </div>
                            <p className="font-thin text-[.75rem] text-gray-600">
                                <span className="font-[400] text-[.75rem text-gray-500">
                                Posted on {props.date}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Like Like={props.numLikes} type="like-post" likes={props.likes} />
                        <Comment numComments={props.numComments} />
                        {/* crudPost */}
                        { 
                            authenticated && props.userId === data?._id && 
                            <CrudMenu 
                            toEdit={`/compose/${props._id}`}
                            data={props.post} 
                            toShare="" 
                            type="post" 
                            /> 
                        }
                    </div>
                </div>
                <div className="my-6">
                    <h1 className="text-[2rem] font-extrabold">
                        {props.title}
                    </h1>
                    <div>
                        <p>{props.content}</p>
                    </div>
                </div>
                {props.picture && 
                    <div className="mb-12">
                        <img src={props.picture} className="w-full object-cover object-center" />
                    </div>
                }
                <UserComment id="comment" numComments={props.numComments} />
            </>
            
    )
}

export default SinglePostCard;