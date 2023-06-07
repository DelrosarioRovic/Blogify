import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

//imported file
import connectToDatabase from "./database/connectDb";
import thirdPartyMwAuth from "./middleware/thirdpartymwAuth";
import authControllers from "./controllers/authControllers";
import authThirdPartyControllers from "./controllers/authThirdPartyController";
import composeController from "./controllers/compose-controller";
import commentController from "./controllers/comment-controller";
import likeController from "./controllers/like-controller";
import deletePostController from "./controllers/deletePost";
import deleteComment_ReplyController from "./controllers/deleteComment&Reply";
import followController from "./controllers/followController";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

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
app.use(cors({
  origin: 'https://blogify-phi.vercel.app',
  credentials: true
}));

//third Party authentication middleware
thirdPartyMwAuth();

//routes
app.use("/route", postRoutes);
app.use("/route", userRoutes);
//authenticate controllers
app.use('/auth', authThirdPartyControllers);
app.use('/auth', authControllers);
//create post controllers
app.use(composeController);
//create comment controllers
app.use(commentController);
//like controllers
app.use(likeController);
//delete post
app.use(deletePostController);
//delete comment | reply
app.use(deleteComment_ReplyController);
//follow controllers
app.use(followController);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
