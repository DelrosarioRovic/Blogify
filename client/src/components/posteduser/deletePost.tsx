import React from "react"
import ApiCall from "../../API/Api-call";

interface deletetype {
    type: string;
    id: string;
}
const deletePost:React.FC<deletetype> = (props) => {
    let url = `http://localhost:4000/deletePost`;
    const handleDelete = async() => {
        const response = await ApiCall("delete", url, {id: props.id} );

        console.log(response.status);
    }


    return (
        <button onClick={handleDelete}>Delete</button>
    )
}


export default deletePost;