import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";

import cookieParser from "cookie-parser";


//imported file
//mongodb connection
import connectToDatabase from "./database/connectDb";
//mongoDb collection model
import User from "./models/users.model";
//authentication

const app = express();
//middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

passport.use(new LocalStrategy.Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//mongo Db connection
connectToDatabase()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ username: email });
  passport.authenticate("local", () => {

  })

});

app.post("/register", async (req: Request, res: Response) => {
  const { email, password, displayName } = req.body;

  console.log(req.body.password);
  try {
    const user = await User.register(
      {
        username: email,
        displayName: displayName,
      },
      password
    );
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: error });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
