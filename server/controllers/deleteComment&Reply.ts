import express, { Request, Response } from "express";
import Post from "../models/post.model";
import Comment from "../models/comment.model";

const router = express.Router();

async function deleteComment(commentId: any) {
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return false;
      }
      await Comment.deleteOne({ _id: commentId }); 
      if (comment.replies && comment.replies.length > 0) {
        // Recursively delete nested replies
        for (const replyId of comment.replies) {
          await deleteComment(replyId);
        }
      }
      return true; 
    } catch (error) {
      console.error(error);
      return false; 
    }
  }

router.delete("/deleteComment", async(req: Request, res: Response) => {

    const {id, parentId, current_id} = req.body;

    if (parentId) {
        const parentComment:any = await Comment.findById(parentId);
        const comment = await Comment.findById(id);
        
        if (parentComment.replies.includes(comment?.id)) {
            await deleteComment(id);
            res.status(200).json({message: "Successfully delete a comment"});
        }
     
    } else {
        await deleteComment(id);
        res.status(200).json({message: "Successfully delete a comment"});
    }
});


export default router;