import React from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import ApiCall from "../../../API/Api-call";

interface like {
    Like: number
}

const like = (props: like) => {
  const postId = useParams();
  const likeBtn = async() => {
    try {
      const response = await ApiCall(
        "get",
        `http://localhost:4000/like/${postId.postId}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className=" flex items-center text-2xl cursor-pointer" onClick={likeBtn}>
      <AiOutlineLike color=""/>
      <span className="text-[.75rem]">{props.Like}</span>
    </div>
  );
}

export default like;
