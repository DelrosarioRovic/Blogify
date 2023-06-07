import singlePost from "../hooks/single-post";
import skeletonSinglePost from "../skeleton/skeleton-single-post";
import SinglePostCard from "../reusableComponent/singlePostCards";

function idpost() {
  const { post, loading } = singlePost();
  const RealSinglePost = <SinglePostCard 
    _id={post._id}
    content={post.content}
    title={post.title}
    displayName={post.displayName}
    bio={post.bio}
    date={post.date}
    likes={post.likes}
    numComments={post.numComments}
    userId={post.userId}
    numLikes={post.numLikes}
    picture={post.picture}
    post={post}
    profilePicture={post.profilePicture}
  />

  return (
    <div className="max-w-4xl mx-auto py-4 md:border border-gray-200 rounded-xl mt-12 shadow-md">
      <div className="px-12 max-md:px-4">
        {loading ? skeletonSinglePost() : RealSinglePost}
      </div>
    </div>
  );
}

export default idpost;
