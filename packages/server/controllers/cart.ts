import {
  ICartProductService,
  getCartProductService,
} from "../services/cartService";
import { Request, Response } from "express";

export const getCartProducts = async (req: Request, res: Response) => {
  try {
    const cartProductService: ICartProductService = getCartProductService();

    const page: number = (req.query?.pageNumber as unknown as number) ?? 1;

    const result = await cartProductService.getCartProducts(page);

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while getting list of products");
  }
};

export const upsertCartProduct = async (req: Request, res: Response) => {
  try {
    const cartProductService: ICartProductService = getCartProductService();

    const result = await cartProductService.upsertCartProduct(req.body);

    return res.status(200).send(result);
  } catch (err: any) {
    console.log(err);
    return res.status(500).send("Error while upsert product");
  }
};
