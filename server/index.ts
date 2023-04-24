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
    origin: "http://localhost:5173",
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


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
