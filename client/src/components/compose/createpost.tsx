import React, {useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link ,useLocation, Navigate} from "react-router-dom";

import { Markdown } from "./markdown/Markdown";
import ApiCall from "../../API/Api-call";
import { ImageUploader } from "../reusableComponent/uploadPicture";
import UploadImageDisplay from "../reusableComponent/uploadImageDisplay";
import { PostObj } from "../../interface/hook/PostObj";

const createpost: React.FC = () => {
  //use for sending state from other location
  const location = useLocation();
  const updateCurrentData: PostObj = location.state;

  const [promise, setPromise] = useState<boolean>(false);
  const [isSuccessFullySubmitted, setSuccessFullySubmitted] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(updateCurrentData ? updateCurrentData.title : "");
  const [content, setContent] = useState<string>(updateCurrentData ? updateCurrentData.content : "");
  const [addPic, setaddPic] = useState<string>(updateCurrentData ? updateCurrentData.picture || "" : "");
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setPromise(true);
      try {
        const result = await ApiCall("POST", "http://localhost:4000/compose", {
            _id: updateCurrentData ? updateCurrentData._id : "",
            title,
            content,
            addPic
          });
          if (result.status === 200) {
            toast.success(result.data.message);
            setSuccessFullySubmitted(true);
          } 
      } catch (error) {
          console.log(error)
      } finally {
        setPromise(false);
      }
  }

  // redirect to home page if the request is successfull.
  if (isSuccessFullySubmitted) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-12 relative max-w-4xl mx-auto min-h-[500px]">
        <div className=" md:border rounded-md">
          <div className="p-5 flex flex-col">
            <div className="mb-3 w-auto py-2">
              <label
                htmlFor="uploadimage"
                className="border-[2px] border-gray-800 p-2 cursor-pointer rounded-md"
              >
                Add cover image
              </label>
              
            </div>
            <ImageUploader setAddPic={setaddPic} />
            
              {addPic !== "" && (
                <UploadImageDisplay addPic={addPic} setAddPic={setaddPic}/>
              )}
            
            <input
              className="outline-none text-5xl pl-2 font-extrabold"
              type="text"
              id="compose-title-input"
              value={title}
              placeholder="New post title here..."
              onChange={(e) => setTitle(e.target.value)}
              required
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
              required
            ></textarea>
          </div>
        </div>
        <div className="gap-2 flex">
          <button className={`px-8 py-[.35rem] bg-slate-600 md:mt-6 text-white text-lg font-semibold active:scale-90 duration-300 rounded-md max-lg:ml-4
          ${promise && "opacity-50"}`}>
            { updateCurrentData ? "Update": "Post" }
          </button>
          <span className="px-7 py-[0.5rem] bg-slate-600 md:mt-6 text-white text-lg font-semibold active:scale-90 duration-300 rounded-md max-lg:ml-4 cursor-pointer">
            <Link to={"/"}>Cancel</Link>
          </span>
        </div>
        
      </div>
    </form>
  );
};

export default createpost;
