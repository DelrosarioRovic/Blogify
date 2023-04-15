import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import bcrypt from "bcrypt";
dotenv.config();

//imported file
import connectToDatabase from "./database/connectDb";
import User from "./models/users.model";
import { MiddlewareLocal, CustomRequest } from "./middleware/middlewareLocal";


const app = express();
//middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);





passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken:any, refreshToken:any, profile:any, done:any, res:Response) => {
      // Generate a JWT token using the user's Google profile
      console.log(accessToken, refreshToken,profile)
      const token = jwt.sign({ sub: profile.id, name: profile.displayName, email: profile.emails[0].value }, process.env.userLocalSecret as string,{ expiresIn: "1h"});

      // Set the token in a cookie
      res.cookie('jwt', token, { httpOnly: true });

      // Call done without serializing the user to a session
      done(null, false);
    }
  )
);


//mongo Db connection
connectToDatabase()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google'),
  function(req: CustomRequest, res: Response) {
      const userId = req.userId;
      const token = jwt.sign({ id: userId }, process.env.userLocalSecret as string, { expiresIn: "1h" });
      res.cookie('access_token', token, { httpOnly: true });
      console.log("Successfully Login With Google");
      res.json({message:"Successfully Login using Google"})
  }
);



app.get("/user", MiddlewareLocal,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (user) {
      res.json({ authenticated: true, user: user });
    }
  }
);

app.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  // check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  // check if password is correct
  if (user.password) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  }
  // create a JWT token
  const payload = {
    id: user.id,
  };
  const secret = process.env.userLocalSecret as string;
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  // set the JWT token as a cookie
  res.cookie("access_token", token, {
    httpOnly: true,
  });
  res.json({ message: "Logged in successfully", user: user });
});

app.post("/register", async (req: Request, res: Response) => {
  const { email, password, displayName } = req.body;

  const user = await User.findOne({ username: email });

  if (user) {
    console.log("Already a user");
  }

  if (!user) {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: email,
      password: hashPassword,
      displayName: displayName,
    });
    await newUser.save();
    res.json({ status: "ok" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
