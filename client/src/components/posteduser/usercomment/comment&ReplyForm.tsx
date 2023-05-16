import React, { useState } from "react";

interface CommentReplyPropsForm {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleCloseReply?: () => void;
  placeholder?: string;
  row?: number;
  updateCurrentData?: any;
}

const CommentForm: React.FC<CommentReplyPropsForm> = (props) => {
  const [isShowBtn, setIsShowBtn] = useState<boolean>(false);

  return (
    <form onSubmit={props.handleSubmit} className="w-full">
      <textarea
        onClick={() => setIsShowBtn(true)}
        className="w-full border p-2 resize-y"
        id="email-input"
        placeholder={props.placeholder}
        rows={isShowBtn || props.updateCurrentData ? 4 : props.row}
        value={props.comment}
        onChange={(e) => props.setComment(e.target.value)}
        required
      ></textarea>
      {isShowBtn && (
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
