import express from "express";
import { connectDB } from "./data/database.js";
import userRoute from "./routes/user.js";
import taskRoute from "./routes/task.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

/******creating a server**********/
const app = express();

/*****configuring path to env file*******/
dotenv.config({
  path: "./data/config.env",
});

/*****connecting to database*******/
connectDB();

/*****using moddleware***********/

app.use(express.json()); //parse json data in the request body
app.use(cookieParser()); //for accessing cookie from cookies in browser

//using middleware for router
app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);

//using error mddleware
app.use(errorMiddleware);

/*******check server is working or not*********/
app.listen(process.env.PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", process.env.PORT);
});
