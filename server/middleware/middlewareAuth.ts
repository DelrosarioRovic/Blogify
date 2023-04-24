import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
dotenv.config();

interface CustomRequest extends Request {
  userId?: string | null;
  googleUserId?: string | null;
}

const MiddlewareAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    req.userId = null; 
    return next(); 
  }
  
  try {
    const secret = process.env.userLocalSecret as string;
    const codedToken = jwt.verify(token, secret) as any;

    if (codedToken.id) {
      req.userId = codedToken.id;
    }
    if (codedToken.googleId) {
      req.googleUserId = codedToken.googleId;
    }

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // return nothing when token expired
      return next();
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export {MiddlewareAuth, CustomRequest};
