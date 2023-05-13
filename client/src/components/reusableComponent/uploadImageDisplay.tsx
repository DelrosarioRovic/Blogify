import React from "react";

interface displayImage {
    addPic: string;
    setAddPic: React.Dispatch<React.SetStateAction<string>>;
}

const uploadImageDisplay:React.FC<displayImage> = (props) => {
    const handleRemoveImg = () => {
        props.setAddPic("");
    }

    return <>
        <div className="relative flex">
            <img src={`${props.addPic}`} className="w-full h-28 max-w-sm"/>
            <span className="absolute top-0 left-64" onClick={handleRemoveImg}>x</span>
        </div>
    </>


}

export default uploadImageDisplay;