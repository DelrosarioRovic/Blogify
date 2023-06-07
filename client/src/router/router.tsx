import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthentication from "../hooks/isAuthenticated";
import CreatePost from "../pages/Createpost";
import Home from "../pages/Home";
import Single_post from "../pages/Single-post";
import UpdateComment from "../pages/Updatecomment";
import Profile from "../pages/Profile";
import ProfileSettings from "../pages/ProfileSettings";
import OtherProfile from "../pages/Otherprofile";

const router:React.FC = () => {
  const { authenticated } = useAuthentication();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/compose" element={authenticated ? <CreatePost /> : <Navigate to="/" />} />
      <Route path="/compose/:postId" element={authenticated ? <CreatePost /> : <Navigate to="/" />} /> 
      <Route path="/post/:postId" element={<Single_post />} />
      <Route path="/comment/:commentId" element={authenticated ? <UpdateComment /> : <Navigate to="/" /> } />
      <Route path="/profile" element={authenticated ? <Profile /> : <Navigate to="/" />} />
      <Route path="/profile/:profileId" element={<OtherProfile />} />
      <Route path="/profile/settings" element={authenticated ? <ProfileSettings /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default router;
