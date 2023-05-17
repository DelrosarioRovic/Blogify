import express, { Request, Response } from "express";
import { MiddlewareAuth, CustomRequest } from "../middleware/middlewareAuth";
import Post from "../models/post.model";
import Comment from "../models/comment.model";
import userAuth from "../middleware/userAuth";

const router = express.Router();

router.delete("/deletePost", MiddlewareAuth, async(req: CustomRequest, res: Response) => {
    const localOrProvided = await userAuth(req);
    const { id } = req.body;
    if (!localOrProvided) {
      console.log("User required");
      return res.status(401).json({ message: "Please Sign In First" });
    }

    // Delete all comments associated with the post
    await Comment.deleteMany({ post: id });

    // Delete the post itself
    await Post.findByIdAndDelete(id);

    res.status(200).json({message: "Successfully deleted"});
});

export default router;