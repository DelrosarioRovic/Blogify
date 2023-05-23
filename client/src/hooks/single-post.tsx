import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import  { incrementRefreshCount } from "../redux/reducer/reUpdateUseState";
import ApiCall from "../API/Api-call";
// interface hook
import { PostObj } from "../interface/hook/PostObj";
import { Comment } from "../interface/hook/CommentObj";

const SinglePost = () => {
  const refreshCount = useSelector((state: any) => state.isSuccessReducer.refreshCount);
  const dispatch = useDispatch();
  const postId = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [comment, setComment] = useState<Comment[]>([]);
  const [post, setPost] = useState<PostObj>({
    _id: '',
    userId: '',
    displayName: '',
    bio: '',
    title: '',
    content: '',
    date: '',
    profilePicture: '',
    numComments: 0 ,
    numLikes: 0 ,
    picture: '',
    likes: ['']
  });
  
  const fetchSinglePost = async () => {
    try {
      const response = await ApiCall(
        "get",
        `http://localhost:4000/route/single-post/${postId.postId}`
      );
      setPost(response.data.post[0]);
      setComment(response.data.comments);
      setLoading(false);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (postId && postId.postId) {
      fetchSinglePost();
    }
  }, [postId, dispatch, refreshCount]);
  
  const handleIncrement = () => {
    dispatch(incrementRefreshCount());
  };

  return { post, comment, loading, handleIncrement };
};

export default SinglePost;
