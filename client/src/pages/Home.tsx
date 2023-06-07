import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from "react-spinners/ClipLoader";

import skeletonPosts from "../skeleton/skeleton-posts";
import useFetchPosts from "../hooks/post";
import { PostObj } from "../interface/hook/PostObj";
import PostCard from "../reusableComponent/postCards";

const Post = () => {
  const { posts, hasMore, fetchMorePosts, loading } = useFetchPosts();

  const realPosts = posts.map((post: PostObj, index: number) => (
    <PostCard 
      key={index}
      _id={post._id}
      title={post.title}
      content={post.content}
      date={post.date}
      displayName={post.displayName}
      bio={post.bio}
      profilePicture={post.profilePicture}
      likes={post.likes}
      numComments={post.numComments}
      numLikes={post.numLikes}
      picture={post.picture}
      userId={post.userId}
    />
  ));

  return (
    <div className="mt-12">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
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
        {loading ? skeletonPosts : realPosts}
      </InfiniteScroll>
    </div>
  );
};

export default Post;
