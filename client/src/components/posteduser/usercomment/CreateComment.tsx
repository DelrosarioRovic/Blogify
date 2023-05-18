import React, { useState } from "react";
import UserAvatar from "../../reusableComponent/userAvatar";
import useAuthentication from "../../../hooks/isAuthenticated";
import ApiCall from "../../../API/Api-call";
import { Link, useParams, Navigate } from "react-router-dom";
import { CommentForm, ReplyForm } from "./comment&ReplyForm";
import singlePost from "../../../hooks/single-post";
import {AiOutlineUser} from "react-icons/ai"
import { useLocation } from "react-router-dom";

 interface createCommentProps {
  type?: string;
  id: string;
  handleCloseReply?: () => void;
  handleOpenComment? :(id: string, cond: boolean) => void;
 }
const CreateComment: React.FC<createCommentProps> = (props) => {
  const location = useLocation();
  const updateCurrentData = location.state;
  const { focus } = location.state || {};
  const postId = useParams();
  const { handleIncrement } = singlePost();
  const { authenticated, data } = useAuthentication();
  const [isSuccessFullySubmitted, setSuccessFullySubmitted] = useState<boolean>(false);
  const [comment, setComment] = useState<string>(updateCurrentData ? updateCurrentData.commentContent : "");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    let url="";
    if (updateCurrentData && updateCurrentData.typeCR) {
      url = "http://localhost:4000/comment";
      if (updateCurrentData.typeCR === "reply") {
        url = `http://localhost:4000/comment/${updateCurrentData.parentCommentId}/replies`;
      }
    } else {
      url = "http://localhost:4000/comment";
      if (props.type === "reply") {
        url = `http://localhost:4000/comment/${props.id}/replies`;
      }
    }
 
    try {
      const response = await ApiCall("post", url, {
        id:updateCurrentData && updateCurrentData.commentId, 
        comment,
        ...(updateCurrentData ? { postId: updateCurrentData.postId } : { postId })
      });

      response.status === 200 && handleIncrement(), setComment(""), setSuccessFullySubmitted(true);
      props.handleOpenComment && props.handleOpenComment(props.id, false);
      props.handleCloseReply && props.handleCloseReply();
      //update comment
    } catch (error) {
      console.log(error);
    }
  };

  if (isSuccessFullySubmitted && updateCurrentData) {
    return <Navigate to={`/post/${updateCurrentData.postId}`} />;
  }

  return (
    <div className="flex gap-3 flex-row">
      <div className="h-12 w-12 ">
          {authenticated ? (
            <UserAvatar
              profilePicture={data?.profilePicture}
              displayName={data?.displayName}
            />
          ) : (
            <div className=" overflow-hidden rounded-full bg-blue-500 h-11 w-11 flex items-center justify-center">
              <AiOutlineUser  className="text-white"/>
            </div>
          )}
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
          //for updating your comment & reply
          updateCurrentData={updateCurrentData}
          focus={focus}
        />
      )}
    </div>
  );
};
export default CreateComment;
