import { IProductRequest, Product } from "../models/product";

import { PagedResult } from "../models/pagedResult";
import mongoose from "mongoose";

export interface IProductService {
  upsertProduct: (productRequest: IProductRequest) => Promise<IProductRequest>;
  getProducts: (
    page: number,
    query: { favorite?: boolean }
  ) => Promise<PagedResult<IProductRequest[]>>;
}

export const getProductService = (): IProductService => {
  const getProducts = async (
    page: number,
    query: { favorite?: boolean }
  ): Promise<PagedResult<IProductRequest[]>> => {
    const items = await Product.find(query)
      .skip(10 * (page - 1))
      .limit(10)
      .lean();

    const count = await Product.find(query).countDocuments();

    return {
      count,
      items,
    };
  };

  const upsertProduct = async (productRequest: IProductRequest) =>
    await Product.findByIdAndUpdate(
      productRequest._id ? productRequest._id : new mongoose.Types.ObjectId(),
      productRequest,
      {
        upsert: true,
        new: true,
      }
    ).lean();

  return {
    getProducts,
    upsertProduct,
  };
};
