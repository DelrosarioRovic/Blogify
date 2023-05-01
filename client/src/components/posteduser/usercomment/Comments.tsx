import React, { useState } from "react";
import CommentCards from "./CommentCards";
import CreateComment from "./CreateComment";
import singlePost from "../../../hooks/single-post";
import { Comment } from "../../../interface/hook/CommentObj";
import UserAvatar from "../../reusableComponent/userAvatar";
import useAuthentication from "../../../hooks/isAuthenticated";
import { toast } from "react-toastify";

const UsersComments: React.FC = () => {
  const { authenticated } = useAuthentication();
  const { comment } = singlePost();
  const [replyIndexAr, setReplyIndexAr] = useState<string[]>([]);
  const [commentIndexAr, setCommentIndexAr] = useState<string[]>([]);

  console.log(comment);
  const toggleIndex = (id: string, state: string[]) => {
    return state.includes(id) ? state.filter((i) => i !== id) : [...state, id];
  };

  const handleReplyClick = (id: string) => {
    if (!authenticated) {
      toast.info("Please Login First");
    }
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
          like={0}
          comment={comment.replies.length}
          img={
            <UserAvatar
              profilePicture={comment.user.profilePicture}
              displayName={comment.user.displayName}
            />
          }
          name={comment.user.displayName}
          date={comment.date}
          Comment={comment.text}
        />
        {authenticated && (
          <>
            {replyIndexAr.includes(comment._id) && (
              <div className="mt-3">
                <CreateComment
                  type={"reply"}
                  id={comment._id}
                  handleCloseReply={() => handleReplyClick(comment._id)}
                />
              </div>
            )}
          </>
        )}

        <>
          {commentIndexAr.includes(comment._id) && (
            <div className="pl-9 gap-3">
              {comment.replies && renderComments(comment.replies)}
            </div>
          )}
        </>
      </React.Fragment>
    ));
  };

  return <>{renderComments(comment)}</>;
};

export default UsersComments;
