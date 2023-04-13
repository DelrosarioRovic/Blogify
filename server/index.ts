import express, { Request, Response } from "express";
import cors from "cors";
import session, { Store } from "express-session";
import passport from "passport";
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require("connect-mongo")(session);
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

//imported file
//mongodb connection
import connectToDatabase from "./database/connectDb";
//mongoDb collection model
import User from "./models/users.model";
//authentication

const store = new MongoStore({
  mongooseConnection: mongoose.connection,
});

const app = express();
//middleware
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//mongo Db connection
connectToDatabase()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

  passport.use(
    new LocalStrategy((username: string, password: string, done: Function) => {
      User.findOne({ username: username }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        if (user && user.password) {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (!isMatch) {
              return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user);
          });
        }
      }).catch(err => {
        return done(err);
      });
    })
  );
  
// Serialization method

passport.serializeUser((user: any, done) => {
  if (user) {
    done(null, user._id);
  }
});

// Deserialization method
passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    console.log(user);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const isAuthenticated = (req: Request, res: Response, next: Function) => {
  if (req.isAuthenticated()) {
    console.log(next());
    return next();
  }
  return false;
};


app.get("/", isAuthenticated, (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.post('/login', (req: Request, res: Response, next: Function) => {
  passport.authenticate('local', (err: Error, user: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Incorrect username or password.' });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log(req.user);
      console.log(req.isAuthenticated());
      return res.json({ message: 'Login successful.', user:req.isAuthenticated() });
    });
  })(req, res, next);
});

app.post("/register", async (req: Request, res: Response) => {
  const { email, password, displayName } = req.body;

  const user = await User.findOne({ username: email});

    if(user) {
      console.log("Already a user")
    }

    if(!user) {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username:email,
        password:hashPassword,
        displayName:displayName
      });
      await newUser.save();
      res.json({ status: "ok" });
    }

});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
