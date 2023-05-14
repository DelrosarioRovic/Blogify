import React from "react"
interface deletetype {
    type: string
}
const deletePost:React.FC<deletetype> = (props) => {
    const handleDelete = () => {
        props.type === "deletePost" ? 
        console.log("this post is delete") : 
        console.log("this comment is deleted");
    }


    return (
        <button onClick={handleDelete}>Delete</button>
    )
}


export default deletePost;