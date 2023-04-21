import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

//imported file
import connectToDatabase from "./database/connectDb";
import User from "./models/users.model";
import { MiddlewareLocal, CustomRequest } from "./middleware/middlewareAuth";
import thirdPartyMwAuth from "./middleware/thirdpartymwAuth";
import authControllers from "./controllers/authControllers";
import authThirdPartyControllers from "./controllers/authThirdPartyController";
import composeController from "./controllers/compose-controller";

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
  "/user",
  MiddlewareLocal,
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

//AuthenticationControllers
app.use('/auth', authThirdPartyControllers);
app.use('/auth', authControllers);
app.use(composeController);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
