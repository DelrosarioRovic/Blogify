import { Router, Request, Response } from 'express';
import Post from '../models/post.model';

const router = Router();

const findPostById = async (postId: string) => {
  return await Post.findById(postId);
}

const getPostAggregatePipeline = () => {
  return [
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    },
    {
      $project: {
        _id: 1,
        userId: "$user._id",
        displayName: "$user.displayName",
        title: 1,
        content: 1,
        date: { $dateToString: { format: "%m/%d/%Y", date: "$date" } },
        profilePicture: "$user.profilePicture"
      }
    }
  ];
}

router.get('/post', async (req: Request, res: Response) => {
  try {
    const skip: number = Number(req.query.skip) || 0;
    const limit: number = Number(req.query.limit) || 5;
    const pipeline = [...getPostAggregatePipeline(), { $skip: skip }, { $limit: limit }];
    const posts: any = await Post.aggregate(pipeline);   
  
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get("/single-post/:postId", async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const findPost:any = await findPostById(postId);
    const pipeline = [...getPostAggregatePipeline(), { $match: { _id: findPost._id } }];
    const post: any = await Post.aggregate(pipeline);
    console.log(post);   
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
