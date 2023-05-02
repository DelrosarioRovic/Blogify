import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

//imported file
import connectToDatabase from "./database/connectDb";
import thirdPartyMwAuth from "./middleware/thirdpartymwAuth";
import authControllers from "./controllers/authControllers";
import authThirdPartyControllers from "./controllers/authThirdPartyController";
import composeController from "./controllers/compose-controller";
import commentController from "./controllers/comment-controller";
import likeController from "./controllers/like-controller";
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
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

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
app.use(commentController);
app.use(likeController);

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true, 
  }
});

io.on("connection", (socket) => {
  
  socket.on("disconnect", () => {
 
  });
});

server.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
