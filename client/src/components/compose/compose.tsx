import React, {useState} from "react";
import ApiCall from "../../API/Api-call";

const compose: React.FC = () => {
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


    return <div className="">
        <form className="flex flex-col w-1/2" onSubmit={handleSubmit}>
            <label htmlFor="compose-title-input">title</label>
            <input 
             type="text"
             className="bg-slate-200"
             id="compose-title-input"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             />
            <label htmlFor="compose-content-input">content</label>
            <input 
             type="text" 
             className="bg-slate-200"
             id="compose-content-input"
             value={content}
             onChange={(e) => setContent(e.target.value)}
            />
            <button>Submit</button>
        </form>
    </div>;
};

export default compose;
