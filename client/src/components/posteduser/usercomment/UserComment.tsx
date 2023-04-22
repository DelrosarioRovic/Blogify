import React from "react";
import Like from "../comment_like_share/like";
import Comment from "../comment_like_share/comment";
interface comment {
  id: string;
}

const UserComment = (props: comment) => {
  return (
    <div id={`${props.id}`} className="border-t px-12 py-6">
      <h1 className="mb-8"> Top Comments {"(8)"}</h1>
      <div className="flex gap-6 flex-row">
        <div className="h-8 w-8 rounded-full bg-black"></div>
        <form className="w-full">
          <textarea
            className="w-full border p-2 resize-y"
            id=""
            placeholder="Comment"
          ></textarea>
          <button className="bg-slate-600 px-6 py-2 text-white rounded-lg">
            Submit
          </button>
        </form>
      </div>

      <div className="flex flex-row gap-6 mt-6 overflow-hidden">
        <div className="h-8 w-8 rounded-full bg-red-700"></div>
        <div className="p-2 border w-full">
          <h1 className="font-semibold flex gap-3 items-center">
            Alexiess Manalastas
            <span className="bg-slate-500 h-1 w-1 rounded-full -ml-[8px]"></span>
            <span className="font-[400] text-[.75rem] text-gray-500 ">
              March, 21 2000
            </span>
          </h1>
          <div className="mt-2">
            Thanks Thomas! Your blue check is all the validation we need 😁
          </div>
          <div className="flex  flex-row gap-2 pt-4">
            <Like 
                Like={2}
            />
            <Comment comments={2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
