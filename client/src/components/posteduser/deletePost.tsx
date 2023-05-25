import React from "react"
import ApiCall from "../../API/Api-call";

interface deletetype {
    id: string;
}
const deletePost:React.FC<deletetype> = (props) => {
    let url = `https://blogify-api-server.vercel.app/deletePost`;
    const handleDelete = async() => {
        const response = await ApiCall("delete", url, {id: props.id} );
    }

    return (
        <button className="w-full h-full block py-1 text-left" onClick={handleDelete}>Delete</button>
    )
}


export default deletePost;