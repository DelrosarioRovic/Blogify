import React from "react";
import Comments from "./Comments";
import CreateComment from "../usercomment/CreateComment";
interface comment {
  id: string;
}

const UserComment = (props: comment) => {
  return (
    <div id={`${props.id}`} className="border-t py-6 px-12 max-md:px-3">
      <h1 className="mb-8"> Comments {"(8)"}</h1>
      <CreateComment />
      <div className="pt-8">
        <Comments />
      </div>
    </div>
  );
};

export default UserComment;
