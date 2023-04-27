import React, { useState } from "react";
import CommentCards from "./CommentCards";
import CreateComment from "./CreateComment";
import singlePost from "../../../hooks/single-post";
import { Comment } from "../../../interface/hook/CommentObj";

const UsersComments: React.FC = () => {
  const { comment } = singlePost();
  const [replyIndexAr, setReplyIndexAr] = useState<number[]>([]);
  const [commentIndexAr, setCommentIndexAr] = useState<number[]>([]);

  const handleReplyClick = (index: number) => {
    setReplyIndexAr((prevArr) => {
      if (prevArr.includes(index)) {
        return prevArr.filter((i) => i !== index);
      } else {
        return [...prevArr, index];
      }
    });
  };

  const handleCommentClick = (index: number) => {
    setCommentIndexAr((prevArr) => {
      if (prevArr.includes(index)) {
        return prevArr.filter((i) => i !== index);
      } else {
        return [...prevArr, index];
      }
    });
  };

  return (
    <>
      {comment.map((comment: Comment, index: number) => (
        <>
          <CommentCards
            handleComment={() => handleCommentClick(index)}
            handleReply={() => handleReplyClick(index)}
            like={1}
            comment={2}
            img="A"
            name={comment.user.displayName}
            date={comment.date}
            Comment={comment.text}
          />
          <div
            className={`${
              replyIndexAr.includes(index) ? "block" : "hidden"
            } mt-3 `}
          >
            <CreateComment />
          </div>
          <div className={`${
              commentIndexAr.includes(index) ? "block" : "hidden"} pl-9 gap-3`}>
            <CommentCards
              handleReply={() => handleCommentClick(index)}
              handleComment={() => handleCommentClick(index)}
              like={1}
              comment={1}
              img="J"
              name={`Jono Nombeng`}
              date={`November 1, 2000`}
              Comment={`Ow come on you so bad at design😥`}
            />
          </div>
        </>
      ))}
    </>
  );
};

export default UsersComments;
