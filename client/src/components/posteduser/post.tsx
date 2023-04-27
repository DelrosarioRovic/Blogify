import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from 'react-infinite-scroll-component';
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
}

const Post = () => {
  const [posts, setPosts] = useState<PostObj[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMorePosts = async () => {
    const limit:number = 3;
    const skip:number = posts.length;
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
      endMessage={<p style={{ textAlign: "center" }}><b>No more posts to show!</b></p>}
    >
      {posts.map((post: PostObj, index: number) => (
        <div key={index} className="max-w-4xl mx-auto flex flex-col gap-4">
          <Link to={`/post/${post._id}`}>
            <p className="text-2xl font-bold">{post.title}</p>
          </Link>
          <p className="text-gray-800">{post.content}</p>
          <div className="flex gap-4 justify-start items-center text-gray-500 font-semibold">
            <p className="text-sm">{post.displayName}</p>
            <p className="text-sm">{post.date}</p>
            <div className="flex flex-row gap-2">
              <Like Like={2} />
              <Link to={`/post/${post._id}#comment`}>
                <Comment comments={6} />
              </Link>
              <Share />
            </div>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default Post;
