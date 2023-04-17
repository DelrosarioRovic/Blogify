import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import thirdPartyMwAuth from "./middleware/thirdpartymwAuth";
import bcrypt from "bcrypt";
dotenv.config();

//imported file
import connectToDatabase from "./database/connectDb";
import User from "./models/users.model";
import { MiddlewareLocal, CustomRequest } from "./middleware/middlewareAuth";

//mongo Db connection
connectToDatabase()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

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

//third Party authentication middleware
thirdPartyMwAuth();

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req: Request, res: Response) => {
    const userToken = req.user as any;
    const googleUser = {
      googleId: userToken.googleId,
      displayName: userToken.displayName,
      email: userToken.email,
    };
    const secret = process.env.userLocalSecret as string;
    const token = jwt.sign(googleUser, secret, { expiresIn: "1h" });
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res.redirect("http://localhost:5173");
  }
);

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { session: false }),
  async (req: Request, res: Response) => {
    const userToken = req.user as any;
    const googleUser = {
      googleId: userToken.googleId,
      displayName: userToken.displayName,
      email: userToken.email,
    };
    const secret = process.env.userLocalSecret as string;
    const token = jwt.sign(googleUser, secret, { expiresIn: "1h" });
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res.redirect("http://localhost:5173");
  }
);

app.get(
  "/user",
  MiddlewareLocal,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log(req.userId);
    const userId = req.userId;
    const googleUserId = req.googleUserId;
    if (userId) {
      const localUser = await User.findById(userId);
      res.json({ authenticated: true, user: localUser });
    }
    if (googleUserId) {
      const googleUser = await User.findOne({ googleId: googleUserId });
      res.json({ authenticated: true, user: googleUser });
    }
  }
);

app.get("/sign-out", async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token");
    res.status(200).send("Signed out successfully.");
  } catch (error) {
    res.status(500).send("An error occurred while signing out.");
  }
});

app.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // check if user exists
  const user = await User.findOne({ email: email });
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
  const user = await User.findOne({ email });

  if (user) {
    console.log("Already a user");
  }

  if (!user) {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email,
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
