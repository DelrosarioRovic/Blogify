import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiCall from "../API/Api-call";
// interface hook
import { PostObj } from "../interface/hook/PostObj";

const singlePost = () => {
  const postId = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<PostObj>({
    _id: '',
    userId: '',
    displayName: '',
    title: '',
    content: '',
    date: '',
    profilePicture: '',
    numComments: 0 
  });

  const fetchSinglePost = async () => {
    try {
      const response = await ApiCall(
        "get",
        `http://localhost:4000/route/single-post/${postId.postId}`
      );
      setPost(response.data.post[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSinglePost();
  }, []);

  return { post, loading };
};

export default singlePost;
