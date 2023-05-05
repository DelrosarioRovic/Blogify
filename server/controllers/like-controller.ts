import express, { Request, Response } from "express";
import { MiddlewareAuth, CustomRequest } from "../middleware/middlewareAuth";
import Post from "../models/post.model";
import Like from "../models/like.model";
import userAuth from "../middleware/userAuth";
import Comment from "../models/comment.model";

const router = express.Router();

router.get(
  "/like/:postId",
  MiddlewareAuth,
  async (req: CustomRequest, res: Response) => {
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
  }
);

router.get(
  "/like/:like_comment_id/like-comment",
  MiddlewareAuth,
  async (req: CustomRequest, res: Response) => {
    const commentId = req.params.like_comment_id;
    const localOrProvided = await userAuth(req);

    if (!localOrProvided) {
      console.log("User required");
      return res.status(401).json({ message: "Please Sign In First" });
    }

    const comment: any = await Comment.findById(commentId);
    const like_comment = await Like.findOne({
      post: comment.post,
      user: localOrProvided.id,
      comment: comment._id,
    });

    if (like_comment) {
      await like_comment.deleteOne();
      return res.status(200).json({ message: "Post unliked" });
    } else {
      const newLike = new Like({
        user: localOrProvided.id,
        post: comment.post,
        comment: comment._id,
        date: Date.now(),
      });

      await newLike.save();
      console.log("successfully Like a comment");
      return res.status(200).json({ message: "Post liked" });
    }
  }
);

export default router;
