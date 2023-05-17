import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-loading-skeleton/dist/skeleton.css";
import ClipLoader from "react-spinners/ClipLoader";

import Comment from "../components/reusableComponent/comment";
import Like from "../components/reusableComponent/like";
import Share from "../components/reusableComponent/share";
import useFetchPosts from "../hooks/post";
import { PostObj } from "../interface/hook/PostObj";
import UserAvatar from "../components/reusableComponent/userAvatar";

const Post = () => {
  const { posts, hasMore, fetchMorePosts, loading } = useFetchPosts();

  const skeletonPosts = [...Array(4)].map((_, index) => (
    <div
      key={index}
      className="max-w-2xl mx-auto mt-4 overflow-hidden sm:rounded-md sm:border max-sm:border-y border-gray-300 relative"
    >
      <div className="bg-stone-100 bg-opacity-[.4] max-md:px-4 active:outline active:outline-[2px] active:outline-slate-700 flex flex-col gap-4 md:px-12 py-4">
        <div className="flex items-center gap-3">
          <Skeleton circle={true} width={"2.5rem"} height={"2.5rem"} />
          <div className="w-[80%] block">
            <Skeleton width={"100%"} height={"1.5rem"} />
          </div>
        </div>
        <Skeleton count={5} />
      </div>
    </div>
  ));

  const realPosts = posts.map((post: PostObj, index: number) => (
    <div
      key={index}
      className=" mt-1 active:outline max-w-2xl mx-auto mb-4 overflow-hidden sm:rounded-md sm:border max-sm:border-y border-gray-300 relative"
    >
      <div className="bg-stone-100 bg-opacity-[.4] max-md:px-4 active:outline active:outline-[2px] active:outline-slate-700 flex flex-col gap-4 md:px-12 py-4">
        {post.picture && <img src={post.picture} alt="" className="w-full" />}
        <div className="flex items-center gap-x-3">
          <div className="w-12 h-12">
            <UserAvatar 
                profilePicture={post.profilePicture} 
                displayName={post.displayName}
              />
          </div>
           
          <Link
            to={`/post/${post._id}`}
            className="hover:text-blue-900 text-2xl font-bold after:absolute after:top-0 after:left-0 after:w-full after:h-full h-full"
          >
            {post.title}
          </Link>
        </div>
        
        <p className="text-gray-800">
          {post.content.substring(0, 150)} {post.content.length >= 150 && "..."}
        </p>
        <div className="flex gap-4 justify-start items-center text-gray-500 font-semibold">
          <p className="text-sm">{post.displayName}</p>
          <p className="text-[.75rem] font-[400]">{post.date}</p>
          <div className="flex flex-row gap-2">
            <Like Like={post.numLikes} likes={post.likes}/>
            <Link to={`/post/${post._id}#comment`}>
              <Comment numComments={post.numComments} />
            </Link>
            <Share />
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="mt-12">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<div className="text-center my-3"><ClipLoader size={25} /></div> }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <p className="text-gray-500">No more posts to show!</p>
          </p>
        }
      >
        {loading ? skeletonPosts : realPosts}
      </InfiniteScroll>
    </div>
  );
};

export default Post;
