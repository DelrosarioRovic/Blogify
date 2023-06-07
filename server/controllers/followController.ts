import express, { Request, Response } from "express";
import User from "../models/users.model";


const router = express.Router();

router.get("/follow", async (req: Request, res: Response) => {

    const { otherUserId, currentUserId } = req.query;
  
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