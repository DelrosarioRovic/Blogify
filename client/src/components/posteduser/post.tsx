import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-loading-skeleton/dist/skeleton.css";
import Comment from "./comment_like_share/comment";
import Like from "./comment_like_share/like";
import Share from "./comment_like_share/share";
import { useEffect, useState } from "react";
import ApiCall from "../../API/Api-call";

export interface PostObj {
  _id?: string;
  userId?: string;
  displayName?: string;
  title?: string;
  content?: string;
  date?: string;
  profilePicture?: string | null;
  numComments?: number;
}

const Post = () => {
  const [posts, setPosts] = useState<PostObj[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMorePosts = async () => {
    const limit: number = 3;
    const skip: number = posts.length;
    const url = `http://localhost:4000/route/post?limit=${limit}&skip=${skip}`;
    const response = await ApiCall("GET", url);
    try {
      const newPosts = response.data.map((post: PostObj, index: number) => ({
        ...post,
        key: index,
      }));
      setPosts([...posts, ...newPosts]);
      if (newPosts < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMorePosts();
  }, []);

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
          key={post._id}
          className="relative max-w-2xl mx-auto mt-8 overflow-hidden sm:rounded-md sm:border max-sm:border-y border-gray-300 active:outline active:outline-[2px] active:outline-slate-700"
        >
          <div className="bg-black w-full h-36">
            <img src={``} alt={`post_cover`} />
          </div>
          <div className="bg-stone-100 bg-opacity-[.4] max-md:px-4 flex flex-col gap-4 md:px-12 py-4">
            <Link
              to={`/post/${post._id}`}
              className="text-2xl font-bold after:w-full after:h-full after:absolute after:top-0 after:left-0 after:cursor-pointer hover:text-blue-950"
            >
              {post.title}
            </Link>
            <p className="text-gray-800">{post.content}</p>
            <div className="flex gap-4 justify-start items-center text-gray-500 font-semibold">

              <p className="text-[.8rem]">{post.displayName}</p>
              <p className="text-[.75rem]">{post.date}</p>
              <div className="flex flex-row gap-2">
                <Like Like={2} />
                <Link to={`/post/${post._id}#comment`}>
                  <Comment numComments={post?.numComments} />
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
