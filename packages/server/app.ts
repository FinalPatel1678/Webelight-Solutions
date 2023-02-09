import cart from "./routes/cart";
import cors from "cors";
import express from "express";
import product from "./routes/product";

const app = express();

app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

app.use("/api/product", product);
app.use("/api/cart", cart);

export default app;
