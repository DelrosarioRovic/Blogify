import React from "react";
import ApiCall from "../../API/Api-call";


interface deletetype {
    id?: string;
    typeCR?: string;
    parentCommentId?: string;
}

const deleteCR:React.FC<deletetype> = (props)=> {
    const handleDelete = async() => {
        let url = `http://localhost:4000/deleteComment`;
        if (props.parentCommentId) {
            url = `http://localhost:4000/deleteReply/${props.parentCommentId}`;
        }
        const response = await ApiCall("delete", url, {
            id: props.id,
            parentCommentId: props.parentCommentId && props.parentCommentId,
        });

        console.log(response);
    }
   
    return (
        <button onClick={handleDelete}>
            Delete
        </button>
    )

}

export default deleteCR;