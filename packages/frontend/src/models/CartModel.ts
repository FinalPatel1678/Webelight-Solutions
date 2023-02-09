import { ProductModel } from "./ProductModel";

export interface CartModelRequest {
  product: string;
  quantity: number;
  purchased: boolean;
}

export interface CartModel {
  _id: string;
  product: ProductModel;
  quantity: number;
  purchased: boolean;
}
