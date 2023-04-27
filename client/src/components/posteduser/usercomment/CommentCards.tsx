import React, { useState } from "react";
import Like from "../comment_like_share/like";
import Comment from "../comment_like_share/comment";

interface CardInfo {
  name: string;
  date: string;
  Comment: string;
  img: string;
  like: number;
  comment: number;
  handleReply: () => void;
  handleComment: () => void;
}

const CommentCards = (props: CardInfo) => {
  return (
    <div className="flex flex-row gap-3 mt-4 overflow-hidden">
      <div className="w-8 h-8">
        <div className=" overflow-hidden h-8 w-8 rounded-full bg-red-500 flex justify-center items-center text-white">
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
          <span onClick={props.handleReply}>
            <Comment numComments={props.comment} />
          </span>

          <span
            onClick={props.handleComment}
            className="cursor-pointer text-[.75rem] font-semibold"
          >
            Reply
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentCards;
