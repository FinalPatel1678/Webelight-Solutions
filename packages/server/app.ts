import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

export default app;
