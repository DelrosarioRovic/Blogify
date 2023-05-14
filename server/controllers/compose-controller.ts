import express, { Request, Response } from "express";
import { MiddlewareAuth, CustomRequest } from "../middleware/middlewareAuth";
import Post from "../models/post.model";
import userAuth from "../middleware/userAuth";

const router = express.Router();

router.post(
  "/compose",
  MiddlewareAuth,
  async (req: CustomRequest, res: Response) => {
    const localOrProvided = await userAuth(req);

    if (!localOrProvided) {
      console.log("User required");
      return res.status(401).json({ message: "Please Sign In First" });
    }

    const { title, content, addPic, _id } = req.body;

    if (_id) {
      // Update an existing post
      try {
        const updatedPost = await Post.findByIdAndUpdate(_id, {
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
        user: localOrProvided._id,
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
