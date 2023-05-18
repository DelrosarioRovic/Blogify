import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

import Like from "../components/reusableComponent/like";
import Comment from "../components/reusableComponent/comment";
import UserAvatar from "../components/reusableComponent/userAvatar";
import UserComment from "../components/posteduser/usercomment/UserComment";
import singlePost from "../hooks/single-post";
import useAuthentication from "../hooks/isAuthenticated";
import CrudMenu from "../components/posteduser/crudMenu";

function idpost() {
  const { data, authenticated } = useAuthentication();
  const { post, loading } = singlePost();

  return (
    <div className="max-w-4xl mx-auto py-4 md:border border-gray-200 rounded-xl mt-12 shadow-md">
      { post.picture && 
        <div className="mb-12">
          <img src={post.picture} />
        </div>
      }

      <div className="px-12 max-md:px-4">
      <div className="flex justify-between">
        <div className="flex gap-6">
          {loading ? (
            <Skeleton circle={true} width={"2.5rem"} height={"2.5rem"} />
          ) : (
              <UserAvatar
                profilePicture={post.profilePicture}
                displayName={post.displayName}
              />
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
            <Comment numComments={post.numComments} />
          </Link>
          {/* crudPost */}
            { 
              authenticated && post.userId === data?._id && 
                <CrudMenu 
                 toEdit={`/compose/${post._id}`}
                 data={post} 
                 toShare="" 
                 type="post" 
                /> 
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
