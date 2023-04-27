import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useParams } from "react-router-dom";

import Like from "./comment_like_share/like";
import Comment from "./comment_like_share/comment";
import Share from "./comment_like_share/share";
import apiCall from "../../API/Api-call";
import UserAvatar from "../reusableComponent/userAvatar";
import UserComment from "./usercomment/UserComment";
import { PostObj } from "./post";


function idpost() {
  const postId = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<PostObj>({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiCall(
          "get",
          `http://localhost:4000/route/single-post/${postId.postId}`
        );
        setPost({
          _id: response.data[0]._id,
          userId: response.data[0].userId,
          displayName: response.data[0].displayName,
          title: response.data[0].title,
          content: response.data[0].content,
          date: response.data[0].date,
          profilePicture: response.data[0].profilePicture || null,
          numComments: response.data[0].numComments 
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-4 px-12 border border-gray-200 rounded-xl">
      <div className="flex justify-between">
        <div className="flex gap-6">
          {loading ? (
            <Skeleton circle={true} width={"2.5rem"} height={"2.5rem"} />
          ) : (
            <div className="flex justify-center items-center w-10 h-10 bg-slate-600 rounded-full text-white overflow-hidden">
              <UserAvatar
                profilePicture={post.profilePicture}
                displayName={post.displayName}
              />
            </div>
          )}
          <div>
            <p className="font-semibold">
              {loading ? (
                <Skeleton width={"10rem"} height={"1rem"} />
              ) : (
                post.displayName
              )}
            </p>
            <p className="font-thin text-[.75rem] text-gray-600">
              {loading ? (
                <Skeleton width={"7rem"} height={".75rem"} />
              ) : (
                <span className="font-[400] text-[.75rem text-gray-500">
                  Posted on {post.date}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Like Like={6} />
          <Link to="#comment">
            <Comment numComments={2} />
          </Link>
          <Share />
        </div>
      </div>
      <div className="mt-6">
        <h1 className="text-[2rem] font-extrabold">
          {loading ? <Skeleton width={"100%"} height={"1.5rem"} /> : post.title}
        </h1>
        <div>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  width={index === 2 || index === 4 ? "50%" : "100%"}
                  height={"1rem"}
                />
              ))}
            </div>
          ) : (
            <p>{post.content}</p>
          )}
        </div>
      </div>
      <UserComment id="comment" numComments={post.numComments} />
    </div>
  );
}

export default idpost;
