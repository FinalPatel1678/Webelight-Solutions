import express from "express";
import { getProducts } from "../controllers/product";

const router = express();

router.route("/").get(getProducts);

export default router;
