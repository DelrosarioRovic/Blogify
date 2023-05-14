import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Createpost from "../compose/createpost";
import Post from "../posteduser/post";
import Idpost from "../posteduser/idpost";
import useAuthentication from "../../hooks/isAuthenticated";

const router:React.FC = () => {
  const { authenticated } = useAuthentication();

  return (
    <Routes>
      <Route path="/compose" element={authenticated ? <Createpost /> : <Navigate to="/" />} />
      <Route path="/compose/:postId" element={<Createpost />} /> 
      <Route path="/" element={<Post />} />
      <Route path="/post/:postId" element={<Idpost />} />
    </Routes>
  );
}

export default router;
