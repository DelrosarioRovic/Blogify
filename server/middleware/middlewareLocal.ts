import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
dotenv.config();

interface CustomRequest extends Request {
  userId?: string | null;
}

const MiddlewareLocal = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    req.userId = null; 
    return next(); 
  }

  try {
    const secret = process.env.userLocalSecret as string;
    const codedToken = jwt.verify(token, secret) as any;
    req.userId = codedToken.id;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // return nothing when token expired
      return next();
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export {MiddlewareLocal, CustomRequest};
