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
import skeletonSinglePost from "../skeleton/skeleton-single-post";

function idpost() {
  const { data, authenticated } = useAuthentication();
  const { post, loading } = singlePost();
  const realPost = () => <div className="max-w-4xl mx-auto py-4 md:border border-gray-200 rounded-xl mt-12 shadow-md">
  {post.picture && 
    <div className="mb-12">
      <img src={post.picture} className="w-full h-[400px] object-cover object-center" />
    </div>
  }

  <div className="px-12 max-md:px-4">
    <div className="flex justify-between">
      <div className="flex gap-6">
          <UserAvatar
            profilePicture={post.profilePicture}
            displayName={post.displayName}
            size="w-11 h-11"
          />
        <div>
          <p className="font-semibold hover:text-blue-900">
            <Link to={`/profile/${post.userId}`}>{post.displayName}</Link>
          </p>
          <p className="font-thin text-[.75rem] text-gray-600">
            <span className="font-[400] text-[.75rem text-gray-500">
              Posted on {post.date}
            </span>
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Like Like={post.numLikes} type="like-post" likes={post.likes}/>
        <Comment numComments={post.numComments} />
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
        {post.title}
      </h1>
      <div>
        <p>{post.content}</p>
      </div>
    </div>
  </div>
  <UserComment id="comment" numComments={post.numComments} />
</div>

  return (
    <div>
        {loading ? skeletonSinglePost() : realPost()}
    </div>
  );
}

export default idpost;
