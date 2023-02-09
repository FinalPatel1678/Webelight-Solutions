import BaseService from "./base.service";
import FilterParams from "../models/Filter";
import { PagedResult } from "../models/PagedResult";
import { ProductModel } from "../models/ProductModel";

export function useProductService() {
  let productService = new ProductServices();
  return productService;
}

export default class ProductServices extends BaseService {
  getList = async (filterParam: FilterParams) =>
    await this.callApi<PagedResult<ProductModel[]>>(
      "GET",
      "/product",
      new URLSearchParams(Object.entries(filterParam))
    );
}
