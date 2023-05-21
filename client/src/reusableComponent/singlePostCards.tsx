import CrudMenu from "../components/posteduser/crudMenu";
import Like from "./like";
import Comment from "./comment";
import UserComment from "../components/posteduser/usercomment/UserComment";
import UserAvatar from "./userAvatar";
import { Link } from "react-router-dom";
import { PostObj } from "../interface/hook/PostObj";
import useAuthentication from "../hooks/isAuthenticated";

interface SinglePostCardProps extends PostObj {
    post: PostObj;
}

const SinglePostCard = (props: SinglePostCardProps) => {
    const { data, authenticated } = useAuthentication();

    return (
        <div className="max-w-4xl mx-auto py-4 md:border border-gray-200 rounded-xl mt-12 shadow-md">
            <div className="px-12 max-md:px-4">
                <div className="flex justify-between">
                    <div className="flex gap-6">
                        <UserAvatar
                            profilePicture={props.profilePicture}
                            displayName={props.displayName}
                            size="w-11 h-11"
                        />
                        <div>
                            <p className="font-semibold hover:text-blue-900">
                                <Link to={`/profile/${props.userId}`}>{props.displayName}</Link>
                            </p>
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
            </div>
            <UserComment id="comment" numComments={props.numComments} />
        </div>
    )
}

export default SinglePostCard;