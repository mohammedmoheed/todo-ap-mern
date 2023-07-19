import mongoose from "mongoose";

/******connecting to database********/
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendapi",
    })
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
