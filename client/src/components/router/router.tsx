import React from "react";
import { Routes, Route } from "react-router-dom";
import Createpost from "../compose/createpost";
import Post from "../posteduser/post";
import Idpost from "../posteduser/idpost";
function router() {
  return (
    <Routes>
      <Route path="/compose" element={<Createpost />} />
      <Route path="/" element={<Post />} />
      <Route path="/id" element={<Idpost />} />
    </Routes>
  );
}

export default router;
