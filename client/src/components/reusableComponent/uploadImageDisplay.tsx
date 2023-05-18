import React from "react";
import { ImageUploader } from "./uploadPicture";

interface displayImage {
    addPic: string;
    setAddPic: React.Dispatch<React.SetStateAction<string>>;
}

const uploadImageDisplay:React.FC<displayImage> = (props) => {
    const handleRemoveImg = () => {
        props.setAddPic("");
    }

    return <>
        <div className="relative flex w-1/4">
            <img src={`${props.addPic}`} className="w-full h-32 object-contain"/>
            <div>
                <button className="absolute top-0 left-64" onClick={handleRemoveImg}>Remove</button>
                <ImageUploader setAddPic={props.setAddPic} />
            </div>
            
        </div>
    </>


}

export default uploadImageDisplay;