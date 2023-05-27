import express, { Request, Response } from "express";
import Post from "../models/post.model";
import Comment from "../models/comment.model";
import User from "../models/users.model";

const router = express.Router();


router.post("/comment", async(req: Request, res: Response) => {
    const { comment, postId, update_id, current_user_id } = req.body;

    const current_user = await User.findById(current_user_id);
    if (!current_user) {
      return res.status(401).json({ message: "Please Sign in First" })
    }
   
    const specificPost:any = await Post.findById(postId.postId || postId);

    if (update_id) {
      const commentUpdate = await Comment.findByIdAndUpdate(update_id, {
        text: comment
      });
      if (!commentUpdate) {
        return res.status(404).json({ message: "Comment not found!!" });
      }
      return res.status(200).json({ message: "Success update a comment" });
    }else {
      const newComment = new Comment({
        text: comment,
        user: current_user.id,
        post: specificPost._id,
        date: Date.now()
      });
      
      await newComment.save();
      return res.status(200).json({ message: "Successfully added a comment" });
    }

   
});

router.post("/comment/:parentCommentId/replies", async(req: Request, res: Response)=> {
  const { comment, update_id, current_user_id } = req.body;
  const { parentCommentId } = req.params;

  const current_user = await User.findById(current_user_id);
    if (!current_user) {
      return res.status(401).json({ message: "Please Sign in First" })
    }
  
  try {
    const parentComment = await Comment.findById(parentCommentId);
    if (!parentComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (update_id) {
      const commentUpdate = await Comment.findByIdAndUpdate(update_id, {
        text: comment
      }); 
      if (!commentUpdate) {
        return res.status(404).json({ message: "Comment not found!!" });
      }
      return res.status(200).json({ message: "Success update a comment" });
    } else {
      const newComment:any = await Comment.create({
        text: comment,
        user: current_user.id,
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