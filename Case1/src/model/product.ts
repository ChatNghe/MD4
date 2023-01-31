import {model, Schema} from "mongoose";
import {ICategory} from "./category";

export interface IProduct {
    name ?: string;
    price ?: number;
    image ?: string;
    category?: ICategory
}

const ProductSchema = new Schema<IProduct>(
    {
        name: String,
        price: Number,
        image: String,
        category: {
            type: String,
            ref: 'Category'
        }
    }
)

const Product = model<IProduct>('Product',ProductSchema);
export {Product}