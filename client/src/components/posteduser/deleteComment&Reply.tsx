import React from "react";
import ApiCall from "../../API/Api-call";
import SinglePost from "../../hooks/single-post";


interface deletetype {
    id?: string;
    typeCR?: string;
    parentCommentId?: string;
}

const deleteCR:React.FC<deletetype> = (props)=> {
    const { handleIncrement } = SinglePost();
    const handleDelete = async() => {
        let url = `https://blogify-api-server.vercel.app/deleteComment`;

        const response = await ApiCall("delete", url, {
            id: props.id,
            parentId: props.parentCommentId && props.parentCommentId,
        });

        response.status === 200 && handleIncrement();
    }
   
    return (
        <button onClick={handleDelete}>
            Delete
        </button>
    )

}

export default deleteCR;