import { useState, useEffect } from "react";
// interface hook
import { PostObj } from "../interface/hook/PostObj";
import axios from "axios";

const useFetchPosts = () => {
  const [posts, setPosts] = useState<PostObj[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  
  const fetchMorePosts = async () => {
    const limit: number = 4;
    const skip: number = posts.length;
    const url = `https://blogify-api-server.vercel.app/route/post?limit=${limit}&skip=${skip}`;
    const response =  await axios.get(url);
    try {
      const newPosts = response.data.map((post: PostObj, index: number) => ({
        ...post,
        key: index,
      }));
  
      setPosts([...posts, ...newPosts]);
      setLoading(false);
      if (newPosts < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchMorePosts();
  }, []);


  return { posts, hasMore, fetchMorePosts, loading, setLoading };
};

export default useFetchPosts;
