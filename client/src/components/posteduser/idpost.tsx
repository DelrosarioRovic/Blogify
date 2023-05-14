import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

import Like from "./comment_like_share/like";
import Comment from "./comment_like_share/comment";
import UserAvatar from "../reusableComponent/userAvatar";
import UserComment from "./usercomment/UserComment";
import singlePost from "../../hooks/single-post";
import useAuthentication from "../../hooks/isAuthenticated";
import CrudMenu from "./crudMenu";

function idpost() {
  const { data, authenticated } = useAuthentication();
  const { post, loading } = singlePost();
  
  return (
    <div className="max-w-4xl mx-auto py-4 md:border border-gray-200 rounded-xl mt-12 shadow-md">
      <div className="px-12 max-md:px-4">
      <div className="flex justify-between">
        <div className="flex gap-6">
          {loading ? (
            <Skeleton circle={true} width={"2.5rem"} height={"2.5rem"} />
          ) : (
            <div className=" flex justify-center items-center w-10 h-10 bg-slate-600 rounded-full text-white overflow-hidden">
              <UserAvatar
                profilePicture={post.profilePicture}
                displayName={post.displayName}
              />
            </div>
          )}
          <div>
            <p className="font-semibold">
              {loading ? (
                <Skeleton width={"10rem"} height={"1rem"} />
              ) : (
                post.displayName
              )}
            </p>
            <p className="font-thin text-[.75rem] text-gray-600">
              {loading ? (
                <Skeleton width={"7rem"} height={".75rem"} />
              ) : (
                <span className="font-[400] text-[.75rem text-gray-500">
                  Posted on {post.date}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Like Like={post.numLikes} type="like-post" likes={post.likes}/>
          <Link to="#comment">
            <Comment numComments={2} />
          </Link>
          {/* crudPost */}
            { 
              authenticated && post.userId === data?._id && 
                <CrudMenu toEdit={`/compose/${post._id}`} data={post} toDelete="deletePost" toShare=""/> 
            }

        </div>
      </div>
      <div className="my-6">
        <h1 className="text-[2rem] font-extrabold">
          {loading ? <Skeleton width={"100%"} height={"1.5rem"} /> : post.title}
        </h1>
        <div>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  width={index === 2 || index === 4 ? "50%" : "100%"}
                  height={"1rem"}
                />
              ))}
            </div>
          ) : (
            <p>{post.content}</p>
          )}
        </div>
      </div>
      </div>
      
      <UserComment id="comment" numComments={post.numComments} />
    </div>
  );
}

export default idpost;
