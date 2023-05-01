import React, { useState, useEffect } from "react";
import UserAvatar from "../../reusableComponent/userAvatar";
import useAuthentication from "../../../hooks/isAuthenticated";
import ApiCall from "../../../API/Api-call";
import { useParams } from "react-router-dom";
import { CommentForm, ReplyForm } from "./comment&ReplyForm";

interface type {
  type: string;
  id?: string;
  handleCloseReply?: () => void;
}

const CreateComment: React.FC<type> = (props) => {
  const postId = useParams();
  const [isShowBtn, SetIsShowBtn] = useState<boolean>(false);
  const { authenticated, data } = useAuthentication();
  const [comment, setComment] = useState<string>("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let url = "http://localhost:4000/comment";
    if (props.type === "reply") {
      url = `http://localhost:4000/comment/${props.id}/replies`;
    }

    try {
      const response = await ApiCall("post", url, {
        comment,
        postId,
      });

      if (response.status === 200 && props.handleCloseReply) {
        props.handleCloseReply();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-3 flex-row">
      <div className="h-8 w-8 ">
        <div className=" overflow-hidden rounded-full bg-slate-600 h-8 w-8 flex items-center justify-center">
          {authenticated ? (
            <UserAvatar
              profilePicture={data?.profilePicture}
              displayName={data?.displayName}
            />
          ) : (
            "D"
          )}
        </div>
      </div>

      {props.type === "reply" ? (
        <ReplyForm
          handleSubmit={handleSubmit}
          comment={comment}
          setComment={setComment}
          placeholder={props.type}
          handleCloseReply={props.handleCloseReply}
        />
      ) : (
        <CommentForm
          handleSubmit={handleSubmit}
          comment={comment}
          setComment={setComment}
          placeholder={props.type}
          row={1}
        />
      )}
    </div>
  );
};
export default CreateComment;
