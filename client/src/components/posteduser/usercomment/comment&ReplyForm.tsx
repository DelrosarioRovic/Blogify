import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthentication from "../../../hooks/isAuthenticated";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CommentReplyPropsForm {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleCloseReply?: () => void;
  placeholder?: string;
  row?: number;
  updateCurrentData?: any;
  focus?:any
}

const CommentForm: React.FC<CommentReplyPropsForm> = (props) => {
  const { authenticated } = useAuthentication();
  const [isShowBtn, setIsShowBtn] = useState<boolean>(false);

  useEffect(() => {
    if (props.focus && props.focus.current) {
      const textarea = props.focus.current;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [props.focus]);

  return (
    <form onSubmit={props.handleSubmit} className="w-full">
      <textarea
        ref={props.focus}
        onClick={authenticated ? 
          ()=> setIsShowBtn(true) : 
          ()=> toast.info("Please Login First")
        }
        className="w-full border p-2 resize-y"
        id="email-input"
        placeholder={props.placeholder}
        rows={isShowBtn || props.updateCurrentData ? 4 : props.row}
        value={props.comment}
        onChange={(e) => props.setComment(e.target.value)}
        required
      ></textarea>
      
      {props.updateCurrentData ? (
        <div className="flex gap-2">
          <button className="bg-slate-600 px-6 py-2 text-white rounded-lg">
            Update
          </button>
          <span className="bg-slate-600 px-6 py-2 text-white rounded-lg cursor-pointer">
            {props.updateCurrentData && <Link to={`/post/${props.updateCurrentData.postId}`}>Cancel</Link>}
          </span>
        </div>
      ): isShowBtn && (
        <button className="bg-slate-600 px-6 py-2 text-white rounded-lg">
          Submit
        </button>
      )}
     

    </form>
  );
};

const ReplyForm: React.FC<CommentReplyPropsForm> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="w-full">
      <textarea
        className="w-full border p-2 resize-y"
        id="email-input"
        placeholder={props.placeholder}
        rows={4}
        value={props.comment}
        onChange={(e) => props.setComment(e.target.value)}
        required
      ></textarea>
      <div className=" flex  gap-3">
        <button className="bg-slate-600 px-6 py-2 text-white rounded-lg active:scale-75 duration-300">
          Submit
        </button>
        <span
          onClick={props.handleCloseReply}
          className=" cursor-pointer bg-slate-600 px-6 py-2 text-white rounded-lg active:scale-75 duration-300"
        >
          cancel
        </span>
      </div>
    </form>
  );
};

export { CommentForm, ReplyForm };
