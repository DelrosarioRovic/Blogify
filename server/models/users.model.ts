import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  displayName: { type: String, required: true }
});

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model("User", userSchema);

export default User;
