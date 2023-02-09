import BaseService from "./base.service";
import { PagedResult } from "../models/PagedResult";
import { ProductModel } from "../models/ProductModel";

export function useProductService() {
  let productService = new ProductServices();
  return productService;
}

export default class ProductServices extends BaseService {
  getList = async (page: number, filter?: { favorite: boolean }) =>
    await this.callApi<PagedResult<ProductModel[]>>(
      "GET",
      "/product",
      new URLSearchParams(
        filter?.favorite
          ? {
              page: page.toString(),
              favorite: "true",
            }
          : { page: page.toString() }
      )
    );
}
