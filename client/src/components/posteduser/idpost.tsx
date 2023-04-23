import React, { useState, useEffect } from "react";
import Like from "./comment_like_share/like";
import Comment from "./comment_like_share/comment";
import Share from "./comment_like_share/share";
import { Link, useParams } from "react-router-dom";
import apiCall from "../../API/Api-call";
import { PostObj } from "./post";
import UserAvatar from "../reusableComponent/userAvatar";

function idpost() {
  const postId = useParams();
  const [post, setPost] = useState<PostObj>({
    post_id: "",
    user_id: "",
    displayName: "",
    title: "",
    content: "",
    date: "",
    profilePicture: "" || null,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiCall("get",`http://localhost:3000/route/single-post/${postId.postId}`);
        setPost({
          post_id: response[0]._id,
          user_id: response[0].userId,
          displayName: response[0].displayName,
          title: response[0].title,
          content: response[0].content,
          date: response[0].date,
          profilePicture: response[0].profilePicture || null,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-4 px-12 border border-gray-200 rounded-xl">
      <div className="flex justify-between">
        <div className="flex gap-6">
          <div className="flex justify-center items-center w-10 h-10 bg-slate-600 rounded-full text-white overflow-hidden">
            <UserAvatar
              profilePicture={post.profilePicture}
              displayName={post.displayName}
            />
          </div>
          <p className="font-semibold">
            {post.displayName}
            <p className="font-thin text-[.75rem] text-gray-600">
              Posted on <span>{post.date}</span>
            </p>
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <Like Like={6} />
          <Link to="#comment">
            <Comment comments={2} />
          </Link>
          <Share />
        </div>
      </div>
      <div className="mt-6">
        <h1 className="text-[2rem] font-extrabold">{post.title}</h1>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default idpost;
