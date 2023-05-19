import { useEffect } from "react";
import ApiCall from "../API/Api-call";
import { useParams } from "react-router-dom";
import useAuthentication from "./isAuthenticated";

const UserPost = () => {
    const otherUser = useParams();
    const { data } = useAuthentication();
    
    const fetchingPost = async () => {
        let url = `http://localhost:4000/route/user-post/${data?._id}`;
        if (otherUser && otherUser.profileId) {
            url = `http://localhost:4000/route/user-post/${otherUser.profileId}`;
        }
        const response = await ApiCall("get", url); 
    };

    useEffect(() => {
        fetchingPost();
    }, [data]);
    //data is working
}

export default UserPost;
