import React, { useState } from "react";
import Like from "../comment_like_share/like";
import Comment from "../comment_like_share/comment";

interface CardInfo {
  name: string;
  date: string;
  Comment: string;
  img: React.ReactNode;
  like: number;
  comment: number;
  handleReply?: () => void;
  handleComment: () => void;
  isMaxDepth: boolean;
}

const CommentCards = (props: CardInfo) => {
  return (
    <div className="flex flex-row gap-3 mt-4 overflow-hidden">
      <div className="w-10 h-10">
        <div className=" overflow-hidden h-10 w-10 rounded-full bg-red-500 flex justify-center items-center text-white">
          {props.img}
        </div>
      </div>

      <div className="p-2 border w-full">
        <h1 className="font-semibold flex gap-3 items-center">
          {props.name}
          <span className="bg-slate-500 h-1 w-1 rounded-full -ml-[8px]"></span>
          <span className="font-[400] text-[.75rem] text-gray-500 ">
            {props.date}
          </span>
        </h1>
        <div className="mt-2">{props.Comment}</div>
        <div className="flex flex-row items-center gap-2 pt-4">
          <span>
            <Like Like={props.like} />
          </span>
          <span onClick={props.handleComment}>
            <Comment numComments={props.comment} />
          </span>

          <span
            onClick={props.handleReply}
            className="cursor-pointer text-[.75rem] font-semibold"
          >
            {props.isMaxDepth ? "Thread" : "Reply"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentCards;
