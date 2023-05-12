import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import ApiCall from "../../../API/Api-call";
import SinglePost from "../../../hooks/single-post";
import { toast } from 'react-toastify';
import useAuthentication from "../../../hooks/isAuthenticated";
interface like {
  Like: number;
  type?: string;
  like_comment_id?: string;
  likes: [string]
}
const like = (props: like) => {
  const { data } = useAuthentication();
  const postId = useParams();
  const { handleIncrement } = SinglePost();
 
  const likeBtn = async () => {
    try {
      let url = `http://localhost:4000/like/${postId.postId}`;
      if (props.type === "like-comment") {
        url = `http://localhost:4000/like/${props.like_comment_id}/like-comment`;
      }
      console.log(url);
      const response = await ApiCall(
        "put",
        url
      );
      if (response.status === 200) {
        handleIncrement();
      }else{
        toast.info("Login first 😭");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(props.Like);
  console.log(data);
  
  return (
    //data?._id === props.likes[0]
    <div
      className="flex items-center text-2xl cursor-pointer active:scale-75 duration-150"
      onClick={likeBtn}
    >
      <AiOutlineLike className={``} style={{ color: data?._id === props.likes[0] ? "blue" : "inherit" }} />
      <span className="text-[.75rem]">{props.Like}</span>
    </div>
  );
};

export default like;
