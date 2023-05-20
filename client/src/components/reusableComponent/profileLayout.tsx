import UserAvatar from "./userAvatar";
import { ProfilePictureProps } from "../../interface/props/profilePictureProps";
import { PostObj } from "../../interface/hook/PostObj";
import PostCard from "./postCards";
import UserPost from "../../hooks/user-post";
import skeletonPosts from "./skeleton-posts";

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
                        <UserAvatar 
                            displayName={props.displayName}
                            profilePicture={props.profilePicture}
                            size={props.size}
                            textSize={props.textSize}
                         />
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto flex justify-center mt-16">
                <div className="flex flex-col items-center justify-center py-4 w-full gap-y-2">
                    <h2 className="text-3xl font-bold">{props.displayName}</h2>
                    <p>This is a default Bio.</p>
                    <p>Post</p>
                </div>
            </div> 
                <div className="flex flex-col justify-center font-bold mt-10">
                    <h2 className="text-3xl text-center">Post</h2>
                    {loading ? skeletonPosts :realPosts}
                </div>
        </div>
    )
}

export default ProfileLayOut;