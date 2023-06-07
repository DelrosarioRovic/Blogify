import express, { Request, Response } from "express";
import Post from "../models/post.model";
import Comment from "../models/comment.model";
import User from "../models/users.model";

const router = express.Router();

router.post(
  "/like/:postId",
  async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;
      const userId = req.body.current_user_id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).json({ message: "You need to login First."});
      }

      const post = await Post.findOne({
        _id: postId,
        likes: { $elemMatch: { $eq: user._id } },
      });
      const likedByUser = !!post;

      let updateQuery : any;
      if (likedByUser) {
        // Remove the user from the "likes" array and decrement the "like" count
        updateQuery = {
          $pull: { likes: user._id },
          $inc: { likeCount: -1 },
        };
      } else {
        // Add the user to the "likes" array and increment the "like" count
        updateQuery = {
          $addToSet: { likes: user._id },
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

router.post(
  "/like/:like_comment_id/like-comment",
  async (req: Request, res: Response) => {
    const userId = req.body.current_user_id;
    const user: any = User.findById(userId);
    if (!user) {
      return res.status(401).json({message: "You need to login First."});
    }
    try {
      const commentId = req.params.like_comment_id;
      const comment = await Comment.findOne({
        _id: commentId,
        likes: { $elemMatch: { $eq: user._id } },
      });
      const likedByUser = !!comment;

      let updateQuery: any;
      if (likedByUser) {
        // Remove the user from the "likes" array and decrement the "like" count
        updateQuery = {
          $pull: { likes: user._id },
          $inc: { likeCount: -1 },
        };
      } else {
        // Add the user to the "likes" array and increment the "like" count
        updateQuery = {
          $addToSet: { likes: user._id },
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
