import React from "react";
import { AiFillGithub, AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import { FaDev } from "react-icons/fa";
export default function footer() {
  const date = new Date();
  return (
    <div className="bg-gray-100 p-6 pb-0 bg-opacity-[.56] mt-11">
      <div className=" max-w-xl mx-auto text-center flex items-center justify-center flex-col gap-7">
        <p className="font-semibold text-[2rem] line-clamp-2 leading-9">
          Want us to email you with the latest blockbuster news
        </p>
        <form action="" className="flex bg-slate-200 rounded-[200px]">
          <input
            type="text"
            className="outline-none rounded-full pl-[15px] bg-transparent max-sm:w-full"
            placeholder="jhondoe@gmail.com"
          />
          <button className="bg-blue-700 p-2 py-3 px-4 m-1 rounded-[200px] text-white ">
            Subscribe
          </button>
        </form>
      </div>

      <div className=" grid lg:grid-cols-2 mt-16">
        <div className="max-w-md mx-auto flex flex-col justify-between">
          <div className="flex gap-2 text-gray-900 max-lg:mt-8 max-md:justify-center">
            <AiFillGithub size={30} />
            <AiFillFacebook size={30} />
            <AiFillLinkedin size={30} />
            <FaDev size={30} />
          </div>
        </div>

        <ul className="flex justify-center max-sm:gap-10 gap-24 font-semibold max-md:flex-col max-md:items-center max-md:gap-8 max-lg:mt-8">
          <li className="flex flex-col gap-2 max-md:items-center">
            Services
            <ul className="font-[400] flex flex-col max-md:items-center">
              <li>User profiles</li>
              <li>News feed</li>
              <li>Posts, text, images</li>
              <li>Commenting and reactions</li>
              <li>Notifications</li>
            </ul>
          </li>
          <li className="flex flex-col gap-2 max-md:items-center">
            About
            <ul className="font-[400] max-md:flex flex-col items-center">
              <li>About</li>
              <li>Careers</li>
              <li>History</li>
              <li>Team</li>
            </ul>
          </li>
          <li className="flex flex-col gap-2 max-md:items-center">
            Support
            <ul className="font-[400] flex flex-col max-md:items-center">
              <li>Buy me A coffee</li>
              <li>Contacts</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="border-t mt-8 flex items-center justify-center h-10">
        <footer className="text-center text-[.80rem] text-gray-500">
          © {date.getFullYear()} All rights reserved. Created Blogify
        </footer>
      </div>
    </div>
  );
}
