import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import ApiCall from "../API/Api-call";
import SinglePost from "../hooks/single-post";
import { toast } from 'react-toastify';
import useAuthentication from "../hooks/isAuthenticated";

interface like {
  Like: number;
  type?: string;
  like_comment_id?: string;
  likes: [string];
}

const like = (props: like) => {
  const { authenticated,data } = useAuthentication();
  const postId = useParams();
  const { handleIncrement } = SinglePost();

  const likeBtn = async () => {
    try {
      let url = `https://blogify-api-server.vercel.app/like/${postId.postId}`;
      if (props.type === "like-comment") {
        url = `https://blogify-api-server.vercel.app/like/${props.like_comment_id}/like-comment`;
      }
      const response = await ApiCall(
        "put",
        url
      );
      response.status === 200 ?
        handleIncrement() : 
        toast.info("Please Login First");
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div
      className="flex items-center text-2xl cursor-pointer active:scale-75 duration-150 gap-x-1"
      onClick={likeBtn}
    >
      <AiOutlineLike className={``} style={{ color: authenticated && data && props.likes.includes(data._id) ? "blue" : "" }} />
      <span className="text-[.75rem]">{props.Like}</span>
    </div>
  );
};

export default like;
