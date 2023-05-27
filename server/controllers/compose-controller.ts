import express, { Request, Response } from "express";
import Post from "../models/post.model";
import User from "../models/users.model";

const router = express.Router();

router.post(
  "/compose",
  async (req: Request, res: Response) => {
    const { title, content, addPic, update_id, current_id } = req.body;

    const user = await User.findById(current_id);

    if (!user) {
      return res.status(401).json({ message: "Please Sign In First" });
    }

    if (update_id) {
      // Update an existing post
      try {
        const updatedPost = await Post.findByIdAndUpdate(update_id, {
          title,
          content,
          picture: addPic,
        });

        if (!updatedPost) {
          return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    } else {
      // Create a new post
    
      const newPostData: any = {
        user: user._id,
        title,
        content,
        date: new Date(),
      };
      
      if (addPic !== "") {
        newPostData.picture = addPic;
      }
      
      const newPost = new Post(newPostData);

      try {
        await newPost.save();
        res.status(200).json({ message: "Post created successfully!" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  }
);

export default router;
