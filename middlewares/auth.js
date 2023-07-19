import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies; //get token value from cookies
  // if token exist means user logged in
  //if not send error
  if (!token)
    return res.status(404).json({
      success: false,
      message: "loggin first",
    });

  //if logged in
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  next();
};
