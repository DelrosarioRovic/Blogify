import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  email: { type: String, unique: true },
  displayName: { type: String, required: true },
  password: { type: String },
  profilePicture: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
