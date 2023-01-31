import {model, Schema} from "mongoose";
import {IProduct} from "./product"
import {ICart} from "./cart";

export interface ICartDetail {
    total : number;
    amountProduct: number;
    product: IProduct;
    cart: ICart;
}
const cartDetailSchema = new Schema<ICartDetail>({
    total : Number,
    amountProduct: Number,
    product: {
        type: String,
        ref: "Product"
    },
    cart: {
        type: String,
        ref: "Carts"
    },
})
const CartDetails = model<ICartDetail>('CartDetail', cartDetailSchema)
export {CartDetails}