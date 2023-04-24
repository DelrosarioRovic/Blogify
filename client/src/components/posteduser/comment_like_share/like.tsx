import React from "react";
import { AiOutlineLike } from "react-icons/ai";

interface like {
    Like: number
}

function like(props: like) {
  return (
    <div className=" flex items-center text-2xl cursor-pointer">
      <AiOutlineLike />
      <span className="text-[.75rem]">{props.Like}</span>
    </div>
  );
}

export default like;
