import UserAvatar from "./userAvatar";
import { ProfilePictureProps } from "../../interface/props/profilePictureProps";
import { PostObj } from "../../interface/hook/PostObj";
import PostCard from "./postCards";

interface profileLayOutProps extends ProfilePictureProps {
    userProps: PostObj[]; 
}

const ProfileLayOut = (props: profileLayOutProps) => {

    console.log(props.userProps);
    return (
        <div className="absolute inset-0 top-[12.5%]">
            <div className="bg-slate-950 h-1/4 w-full relative">
                <div className="max-w-4xl mx-auto relative h-full">
                    <div className="rounded-full bg-white w-36 h-36 absolute -bottom-[45%] left-1/2 transform -translate-x-1/2 flex justify-center items-center p-2">
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
            {/* <div className="flex flex-col justify-center font-bold mt-10">
                <h2 className="text-3xl">Post</h2>
                {props.userProps.map((item, index) => (
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
                ))}
            </div> */}
        </div>
    )
}

export default ProfileLayOut;