import { useEffect, useState } from "react";
import ApiCall from "../API/Api-call";
import { useParams } from "react-router-dom";
import useAuthentication from "./isAuthenticated";
import { PostObj } from "../interface/hook/PostObj";


const UserPost = () => {
    const otherUser = useParams();
    const { data } = useAuthentication();
    const [userPost, setUserPost] = useState<PostObj[]>([]);

    const fetchingPost = async () => {
        let url = `http://localhost:4000/route/user-post/${data?._id}`;
        if (otherUser && otherUser.profileId) {
            url = `http://localhost:4000/route/user-post/${otherUser.profileId}`;
        }
        const response = await ApiCall("get", url); 
        response.status === 200 && setUserPost(response.data.userPost);
    };

    return { fetchingPost, userPost }
}

export default UserPost;
