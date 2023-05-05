import React from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import ApiCall from "../../../API/Api-call";
import SinglePost from "../../../hooks/single-post";

interface like {
  Like: number;
  type: string;
  like_comment_id?: string;
}

const like = (props: like) => {
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
        "get",
        url
      );
      if (response.status === 200) {
        handleIncrement();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className=" flex items-center text-2xl cursor-pointer"
      onClick={likeBtn}
    >
      <AiOutlineLike color="" />
      <span className="text-[.75rem]">{props.Like}</span>
    </div>
  );
};

export default like;
