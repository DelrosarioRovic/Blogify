import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiCall from "../API/Api-call";
import { PostObj } from "./post";


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
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await ApiCall(
            "get",
            `http://localhost:4000/route/single-post/${postId.postId}`
          );
  
          setPost({
            _id: response.data.post[0]._id,
            userId: response.data.post[0].userId,
            displayName: response.data.post[0].displayName,
            title: response.data.post[0].title,
            content: response.data.post[0].content,
            date: response.data.post[0].date,
            profilePicture: response.data.post[0].profilePicture || null,
            numComments: response.data.post[0].numComments 
          });
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchPost();
    }, []);

    return { post, loading }

}

export default singlePost;