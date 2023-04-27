import { useState, useEffect } from "react";
import ApiCall from "../API/Api-call";

export interface PostObj {
  _id: string;
  userId: string;
  displayName: string;
  title: string;
  content: string;
  date: string;
  profilePicture: string | null;
  numComments: number;
}

const useFetchPosts = () => {
  const [posts, setPosts] = useState<PostObj[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMorePosts = async () => {
    const limit: number = 3;
    const skip: number = posts.length;
    const url = `http://localhost:4000/route/post?limit=${limit}&skip=${skip}`;
    const response = await ApiCall("GET", url);
    try {
      const newPosts = response.data.map((post: PostObj, index: number) => ({
        ...post,
        key: index,
      }));
      setPosts([...posts, ...newPosts]);
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

  return { posts, hasMore, fetchMorePosts };
};

export default useFetchPosts;
