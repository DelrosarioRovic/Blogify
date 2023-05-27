import express, { Request, Response } from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.model';

router.post("/login", async(req: Request, res: Response) => {
    const { email, password } = req.body;
  // check if user exists
  const user:any = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ message:"Invalid email or password" });
  }

  if (!user.password) {
    return res.status(401).json({ message:"Sorry, you cannot sign in with third-party authentication" });
  }

  // check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message:"Invalid email or password" });
  }
  // create a JWT token
  const secret = process.env.userLocalSecret as string;
  const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
  
  res.status(200).json({ message: "Logged in successfully", token });
});


router.post("/register", async (req: Request, res: Response) => {
    const { email, password, displayName, profilePicture } = req.body;
  
    const user = await User.findOne({ email });
    
    if (user) {
      return res.status(401).json({ message: "Email already exist!" });
    }
  
    if (!user) {
      if (profilePicture) {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          email: email,
          password: hashPassword,
          displayName: displayName,
          profilePicture: profilePicture
        });
        await newUser.save();
        return res.status(200).json({ message: "User created successfully"});
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          email: email,
          password: hashPassword,
          displayName: displayName,
        });
        await newUser.save();
        return res.status(200).json({ message: "User created successfully"});
      }
    }
});

router.post("/update-profile", async (req: Request, res: Response) => {
  const { id, email, bio, profilePicture, displayName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
      return res.status(400).json({ message: "Email address already exists" });
    }
   
    const updateUser = await User.findByIdAndUpdate(id, {
      email,
      bio,
      profilePicture,
      displayName
    });
    if (!updateUser ) {
      return res.status(401).json({message: "No user found"});
    }

    return res.status(200).json({message: "successfully updated user information"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred while updating user information" });
  }
});

export default router;
