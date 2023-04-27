import { Markdown } from "./markdown/Markdown";
import React, {useState} from "react";
import { Navigate } from 'react-router-dom';
import ApiCall from "../../API/Api-call";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface picture {
  setaddPic: () => void
}
const createpost: React.FC<picture> = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [addPic, setaddPic] = useState("")
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
          const result = await ApiCall("POST", "http://localhost:3000/compose", {
              title,
              content,
            });
            if (result.status === 200) {
              toast.success(result.data.message);
            }
      } catch (error) {
          console.log(error)
      }
     
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-8 relative max-w-4xl mx-auto min-h-[500px]">
        <div className=" md:border rounded-md">
          <div className="p-5 flex flex-col">
            <div className="mb-3 w-auto py-2">
              <label
                htmlFor="uploadimage"
                className="border-[2px] border-gray-800 p-2 cursor-pointer rounded-md"
              >
                Add cover image
              </label>
              <input type="file" accept="image" id="uploadimage" onChange={(e) => setaddPic(e.target.value)} value={addPic} className="hidden" />
            </div>

            <img src={`${addPic}`} className="w-full"/>

            <input
              className="outline-none text-5xl pl-2 font-extrabold"
              type="text"
              id="compose-title-input"
              value={title}
              placeholder="New post title here..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <Markdown />
          <div className="flex flex-col p-5">
            <textarea
              className="outline-none pl-2 font-sans text-lg resize-none"
              placeholder="Write your post content here..."
              id="compose-content-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
            ></textarea>
          </div>
        </div>
        <button className="px-8 py-[.35rem] bg-slate-600 mt-8 text-white rounded-md max-lg:ml-4">
          Post
        </button>
      </div>
    </form>
  );
};

export default createpost;
