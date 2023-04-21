import { Link } from "react-router-dom";
import Comment from "./comment_like_share/comment";
import Like from "./comment_like_share/like";
import Share from "./comment_like_share/share";
function post() {
  return (
    <div className=" max-w-4xl mx-auto  flex flex-col gap-4">
      <Link to={`id`}>
        <p className=" text-[2rem] font-bold">
          The Dangers of Enforcing a Premature Return To Office Policy
        </p>
      </Link>
      <p className="text-gray-800">
        LOREM IPSUM GENERATOR Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum....
      </p>
      <div className=" flex gap-4 justify-start items-center text-gray-500 font-semibold">
        <p className="text-[.85rem] ">Alexiess Manalastas</p>
        <p className=" text-[.85rem] ">03/21/2024</p>
        <div className="flex flex-row gap-2 ">
          <Like Like={2} />
          <Link to={`/id#comment`}>
            <Comment comments={6} />
          </Link>
          <Share />
        </div>
      </div>
    </div>
  );
}

export default post;
