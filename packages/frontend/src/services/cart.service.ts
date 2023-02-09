import { CartModel, CartModelRequest } from "../models/CartModel";

import BaseService from "./base.service";
import { PagedResult } from "../models/PagedResult";

export function useCardProductService() {
  return new CartProductServices();
}

class CartProductServices extends BaseService {
  getList = async (pageNumber: number) =>
    await this.callApi<PagedResult<CartModel[]>>(
      "GET",
      "/cart",
      new URLSearchParams({
        pageNumber: pageNumber.toString(),
      })
    );

  upsertCartProduct = async (product: CartModelRequest) =>
    await this.callApi<CartModel>("POST", `/cart`, undefined, product);
}
