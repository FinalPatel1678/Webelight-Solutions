import { IProductService, getProductService } from "../services/productService";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productService: IProductService = getProductService();

    const page: number = (req.query?.pageNumber as unknown as number) ?? 1;
    const query: Record<string, unknown> = {};

    if (req.query?.category) {
      query.category = req.query.category;
    }

    if (req.query?.priceFilter) {
      const [lowestPrice, highestPice] = (
        req.query.priceFilter as string
      ).split(",");

      query["$and"] = [
        { price: { $gt: lowestPrice } },
        { price: { $lte: highestPice } },
      ];
    }

    const result = await productService.getProducts(page, query);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error while getting list of products");
  }
};

export const upsertProduct = async (req: Request, res: Response) => {
  try {
    const productService: IProductService = getProductService();

    const result = await productService.upsertProduct(req.body);

    return res.status(200).send(result);
  } catch (err: any) {
    console.log(err);
    return res.status(500).send("Error while upsert product");
  }
};
