import express from "express";
import {
  register,
  getAllUsers,
  login,
  getMyProfile,
  logout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// route for getting all users
router.get("/all", getAllUsers);

//for creating new user
router.post("/new", register);

//get route for user login
router.post("/login", login);

//if user is logged in to see his profile
router.get("/myinfo", isAuthenticated, getMyProfile);

//to logout user
router.post("/logout", isAuthenticated, logout);
export default router;
