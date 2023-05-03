import express, { Request, Response } from "express";
import { MiddlewareAuth, CustomRequest } from "../middleware/middlewareAuth";
import Post from "../models/post.model";
import Like from "../models/like.model";
import userAuth from "../middleware/userAuth";

const router = express.Router();

router.get("/like/:postId", MiddlewareAuth, async (req: CustomRequest, res: Response) => {
  const postId = req.params.postId;
  const localOrProvided = await userAuth(req);
  
  if (!localOrProvided) {
    console.log("User required");
    return res.status(401).json({ message: "Please Sign In First" });
  }

  const like = await Like.findOne({ post: postId, user: localOrProvided.id });

  if (like) {
    await like.deleteOne();
    return res.status(200).json({ message: "Post unliked" });
  } else {
    const specificPost: any = await Post.findById(postId);

    const newLike = new Like({
      user: localOrProvided.id,
      post: specificPost._id,
      date: Date.now(),
    });
    
    await newLike.save();

    return res.status(200).json({ message: "Post liked" });
  }
});

export default router;
