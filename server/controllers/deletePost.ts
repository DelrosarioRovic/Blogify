import express, { Request, Response } from "express";
import Post from "../models/post.model";
import Comment from "../models/comment.model";


const router = express.Router();

router.delete("/deletePost", async(req: Request, res: Response) => {

    const { id } = req.body;

    // Delete all comments associated with the post
    await Comment.deleteMany({ post: id });

    // Delete the post itself
    await Post.findByIdAndDelete(id);

    res.status(200).json({message: "Successfully deleted"});
});

export default router;