import mongoose from "mongoose";

/******creating db schema********/
const schema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

/******creating db models********/
export const User = mongoose.model("users", schema);
