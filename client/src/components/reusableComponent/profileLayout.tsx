import UserAvatar from "./userAvatar";
import { ProfilePictureProps } from "../../interface/props/profilePictureProps";
import { PostObj } from "../../interface/hook/PostObj";
import PostCard from "./postCards";
import UserPost from "../../hooks/user-post";
import skeletonPosts from "../../skeleton/skeleton-posts";
import Skeleton from "react-loading-skeleton";
import { CgNotes } from 'react-icons/cg';

interface profileLayOutProps extends ProfilePictureProps {
    userProps: PostObj[]; 
}

const ProfileLayOut = (props: profileLayOutProps) => {
    const { loading } = UserPost();

    const realPosts = props.userProps.map((item, index) => (
        <PostCard 
            key={index}
            _id={item._id}
            title={item.title}
            content={item.content}
            date={item.date}
            displayName={item.displayName}
            likes={item.likes}
            numComments={item.numComments}
            numLikes={item.numLikes}
            picture={item.picture}
            profilePicture={item.profilePicture}
            userId={item.userId}
        />
    ));

    return (
        <div className="">
            <div className="after:bg-slate-950 after:absolute after:inset-0 after:w-full after:h-2/5 
                w-full h-[28vh] flex flex-col">
                <div className="relative w-full h-full z-10">
                    <div className="bg-white w-40 h-40 rounded-full absolute left-1/2 transform -translate-x-1/2 -bottom-[35%] p-2">
                        {loading ? <Skeleton circle={true} width={"100%"} height={"100%"}/> : (
                            <UserAvatar 
                                displayName={props.displayName}
                                profilePicture={props.profilePicture}
                                size={props.size}
                                textSize={props.textSize}
                            />
                        )}
                        
                    </div>
                </div>
            </div>
            <div className="max-w-4xl w-full mx-auto flex justify-center border-gray-300 border rounded-sm bg-white pt-16 shadow-md">
                <div className="flex flex-col items-center justify-center py-4 w-full gap-y-2">
                    <h2 className="text-3xl font-bold">{props.displayName}</h2>
                    <p>{loading ? <Skeleton width={"10rem"}/> : "This is a default Bio."} </p>
                    <div>
                        {loading ? (
                            <Skeleton width={"7rem"} />
                        ) : (
                            <div className="flex gap-x-1">
                                <CgNotes size={20} />
                                {props.userProps.length} posts published
                            </div>
                        )}
                    </div>
                </div>
            </div> 
                <div className="flex flex-col justify-center mt-10 gap-y-10">
                    <h2 className="text-3xl text-center font-bold">Published Post{props.userProps.length > 1 && "s"}</h2>
                    {loading ? skeletonPosts :realPosts}
                </div>
        </div>
    )
}

export default ProfileLayOut;