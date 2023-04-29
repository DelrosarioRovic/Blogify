import React, { useState } from "react";
import CommentCards from "./CommentCards";
import CreateComment from "./CreateComment";
import singlePost from "../../../hooks/single-post";
import { Comment } from "../../../interface/hook/CommentObj";

const UsersComments: React.FC = () => {
  const { comment } = singlePost();
  const [replyIndexAr, setReplyIndexAr] = useState<string[]>([]);
  const [commentIndexAr, setCommentIndexAr] = useState<string[]>([]);

  const toggleIndex = (id: string, state: string[]) => {
    return state.includes(id) ? state.filter((i) => i !== id) : [...state, id];
  };

  const handleReplyClick = (id: string) => {
    setReplyIndexAr((prevArr) => toggleIndex(id, prevArr));
  };

  const handleCommentClick = (id: string) => {
    setCommentIndexAr((prevArr) => toggleIndex(id, prevArr));
  };

  const renderComments = (comments: Comment[]) => {
    return comments.map((comment) => (
      <React.Fragment key={comment._id}>
        <CommentCards
          handleComment={() => handleCommentClick(comment._id)}
          handleReply={() => handleReplyClick(comment._id)}
          like={1}
          comment={2}
          img="A"
          name={comment.user.displayName}
          date={comment.date}
          Comment={comment.text}
        />
        <div className={`${replyIndexAr.includes(comment._id) ? "block" : "hidden"} mt-3 `}>
          <CreateComment type={"reply"} id={comment._id} />
        </div>
        <div className={`${commentIndexAr.includes(comment._id) ? "block" : "hidden"} pl-9 gap-3`}>
          {comment.replies && renderComments(comment.replies)}
        </div>
      </React.Fragment>
    ));
  };

  return <>{renderComments(comment)}</>;
};

export default UsersComments;
