import React, {useState} from "react";
import ApiCall from "../../API/Api-call";

const createpost:React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
          const result = await ApiCall("POST", "http://localhost:3000/compose", {
              title,
              content,
            });
          console.log(result);
      } catch (error) {
          console.log(error)
      }
     
  }


  return (
    <div className="max-w-4xl mx-auto min-h-[500px] border p-4 rounded-lg">
      <form onSubmit={handleSubmit} >
        <div className="flex flex-col gap-y-8">
          <input
            className="outline-none text-5xl pl-2 font-extrabold"
             type="text"
             id="compose-title-input"
             value={title}
             placeholder="New post title here..."
             onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="outline-none pl-2 font-sans text-lg resize-none"
            placeholder="Write your post content here..."

          ></textarea>
        </div>

        <button className="px-6 py-2 bg-slate-600 p text-white rounded-md">Post</button>
      </form>
    </div>
  );
}

export default createpost;
