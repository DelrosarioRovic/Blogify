import express, { Request, Response } from "express";
import { MiddlewareAuth, CustomRequest } from "../middleware/middlewareAuth";
import userAuth from "../middleware/userAuth";
import Post from "../models/post.model";
import Comment from "../models/comment.model";

const router = express.Router();


router.post("/comment", MiddlewareAuth, async(req:CustomRequest, res: Response) => {
     const localOrProvided = await userAuth(req);

    if (!localOrProvided) {
      console.log("User required");
      return res.status(401).json({message:"Please Sign In First"});
    }

    const { comment, postId, id } = req.body;
   
    
    const specificPost:any = await Post.findById(postId.postId || postId);

    if (id) {
      const commentUpdate = await Comment.findByIdAndUpdate(id, {
        text: comment
      });
      if (!commentUpdate) {
        return res.status(404).json({ message: "Comment not found!!" });
      }
      return res.status(200).json({ message: "Success update a comment" });
    }else {
      const newComment = new Comment({
        text: comment,
        user: localOrProvided.id,
        post: specificPost._id,
        date: Date.now()
      });
  
      await newComment.save();
      return res.status(200).json({ message: "Successfully added a comment" });
    }

   
});

router.post("/comment/:parentCommentId/replies", MiddlewareAuth, async(req:CustomRequest, res: Response)=> {
  const { comment, id } = req.body;
  const { parentCommentId } = req.params;
  const localOrProvided = await userAuth(req);
  
  if (!localOrProvided) {
    console.log("User required");
    return res.status(401).json({message:"Please Sign In First"});
  }
 
  try {
    const parentComment = await Comment.findById(parentCommentId);
    if (!parentComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (id) {
      const commentUpdate = await Comment.findByIdAndUpdate(id, {
        text: comment
      }); 
      if (!commentUpdate) {
        return res.status(404).json({ message: "Comment not found!!" });
      }
      return res.status(200).json({ message: "Success update a comment" });
    } else {
      const newComment:any = await Comment.create({
        text: comment,
        user: localOrProvided.id,
        post: parentComment.post,
        parentComment: parentCommentId,
        date: Date.now()
      });
      parentComment.replies.push(newComment);
      await parentComment.save();

      return res.status(200).json({ message: "Successfully added a comment" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;