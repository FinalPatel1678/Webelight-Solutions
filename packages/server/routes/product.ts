import { getProducts, upsertProduct } from "../controllers/product";

import express from "express";

const router = express();

router.route("/").get(getProducts).post(upsertProduct);

export default router;
