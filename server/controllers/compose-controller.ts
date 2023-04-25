import express, { Request, Response } from "express";
import { MiddlewareAuth, CustomRequest } from "../middleware/middlewareAuth";
import Post from "../models/post.model";
import User from "../models/users.model";

const router = express.Router();


router.post("/compose", MiddlewareAuth, async(req:CustomRequest, res: Response) => {
    
    const userId =  req.userId;
    const googleUserId = req.googleUserId;
    
    const userLocal = await User.findById(userId);
    const userProvider = await User.findOne({ googleId: googleUserId });
  
    const localOrProvided:any = userLocal || userProvider;

    const { title, content } = req.body;

    const newPost = new Post({
        user: localOrProvided._id,
        title: title,
        content: content,
        date: Date.now()
      });
      newPost.save();
      res.status(200).json({message: "Post created successfully!"});

});

export default router;