import React from "react";
import { ImageUploader } from "./uploadPicture";
import cloudApi from "../API/cloudPhotoUrl";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface displayImage {
    addPic: string;
    setAddPic: React.Dispatch<React.SetStateAction<string>>;
}

const uploadImageDisplay:React.FC<displayImage> = (props) => {
    const { uploadingPromise } = cloudApi();
    const handleRemoveImg = () => {
        props.setAddPic("");
    }

    return <div className="flex gap-x-7">
        <div className="relative flex w-1/4">
            {uploadingPromise ? 
                <Skeleton /> : 
                <img src={`${props.addPic}`} className="w-full h-32 object-contain"/> 
            }
        </div>
        <div className="flex flex-row items-start gap-3">
            <ImageUploader setAddPic={props.setAddPic} buttonName="Change"/>
            <button className="" onClick={handleRemoveImg}>Remove</button>    
        </div>
    </div>


}

export default uploadImageDisplay;