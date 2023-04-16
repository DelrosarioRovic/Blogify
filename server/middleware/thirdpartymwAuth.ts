import passport from "passport";
import User from "../models/users.model";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
const GoogleStrategy = require("passport-google-oauth20").Strategy; 
dotenv.config();

const thirdPartyMwAuth = () => {
    passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            scope: ['profile', 'email'],
          },
          async (accessToken:any, refreshToken:any, profile:any, done:any) => {
            // Generate a JWT token using the user's Google profile
            try {
              let user = await User.findOne({ googleId: profile.id });
              if (!user) {
                user = new User({
                  googleId: profile.id,
                  displayName: profile.displayName,
                  email: profile.emails[0].value,
                });
                await user.save();
              }
      
              // Generate a JWT token
            const token = jwt.sign({ googleId: user.googleId,displayName:user.displayName,email:user.email }, process.env.userLocalSecret as string);
            const decoded = jwt.decode(token);
            done(null, decoded);
      
            } catch (error) {
              console.log(error)
            }
          }
        )
      );
}
export default thirdPartyMwAuth;