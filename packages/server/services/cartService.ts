import { Cart, ICart, ICartRequest } from "../models/cart";

import { PagedResult } from "../models/pagedResult";

export interface ICartProductService {
  upsertCartProduct: (productRequest: ICartRequest) => Promise<ICart>;
  getCartProducts: (page: number) => Promise<PagedResult<ICart[]>>;
}

export const getCartProductService = (): ICartProductService => {
  const getCartProducts = async (
    page: number
  ): Promise<PagedResult<ICart[]>> => {
    const items = await Cart.find()
      .skip(10 * (page - 1))
      .limit(10)
      .populate("product");

    const count = await Cart.find().countDocuments();

    return {
      count,
      items,
    };
  };

  const upsertCartProduct = async (productRequest: ICartRequest) =>
    await Cart.findOneAndUpdate(
      { product: productRequest.product },
      productRequest,
      {
        upsert: true,
        new: true,
      }
    );

  return {
    getCartProducts,
    upsertCartProduct,
  };
};
