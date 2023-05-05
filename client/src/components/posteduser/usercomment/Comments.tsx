import React, { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import CommentCards from "./CommentCards";
import CreateComment from "./CreateComment";
import singlePost from "../../../hooks/single-post";
import { Comment } from "../../../interface/hook/CommentObj";
import UserAvatar from "../../reusableComponent/userAvatar";
import useAuthentication from "../../../hooks/isAuthenticated";

const UsersComments: React.FC = () => {
  const { authenticated } = useAuthentication();
  const { comment } = singlePost();
  const [replyIndexAr, setReplyIndexAr] = useState<string[]>([]);
  const [commentIndexAr, setCommentIndexAr] = useState<string[]>([]);


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

  const renderComments = (comments: Comment[], depth = 0) => {
    return comments.map((comment) => {
      const isMaxDepth = depth >= 2;
      const hasReplies = comment.replies && comment.replies.length > 0;
      return (
        <React.Fragment key={`${comment._id}-${depth}`}>
          <CommentCards
            like_comment_id={comment._id}
            handleComment={() => handleCommentClick(comment._id)}
            handleReply={
              !isMaxDepth ? () => handleReplyClick(comment._id) : undefined
            }
            like={comment.likes.length}
            comment={comment.replies.length}
            img={
              <UserAvatar
                profilePicture={comment.user.profilePicture}
                displayName={comment.user.displayName}
              />
            }
            name={comment.user.displayName}
            date={moment(comment.date).fromNow()}
            Comment={comment.text}
            isMaxDepth={isMaxDepth}
          />
          {authenticated &&
            !isMaxDepth &&
            replyIndexAr.includes(comment._id) && (
              <div className="mt-3">
                <CreateComment
                  type={"reply"}
                  id={comment._id}
                  handleCloseReply={() => {handleReplyClick(comment._id)}}
                  handleOpenComment={() => {handleCommentClick(comment._id)}}
                />
              </div>
            )}

          {hasReplies &&
            !isMaxDepth &&
            commentIndexAr.includes(comment._id) && (
              <div className="flex flex-row  w-full overflow-hidden">
              <div className="w-full ml-6 relative before:absolute before:-left-[.55rem] before:max-lg:-left-[.50rem] before:top-0 before:w-[1px] before:h-[100%] before:bg-slate-500">
              {renderComments(comment.replies, depth + 1)}
              </div>
              </div>
            )}
        </React.Fragment>
      );
    });
  };

  return <>{renderComments(comment)}</>;
};

export default UsersComments;
