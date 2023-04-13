import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  username:{type: String},
  displayName: { type: String, required: true },
  password: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
