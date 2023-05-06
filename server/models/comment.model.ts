import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likeCount: {
    type: Number,
    default: 0
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
