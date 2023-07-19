import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/cookie.js";

/******function for getting all users*****/
export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    users,
  });
};

/*******function for register user**********/
export const register = async (req, res) => {
  const { name, email, password } = req.body; //destructure value entered by user
  let user = await User.findOne({ email }); // checking same email exist in db

  //if exist then give message already exist with status 404
  if (user) {
    return res.status(404).json({
      success: false,
      message: "user already exist",
    });
  } else {
    //if not then create one
    const hashPassword = await bcrypt.hash(password, 10); //hsashing pass before storing
    user = await User.create({ name, email, password: hashPassword });

    //once user is created send success message and store cookie
    setCookie(user, res, "User Registered", 201);
  }
};

/***********function for user login*****************/
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password"); //because in our user schema select for password is false
  //if user not found
  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });

  //if user found but incorrect password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });

  // if user found and password is correct
  setCookie(user, res, `welcome back, ${user.name} !`, 200);
};

/***********function for if user logged in to see his pofile*****************/
export const getMyProfile = (req, res) => {
  const user = req.user; // we passed user value in req.user from middleware
  res.status(200).json({
    success: true,
    message: `heelo ${user.name} your details are below`,
    user,
  });
};

/***********function for user logout*****************/
export const logout = async (req, res) => {
  res
    .cookie("token", "", { expires: new Date(Date.now()) })
    .status(200)
    .json({
      success: true,
      message: "user logged out successfuly",
    });
};
