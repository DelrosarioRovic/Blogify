import React from "react";
import { Link } from "react-router-dom";
import { PostObj } from "../../interface/hook/PostObj";
import Like from "./like";
import Comment from "./comment";
import UserAvatar from "./userAvatar";

const PostCard:React.FC<PostObj> = (props) => {
    return (
        <div
            className="w-full mt-1 active:outline max-w-2xl mx-auto mb-4 overflow-hidden sm:rounded-md sm:border max-sm:border-y border-gray-300 relative"
        >
        {props.picture && <img src={props.picture} alt="" className="w-full h-[200px] object-cover object-center " />}
        <div className="bg-stone-100 bg-opacity-[.4] max-md:px-4 active:outline active:outline-[2px] active:outline-slate-700 flex flex-col gap-4 md:px-12 py-4">
          
          <div className="flex items-center gap-x-3">
            <div className="w-12 h-12">
              <UserAvatar
                profilePicture={props.profilePicture}
                displayName={props.displayName}
                size="w-11 h-11"
              />
            </div>
            <Link
              to={`/post/${props._id}`}
              className="hover:text-blue-900 text-2xl font-bold after:absolute after:top-0 after:left-0 after:w-full after:h-full h-full"
            >
              {props.title}
            </Link>
          </div>
          <p className="text-gray-800">
            {props.content.substring(0, 150)} {props.content.length >= 150 && "..."}
          </p>
          <div className="flex gap-4 justify-start items-center text-gray-500 font-semibold">
            <p className="text-sm">{props.displayName}</p>
            <p className="text-[.75rem] font-[400]">{props.date}</p>
            <div className="flex flex-row gap-2">
              <Like Like={props.numLikes} likes={props.likes} />
              <Link to={`/post/${props._id}#comment`}>
                <Comment numComments={props.numComments} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
}

export default PostCard;