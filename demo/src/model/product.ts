import {model, Schema} from "mongoose";

export interface IProduct{
    name ?: string;
    price ?: number;
    image ?: string;
}
const ProductSchema = new Schema<IProduct>({
    name: String,
    price: Number,
    image: String
});

const Product = model<IProduct>('Product', ProductSchema)
export {Product};