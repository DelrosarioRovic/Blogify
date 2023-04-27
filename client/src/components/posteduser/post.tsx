import { Link } from "react-router-dom";
import Comment from "./comment_like_share/comment";
import Like from "./comment_like_share/like";
import Share from "./comment_like_share/share";
import { useEffect, useState } from "react";
import ApiCall from "../../API/Api-call";
import UserAvatar from "../reusableComponent/userAvatar";
export interface PostObj {
  post_id: string;
  user_id: string;
  displayName: string;
  title: string;
  content: string;
  date: string;
  profilePicture: string | null;
}

const Post = () => {
  const [posts, setPosts] = useState<PostObj[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await ApiCall(
          "GET",
          "http://localhost:3000/route/post"
        );
        const posts = response.map((item: any) => {
          return {
            post_id: item._id,
            user_id: item.userId,
            displayName: item.displayName,
            title: item.title,
            content: item.content,
            date: item.date,
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
        <div key={item.post_id} className="max-w-2xl mx-auto mt-4 overflow-hidden sm:rounded-md sm:border max-sm:border-y border-gray-300 relative">

       <img src={``} alt={`post_cover`} className="bg-black w-full h-36"/>
       
        <div
          className="bg-stone-100 bg-opacity-[.4] max-md:px-4 active:outline active:outline-[2px] active:outline-slate-700 flex flex-col gap-4 md:px-12 py-4"
        >
          <Link
            to={"/post/" + item.post_id}
            className="text-[2rem] font-bold after:absolute after:w-full after:h-full after:top-0 after:left-0 after:z-0 hover:text-blue-950 cursor-pointer"
          >
            {item.title}
          </Link>
          <p className="text-gray-800">{item.content.substring(0, 200)}...</p>
          <div className="flex gap-4 justify-start items-center text-gray-500 font-semibold">
            <div className="h-9 w-9 rounded-full overflow-hidden bg-black">
              <UserAvatar profilePicture={``} displayName={``} />
            </div>
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
        </div>
      ))}
    </>
  );
};

export default Post;
