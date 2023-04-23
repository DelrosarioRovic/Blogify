import { Router, Request, Response } from 'express';
import Post from '../models/post.model';

const router = Router();

router.get('/post', async (req: Request, res: Response) => {
  try {
    const post: any = await Post.aggregate([
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
          date: { $dateToString: { format: "%m/%d/%Y", date: "$date" } }
        }
      }
    ]);      
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get("/single-post/:postId", async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const findPost:any = await Post.findById(postId);
    const post: any = await Post.aggregate([
      {
        $match: { _id: findPost._id }
      },
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
          profilePicture: "$user.profilePicture",
          title: 1,
          content: 1,
          date: { $dateToString: { format: "%m/%d/%Y", date: "$date" } }
        }
      }
    ]);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
