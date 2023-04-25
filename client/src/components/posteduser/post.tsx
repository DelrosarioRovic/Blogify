import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Comment from "./comment_like_share/comment";
import Like from "./comment_like_share/like";
import Share from "./comment_like_share/share";
import { useEffect, useState } from "react";
import ApiCall from "../../API/Api-call";


export interface PostObj {
  post_id: string;
  user_id:string,
  displayName: string;
  title: string;
  content: string;
  date: string;
  profilePicture: string | null;
}

const Post = () => {
  const [posts, setPosts] = useState<PostObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await ApiCall("GET", "http://localhost:3000/route/post");
        const posts = response.data.map((item: any) => {
          return {
            post_id: item._id,
            user_id:item.userId,
            displayName: item.displayName,
            title: item.title,
            content: item.content,
            date: item.date,
          };
        });
        setPosts(posts);
        setLoading(false);
      } catch (error) {}
    };
    getPosts();
  }, []);

  return (
    <div className="w-full h-full bg-transparent">
      {posts.map((item: PostObj) => (
        <div key={item.post_id} className="max-w-4xl mx-auto flex flex-col gap-4">
          <Link to={"/post/"+item.post_id}>
            <p className="text-[2rem] font-bold">{item.title}</p>
          </Link>
          <p className="text-gray-800">{item.content}</p>
          <div className="flex gap-4 justify-start items-center text-gray-500 font-semibold">
            <p className="text-[.85rem] ">{item.displayName}</p>
            <p className="text-[.85rem] ">{item.date}</p>
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
    </div>
  );
};

export default Post;
