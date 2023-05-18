import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreatePost from "../pages/Createpost";
import Home from "../pages/Home";
import Single_post from "../pages/Single-post";
import useAuthentication from "../hooks/isAuthenticated";
import UpdateComment from "../pages/Updatecomment";

const router:React.FC = () => {
  const { authenticated } = useAuthentication();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/compose" element={authenticated ? <CreatePost /> : <Navigate to="/" />} />
      <Route path="/compose/:postId" element={authenticated ? <CreatePost /> : <Navigate to="/" />} /> 
      <Route path="/post/:postId" element={<Single_post />} />
      <Route path="/comment/:commentId" element={authenticated ? <UpdateComment /> : <Navigate to="/" /> } />
    </Routes>
  );
}

export default router;
