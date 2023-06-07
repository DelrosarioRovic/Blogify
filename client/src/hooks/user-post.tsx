import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ApiCall from "../API/Api-call";
import useAuthentication from "./isAuthenticated";
import { PostObj } from "../interface/hook/PostObj";
import axios from "axios";


const UserPost = () => {
    const otherUser = useParams();
    const { data } = useAuthentication();
    const [totalPost, setTotalPost] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [userPost, setUserPost] = useState<PostObj[]>([]);

    const fetchingPost = async () => {
        const limit: number = 2;
        const skip: number = userPost.length;
        let url = `https://blogify-api-server.vercel.app/route/user-post/${data?._id}?limit=${limit}&skip=${skip}`;
        if (otherUser && otherUser.profileId) {
            url = `https://blogify-api-server.vercel.app/route/user-post/${otherUser.profileId}?limit=${limit}&skip=${skip}`;
        }
        const response =  await axios.get(url);
        if (response.data.userPost.length === 0 && response.data.totalPost === 0) {
            setUserPost([]);
            setTotalPost(0);
            setLoading(false);
        } else {
            const newUserPosts = response.data.userPost.map((post: PostObj, index: number) => ({
                ...post,
                key: index,
              }));
            response.status === 200 && 
            setUserPost([...userPost, ...newUserPosts]),
            setTotalPost(response.data.totalPost);
            setLoading(false);
            if (newUserPosts < limit) {
                setHasMore(false);
            }
        }
        
    };

    useEffect (() => {
        fetchingPost();
    }, otherUser && otherUser.profileId ? []:[data]);

    return { userPost, loading, hasMore, fetchingPost, totalPost }
}

export default UserPost;
