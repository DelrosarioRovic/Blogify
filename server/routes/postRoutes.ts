import { Router, Request, Response } from "express";
import Post from "../models/post.model";
import Comment from "../models/comment.model";

const router = Router();


const getPostAggregatePipeline = () => {
  return [
    {
      $lookup: { from: "users", localField: "user", foreignField: "_id", as: "user", },
    },
    {
      $unwind: "$user",
    },
    {
      $lookup: { from: "comments", localField: "_id", foreignField: "post", as: "comments", },
    },
    {
      $project: {
        _id: 1,
        userId: "$user._id",
        displayName: "$user.displayName",
        title: 1,
        content: 1,
        date: { $dateToString: { format: "%m/%d/%Y", date: "$date" } },
        profilePicture: "$user.profilePicture",
        numComments: { $size: "$comments" },
        numLikes: {
          $cond: {
            if: { $isArray: "$likes" },
            then: { $size: "$likes" },
            else: 0
          }
        }
      },
    },
  ];
};

router.get("/post", async (req: Request, res: Response) => {
  try {
    const skip: number = Number(req.query.skip) || 0;
    const limit: number = Number(req.query.limit) || 5;
    const pipeline = [
      ...getPostAggregatePipeline(),
      { $skip: skip },
      { $limit: limit },
    ];
    const posts: any = await Post.aggregate(pipeline);
    
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/single-post/:postId", async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const findPost: any = await Post.findById(postId);
    const pipeline = [
      ...getPostAggregatePipeline(),
      { $match: { _id: findPost._id } },
    ];
    const post: any = await Post.aggregate(pipeline);
  
    const populateComments = async (comments: any) => {
      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        
        const likeCount = comment.likes.length;
    
        if (comment.replies.length > 0) {
          const populatedReplies = await Comment.find({
            _id: { $in: comment.replies },
          })
            .populate("user", "displayName profilePicture")
            .exec();
          comment.replies = await populateComments(populatedReplies);
        }
        comment.likeCount = likeCount;
      }
      return comments;
    };
    

    const Unfinishcomments = await Comment.find({
      post: postId,
      parentComment: { $exists: false },
    })
      .populate("user", "displayName profilePicture")
      .exec();
    const comments = await populateComments(Unfinishcomments);

    res.json({ post, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
