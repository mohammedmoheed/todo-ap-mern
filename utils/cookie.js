import jwt from "jsonwebtoken";

//function for setting cookie and send success message
export const setCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};
