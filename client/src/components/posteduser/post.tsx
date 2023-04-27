import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-loading-skeleton/dist/skeleton.css";
import Comment from "./comment_like_share/comment";
import Like from "./comment_like_share/like";
import Share from "./comment_like_share/share";
import useFetchPosts, {PostObj} from "../../hooks/post";

const Post = () => {
  const { posts, hasMore, fetchMorePosts } = useFetchPosts();

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMorePosts}
      hasMore={hasMore}
      loader={"loading ..."}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>No more posts to show!</b>
        </p>
      }
    >
      {posts.map((post: PostObj, index: number) => (
        <div
          key={index}
          className="max-w-2xl mx-auto mt-4 overflow-hidden sm:rounded-md sm:border max-sm:border-y border-gray-300 relative"
        >
          {/* <img src={``} alt={`post_cover`} className="bg-black w-full h-36" /> */}

          <div className="bg-stone-100 bg-opacity-[.4] max-md:px-4 active:outline active:outline-[2px] active:outline-slate-700 flex flex-col gap-4 md:px-12 py-4">
            <Link to={`/post/${post._id}`}>
              <p className="text-2xl font-bold">{post.title}</p>
            </Link>
            <p className="text-gray-800">
              {post.content.substring(0, 150)}{" "}
              {post.content.length >= 150 && "..."}
            </p>
            <div className="flex gap-4 justify-start items-center text-gray-500 font-semibold">
              <p className="text-sm">{post.displayName}</p>
              <p className="text-sm">{post.date}</p>
              <div className="flex flex-row gap-2">
                <Like Like={2} />
                <Link to={`/post/${post._id}#comment`}>
                  <Comment numComments={post.numComments} />
                </Link>
                <Share />
              </div>
            </div>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default Post;
