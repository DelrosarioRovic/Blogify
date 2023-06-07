import passport from "passport";
import User from "../models/users.model";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
const GoogleStrategy = require("passport-google-oauth20").Strategy; 
const GitHubStrategy = require("passport-github2").Strategy;
dotenv.config();


const createUser = async (id:any, displayName:any, email:any, profilePicture:any) => {
  try {
    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = new User({
        googleId: id,
        displayName: displayName,
        email: email,
        profilePicture:profilePicture
      });
      await user.save();
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const thirdPartyMwAuth = () => {
  passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: 'https://blogify-api-server.vercel.app/auth/google/callback',
          scope: ['profile', 'email'],
        },
        async (accessToken:any, refreshToken:any, profile:any, done:any) => {
          try {
            const user = await createUser(profile.id, profile.displayName, profile.emails[0].value, profile.photos[0].value);
            const token = jwt.sign({ userId: user._id, displayName:user.displayName,email:user.email }, process.env.userLocalSecret as string);

            done(null, token);
            
          } catch (error) {
            console.log(error)
          }
        }
      )
    );
//----------------------------------------------------------------------------------------------
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: 'https://blogify-api-server.vercel.app/auth/github/callback',
          scope: ['user:email'],
        },
        async (accessToken:any, refreshToken:any, profile:any, done:any) => {
          try {
            const emailGithub = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
          
            const user = await createUser(profile.id, profile.displayName, emailGithub, profile.photos[0].value);
            console.log(user);
            const token = jwt.sign({ userId: user._id, displayName: user.displayName, email: user.email }, process.env.userLocalSecret as string);

            done(null, token);

          } catch (error) {
            console.log(error)
          }
        }
      )
    );


}





export default thirdPartyMwAuth;