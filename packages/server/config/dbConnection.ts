// import { IProductRequest, Product } from "../models/product";

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

      // const data: IProductRequest[] = [];
      // for (let t = 30; t < 45; t++) {
      //   data.push({
      //     category: "categoryC",
      //     favorite: false,
      //     price: Math.random() * 100,
      //     productImage: "/logo192.png",
      //     productName: "Product" + " " + t + 1,
      //   });
      // }
      // Product.insertMany(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDatabase;
