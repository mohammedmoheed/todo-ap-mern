import mongoose from "mongoose";

/******creating db schema********/
const schema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

/******creating db models********/
export const Task = mongoose.model("tasks", schema);
