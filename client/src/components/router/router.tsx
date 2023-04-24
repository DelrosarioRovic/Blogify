import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Createpost from "../compose/createpost";
import Post from "../posteduser/post";
import Idpost from "../posteduser/idpost";

interface routerProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const router:React.FC<routerProps> = (props) => {
  return (
    <Routes>
      <Route path="/compose" element={props.isLogin ? <Createpost /> : <Navigate to="/" />} />
      <Route path="/" element={<Post />} />
      <Route path="/post/:postId" element={<Idpost />} />
    </Routes>
  );
}

export default router;
