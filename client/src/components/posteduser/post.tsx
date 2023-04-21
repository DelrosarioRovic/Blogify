import { Link } from "react-router-dom";
import Comment from "./comment_like_share/comment";
import Like from "./comment_like_share/like";
import Share from "./comment_like_share/share";
import { useEffect, useState } from "react";
import ApiCall from "../../API/Api-call";

interface PostObj {
  _id: string;
  displayName: string;
  title: string;
  content: string;
}

const Post = () => {
  const [posts, setPosts] = useState<PostObj[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await ApiCall("GET", "http://localhost:3000/route/post");
        const posts = response.map((item: any) => {
          return {
            _id: item._id,
            displayName: item.displayName,
            title: item.posts[0].title,
            content: item.posts[0].content,
          };
        });
        setPosts(posts);
      } catch (error) {}
    };
    getPosts();
  }, []);

  return (
    <>
      {posts.map((item: PostObj) => (
        <div key={item._id} className="max-w-4xl mx-auto flex flex-col gap-4">
          <Link to={item._id}>
            <p className="text-[2rem] font-bold">{item.title}</p>
          </Link>
          <p className="text-gray-800">{item.content}</p>
          <div className="flex gap-4 justify-start items-center text-gray-500 font-semibold">
            <p className="text-[.85rem] ">{item.displayName}</p>
            <p className="text-[.85rem] ">03/21/2024</p>
            <div className="flex flex-row gap-2">
              <Like Like={2} />
              <Link to={`/id#comment`}>
                <Comment comments={6} />
              </Link>
              <Share />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Post;
