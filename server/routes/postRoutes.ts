import { Router } from 'express';
import Post from '../models/post.model';

const router = Router();
    
router.get('/post', async (req, res) => {
    try {
      const result = await Post.aggregate([
        // Lookup stage to join the `users` and `posts` collections based on the `user` field in the `posts` collection
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        // Unwind the `user` field to get an array of users
        { $unwind: '$user' },
        // Group by the `user._id` field and accumulate the `title` and `content` fields in an array
        {
          $group: {
            _id: '$user._id',
            displayName: { $first: '$user.displayName' },
            posts: {
              $push: {
                title: '$title',
                content: '$content',
              },
            },
          },
        },
      ]);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

export default router;
