import express, { Request, Response } from "express";
import { MiddlewareAuth, CustomRequest } from "../middleware/middlewareAuth";
import Post from "../models/post.model";
import User from "../models/users.model";

const router = express.Router();

router.post("/comment", MiddlewareAuth, async(req:CustomRequest, res: Response) => {
    const userId =  req.userId;
    const googleUserId = req.googleUserId;
    
    const userLocal = await User.findById(userId);
    const userProvider = await User.findOne({ googleId: googleUserId });
  
    const localOrProvided:any = userLocal || userProvider;
    if (!localOrProvided) {
      console.log("User required");
      return res.status(401).json({message:"Please Sign In First"});
    }

    
});


export default router;