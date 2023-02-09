import { getCartProducts, upsertCartProduct } from "../controllers/cart";

import express from "express";

const router = express();

router.route("/").get(getCartProducts).post(upsertCartProduct);

export default router;
