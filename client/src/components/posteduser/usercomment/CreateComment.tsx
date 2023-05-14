import React, { useState } from "react";
import UserAvatar from "../../reusableComponent/userAvatar";
import useAuthentication from "../../../hooks/isAuthenticated";
import ApiCall from "../../../API/Api-call";
import { useParams } from "react-router-dom";
import { CommentForm, ReplyForm } from "./comment&ReplyForm";
import singlePost from "../../../hooks/single-post";
import {AiOutlineUser} from "react-icons/ai"
import { useLocation } from "react-router-dom";

 interface createCommentProps {
  type?: string;
  id?: string;
  handleCloseReply?: () => void;
  handleOpenComment? :() => void;
}

const CreateComment: React.FC<createCommentProps> = (props) => {
  const { handleIncrement } = singlePost();
  const postId = useParams();
  const { authenticated, data } = useAuthentication();
  const [comment, setComment] = useState<string>("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let url = "http://localhost:4000/comment";
    if (props.type === "reply") {
      url = `http://localhost:4000/comment/${props.id}/replies`;
    }

    try {
      const response = await ApiCall("post", url, { comment, postId });
      response.status === 200 && handleIncrement(), setComment("");
      props.handleOpenComment && props.handleOpenComment();
      props.handleCloseReply && props.handleCloseReply();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-3 flex-row">
      <div className="h-8 w-8 ">
        <div className=" overflow-hidden rounded-full bg-blue-700 h-8 w-8 flex items-center justify-center">
          {authenticated ? (
            <UserAvatar
              profilePicture={data?.profilePicture}
              displayName={data?.displayName}
            />
          ) : (
            <AiOutlineUser  className="text-white"/>
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
