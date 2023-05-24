import express, { Request, Response } from "express";
import { MiddlewareAuth, CustomRequest } from "../middleware/middlewareAuth";
import User from "../models/users.model";
import userAuth from "../middleware/userAuth";

const router = express.Router();

router.get("/follow", MiddlewareAuth, async (req: CustomRequest, res: Response) => {
    const localOrProvided = await userAuth(req);
    const { otherUserId, currentUserId } = req.query;
  
    if (!localOrProvided) {
      return res.status(401).json({ message: "Please Sign In First" });
    }
  
    const otherUser: any = await User.findById(otherUserId);
    if (otherUser.followed.includes(currentUserId)) {
      const index = otherUser.followed.indexOf(currentUserId);
      otherUser.followed.splice(index, 1);
      await otherUser.save();
      return res.status(200).json({ message: "User unfollowed successfully." });
    } else {
      otherUser.followed.push(currentUserId);
      await otherUser.save();
      return res.status(200).json({ message: "User followed successfully." });
    }
  });
  

export default router;