import { IProductRequest, Product } from "../models/product";

import { PagedResult } from "../models/pagedResult";

export interface IProductService {
  getProducts: (
    page: number,
    query: Record<string, unknown>
  ) => Promise<PagedResult<IProductRequest[]>>;
}

export const getProductService = (): IProductService => {
  const getProducts = async (
    page: number,
    query: Record<string, unknown>
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

  return {
    getProducts,
  };
};
