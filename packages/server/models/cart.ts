import { IProduct } from "./product";
import mongoose from "mongoose";

export interface ICartRequest {
  _id?: string;
  product: string;
  quantity: number;
  purchased: boolean;
}

export interface ICart extends mongoose.Document {
  product: IProduct;
  quantity: number;
  purchased: boolean;
}

const cartSchema = new mongoose.Schema<ICart>({
  product: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  purchased: {
    type: Boolean,
    default: false,
  },
});

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
