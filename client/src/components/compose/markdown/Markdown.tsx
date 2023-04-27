import React from "react";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
  AiFillFileImage,
} from "react-icons/ai";
import { GoQuote, GoCode } from "react-icons/go";
export const Markdown = () => {
  return (
    <div className="flex gap-3 items-center justify-center bg-gray-400 py-2 bg-opacity-[.1]">
      <AiOutlineBold
        className="hover:text-blue-800 hover:bg-slate-300 p-[.3rem] rounded-md"
        size={30}
      />
      <AiOutlineItalic
        className="hover:text-blue-800 hover:bg-slate-300 p-[.3rem] rounded-md"
        size={30}
      />
      <AiOutlineLink
        className="hover:text-blue-800 hover:bg-slate-300 p-[.3rem] rounded-md"
        size={30}
      />
      <AiOutlineOrderedList
        className="hover:text-blue-800 hover:bg-slate-300 p-[.3rem] rounded-md"
        size={30}
      />
      <AiOutlineUnorderedList
        className="hover:text-blue-800 hover:bg-slate-300 p-[.3rem] rounded-md"
        size={30}
      />
      <div className="text-[20px] hover:text-blue-800 hover:bg-slate-300 px-2 rounded-md ">
        H
      </div>
      <GoQuote
        className="hover:text-blue-800 hover:bg-slate-300 p-[.3rem] rounded-md"
        size={30}
      />
      <GoCode
        className="hover:text-blue-800 hover:bg-slate-300 p-[.3rem] rounded-md"
        size={30}
      />
      <AiFillFileImage
        className="hover:text-blue-800 hover:bg-slate-300 p-[.3rem] rounded-md"
        size={30}
      />
    </div>
  );
};
