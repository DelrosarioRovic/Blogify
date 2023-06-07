import { Router, Response, Request } from 'express';
import jwt from "jsonwebtoken";
import User from "../models/users.model";
const router = Router();

router.get(
    "/user",
    async (req: Request, res: Response) => {
     
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: 'Missing authorization token' });
      }

      try {
        // Verify the JWT and extract the payload
        const secret = process.env.userLocalSecret as string;
        const payload: any = jwt.verify(token, secret);
        const userId = payload.userId;

        const user = await User.findById(userId);
 
        // You can use the user ID to fetch the user's data or perform other actions
        // For simplicity, we'll just send back a success message
        res.status(200).json({ authenticated: true, user});
      } catch (error) {
        res.status(401).json({ authenticated: false, message: 'Invalid authorization token' });
      }
    }
  );

router.get("/specific-user/:userId" ,async (req: Request, res: Response) => {
  const id = req.params.userId;
  const user = await User.findById(id);
  return res.status(200).json({ user });
})

export default router;

