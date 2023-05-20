import singlePost from "../hooks/single-post";
import skeletonSinglePost from "../skeleton/skeleton-single-post";
import SinglePostCard from "../components/reusableComponent/singlePostCards";

function idpost() {
  const { post, loading } = singlePost();
  const RealSinglePost = <SinglePostCard 
    _id={post._id}
    content={post.content}
    title={post.title}
    displayName={post.displayName}
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
    <div>
        {loading ? skeletonSinglePost() : RealSinglePost}
    </div>
  );
}

export default idpost;
