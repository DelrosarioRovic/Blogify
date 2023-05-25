import Skeleton from "react-loading-skeleton";
import { CgNotes } from 'react-icons/cg';
import InfiniteScroll from "react-infinite-scroll-component";
import { RiUserFollowLine } from "react-icons/ri";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

import UserAvatar from "./userAvatar";
import { ProfilePictureProps } from "../interface/props/profilePictureProps";
import PostCard from "./postCards";
import UserPost from "../hooks/user-post";
import skeletonPosts from "../skeleton/skeleton-posts";
import { AuthUserInfo } from "../interface/hook/AuthUserInfo";
import FollowBtn from "./follow-button";

interface ProfileLayOutProps extends ProfilePictureProps{
    type: string;
    //currentUser
    state?: AuthUserInfo | null;
    //otherUser
    following?: string[];
}

const ProfileLayOut = (props: ProfileLayOutProps) => {


    const { loading, fetchingPost, hasMore, userPost, totalPost } = UserPost();
    const realPosts = userPost.map((item, index) => (
        <PostCard 
            key={index}
            _id={item._id}
            title={item.title}
            content={item.content}
            date={item.date}
            displayName={item.displayName}
            bio={item.bio}
            likes={item.likes}
            numComments={item.numComments}
            numLikes={item.numLikes}
            picture={item.picture}
            profilePicture={item.profilePicture}
            userId={item.userId}
        />
    ));

    return (
        <div>
            <div className="after:bg-slate-950 after:absolute after:inset-0 after:w-full after:h-2/5 
                w-full h-[28vh] flex flex-col">
                <div className="relative w-full h-full z-10">
                    <div className="bg-white w-40 h-40 rounded-full absolute left-1/2 transform -translate-x-1/2 -bottom-[35%] p-2">
                        {loading ? <Skeleton circle={true} width={"100%"} height={"100%"}/> : (
                            <UserAvatar 
                                id={props.id}
                                displayName={props.displayName}
                                profilePicture={props.profilePicture}
                                size={props.size}
                                textSize={props.textSize}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="max-w-4xl w-full mx-auto flex justify-center border-gray-300 border rounded-sm bg-white pt-16 shadow-md relative">
                {props.type === "profile" ? (
                    <Link to={"/profile/settings"} state={props.state} className="absolute right-2 top-2 p-2 bg-blue-500 text-white rounded-md">
                        Edit Profile
                    </Link>
                ) : (
                    <div className="absolute right-2 top-2 p-2 bg-blue-500 text-white rounded-md">
                        <FollowBtn  id={props.id} following={props.following}/>
                    </div>
                    
                )}
                
                <div className="flex flex-col items-center justify-center py-4 w-full gap-y-2">
                    <h2 className="text-3xl font-bold">{props.displayName}</h2>
                    <p>{loading ? <Skeleton width={"10rem"}/> : props.type === "profile" ? props.state?.bio || "Welcome to Blogify" : props.bio || "Welcome to Blogify"} </p>
                    <div>
                        {loading ? (
                            <div className="leading-[30px]">
                                <Skeleton width={"7rem"} count={2} />
                            </div>
                        ) : (
                            <div className="flex gap-x-1">
                                <CgNotes size={20} />
                                {totalPost} posts published
                            </div>
                        )}
                    </div>
                    <div>
                        {loading ? <Skeleton width={"7rem"} /> : (
                            <div className="flex items-center gap-2">
                                <RiUserFollowLine size={20}/>
                                <p>{props.type === "profile" ? (props.state?.followed && props.state?.followed.length) : props.following?.length} Followers</p>
                            </div>
                        )}
                    </div>
                  

               
                </div>
            </div> 
            <div className="flex flex-col justify-center mt-10 gap-y-5">
                <h2 className="text-3xl text-center font-bold">Published Post{userPost.length > 1 && "s"}</h2>
                <div>
                    
                    {loading ? skeletonPosts : totalPost !== 0 && userPost.length !== 0 ?
                        (<InfiniteScroll
                            dataLength={userPost.length}
                            next={fetchingPost}
                            hasMore={hasMore}
                            loader={
                            <div className="text-center my-3">
                                <ClipLoader size={25} />
                            </div>
                            }
                            endMessage={
                            <span style={{ textAlign: "center" }}>
                                <p className="text-gray-500">No more posts to show!</p>
                            </span>
                            }
                        >
                            {realPosts}
                        </InfiniteScroll>) : (
                            <h2 className="text-center font-bold text-2xl">No Posts</h2>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default ProfileLayOut;