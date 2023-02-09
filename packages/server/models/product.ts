import mongoose from "mongoose";

export interface IProductRequest {
  _id?: string;
  productName: string;
  favorite: boolean;
  productImage: string;
  price: number;
  category: string;
}

export interface IProduct extends mongoose.Document {
  productName: string;
  favorite: boolean;
  productImage: string;
  price: number;
  category: string;
}

const productSchema = new mongoose.Schema<IProduct>({
  productName: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 12,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  productImage: String,
  price: Number,
  category: String,
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
