import express, { Request, Response } from "express";
import { MiddlewareAuth, CustomRequest } from "../middleware/middlewareAuth";
import Post from "../models/post.model";
import User from "../models/users.model";
import Comment from "../models/comment.model";

const router = express.Router();

router.post("/comment", MiddlewareAuth, async(req:CustomRequest, res: Response) => {
    const userId =  req.userId;
    const googleUserId = req.googleUserId;
  
    const userLocal = await User.findById(userId);
    const userProvider = googleUserId ? await User.findOne({ googleId: googleUserId }) : null;
    const localOrProvided:any = userLocal || userProvider;

    if (!localOrProvided) {
      console.log("User required");
      return res.status(401).json({message:"Please Sign In First"});
    }

    const { comment, postId } = req.body;
    const specificPost:any = await Post.findById(postId.postId);

    const newComment = new Comment({
      text: comment,
      user: localOrProvided.id,
      post: specificPost._id,
      date: Date.now()
    });

    newComment.save();


    console.log("Successfully Post Comment");
  

});


export default router;