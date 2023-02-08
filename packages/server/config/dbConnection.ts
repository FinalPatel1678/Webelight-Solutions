import mongoose from "mongoose";

const connectDatabase = () => {
  if (!process.env.MONGO_URI) {
    console.log("Mongo DB Connection URL is not Provided");
    return;
  }
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async (db) => {
      console.log("Mongoose Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDatabase;
