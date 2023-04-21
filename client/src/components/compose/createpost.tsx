import React from "react";

function createpost() {
  return (
    <div className="max-w-4xl mx-auto min-h-[500px] border p-4 rounded-lg">
      <form action="" method="post">
        <div className="flex flex-col gap-y-8">
          <input
            className="outline-none text-5xl pl-2 font-extrabold"
            placeholder="New post tittle here..."
            type="text"
            name=""
            id=""
          />
          <textarea
            className="outline-none pl-2 font-sans text-lg resize-none"
            placeholder="Write your post content here..."
            name=""
            id=""
            rows={10}
          ></textarea>
        </div>

        <button className="px-6 py-2 bg-slate-600 p text-white rounded-md">Post</button>
      </form>
    </div>
  );
}

export default createpost;
