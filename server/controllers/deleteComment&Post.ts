import express, { Request, Response } from "express";
import { MiddlewareAuth, CustomRequest } from "../middleware/middlewareAuth";
import Post from "../models/post.model";
import userAuth from "../middleware/userAuth";

const router = express.Router();

router.delete("/deletePost", MiddlewareAuth, async(req: CustomRequest, res: Response) => {
    const localOrProvided = await userAuth(req);

    if (!localOrProvided) {
      console.log("User required");
      return res.status(401).json({ message: "Please Sign In First" });
    }
    


});

export default router;