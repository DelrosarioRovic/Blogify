import Like from "../../../reusableComponent/like";
import Comment from "../../../reusableComponent/comment";
import CrudMenu from "../crudMenu";
import useAuthentication from "../../../hooks/isAuthenticated";
import { useParams } from "react-router-dom";
import DisplayName from "../../../reusableComponent/displayName";
import UserAvatar from "../../../reusableComponent/userAvatar";

interface CardInfo {
  comment_id?: string;
  displayName: string;
  date: string;
  Comment: string;
  bio: string;
  profilePicture: string;
  parentCommentId?: string;
  commentUserId: string;
  like: number;
  comment: number;
  handleReply?: () => void;
  handleComment: () => void;
  isMaxDepth: boolean;
  likeComment: [string];
}

const CommentCards = (props: CardInfo) => {
  const postId = useParams().postId;
  const { data, authenticated } = useAuthentication();

  return (
    <div className="flex flex-row gap-3 mt-3">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8">
          <div className="overflow-hidden h-8 w-8 rounded-full bg-red-500 flex justify-center items-center text-white">
            <UserAvatar 
              size="w-11 h-11"
              displayName={props.displayName}
              profilePicture={props.profilePicture}
            />
          </div>
        </div>
        <div className="w-[1px] h-full bg-slate-600 rounded-full"></div>
      </div>

      <div className="p-2 border w-full">
        <div className="flex justify-between">
          <h1 className="font-semibold flex sm:gap-3 sm:items-center max-sm:text-[.80rem] whitespace-nowrap max-sm:flex-col hover:text-blue-900">
            <DisplayName 
              userId={props.commentUserId}
              displayName={props.displayName}
              profilePicture={props.profilePicture}
              bio={props.bio}
              size="w-11 h-11"
            />
            <span className="bg-slate-500 h-1 w-1 rounded-full -ml-[8px] max-sm:hidden"></span>
            <span className="font-[400] text-[.70rem] text-gray-500 ">
              {props.date}
            </span>
          </h1>
          { props.commentUserId === data?._id && authenticated && (
            <CrudMenu 
              commentId={props.comment_id}
              content={props.Comment}
              toEdit={`/comment/${props.comment_id}`} 
              toShare="" 
              type="comment"
              postId={postId}
              typeCR={props.parentCommentId ? "reply": "comment"}
              parentCommentId={props.parentCommentId && props.parentCommentId} 
            /> 
          )}
        </div>
        
        <div className="mt-2">{props.Comment}</div>
        <div className="flex flex-row items-center gap-2 pt-4">
          <span>
            <Like 
              Like={props.like} 
              type="like-comment" 
              like_comment_id={props.comment_id} 
              likes={props.likeComment} 
            />
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
