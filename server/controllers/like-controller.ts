import express, { Request, Response } from "express";
import { MiddlewareAuth, CustomRequest } from "../middleware/middlewareAuth";
import Post from "../models/post.model";
import userAuth from "../middleware/userAuth";
import Comment from "../models/comment.model";

const router = express.Router();

router.put(
  "/like/:postId",
  MiddlewareAuth,
  async (req: CustomRequest, res: Response) => {
    try {
      const postId = req.params.postId;
      const userId: any = await userAuth(req);

      if (!userId) {
        return res.status(401).json({ message: "Please Sign In First" });
      }

      const post = await Post.findOne({
        _id: postId,
        likes: { $elemMatch: { $eq: userId._id } },
      });
      const likedByUser = !!post;

      let updateQuery;
      if (likedByUser) {
        // Remove the user from the "likes" array and decrement the "like" count
        updateQuery = {
          $pull: { likes: userId._id },
          $inc: { likeCount: -1 },
        };
      } else {
        // Add the user to the "likes" array and increment the "like" count
        updateQuery = {
          $addToSet: { likes: userId._id },
          $inc: { likeCount: 1 },
        };
      }

      await Post.findByIdAndUpdate(postId, updateQuery, {
        new: true,
      });
    
      return res.status(200).json({ message: "Successfully Like" });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  }
);

router.put(
  "/like/:like_comment_id/like-comment",
  MiddlewareAuth,
  async (req: CustomRequest, res: Response) => {
    try {
      const commentId = req.params.like_comment_id;
      const userId: any = await userAuth(req);
      if (!userId) {
        return res.status(401).json({ message: "Please Sign In First" });
      }

      const comment = await Comment.findOne({
        _id: commentId,
        likes: { $elemMatch: { $eq: userId._id } },
      });
      const likedByUser = !!comment;

      let updateQuery;
      if (likedByUser) {
        // Remove the user from the "likes" array and decrement the "like" count
        updateQuery = {
          $pull: { likes: userId._id },
          $inc: { likeCount: -1 },
        };
      } else {
        // Add the user to the "likes" array and increment the "like" count
        updateQuery = {
          $addToSet: { likes: userId._id },
          $inc: { likeCount: 1 },
        };
      }

      await Comment.findByIdAndUpdate(commentId, updateQuery, {
        new: true,
      });
      return res.status(200).json({ message: "Successfully Like a comment" });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  }
);


export default router;
