import { Router, Response, NextFunction } from 'express';
import { MiddlewareAuth, CustomRequest } from "../middleware/middlewareAuth";
import User from "../models/users.model";
const router = Router();

router.get(
    "/user",
    MiddlewareAuth,
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const userId = req.userId;
      const googleUserId = req.googleUserId;
      if (userId) {
        const localUser = await User.findById(userId);
        return res.status(200).json({ authenticated: true, user: localUser });
      }
      if (googleUserId) {
        const googleUser = await User.findOne({ googleId: googleUserId });
        return res.status(200).json({ authenticated: true, user: googleUser });
      }
      if (!userId || !googleUserId) {
        return res.status(401).json({ authenticated: false, message:"No user authenticated!!" });
      }
    }
  );

export default router;

