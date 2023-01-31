import {model, Schema} from "mongoose";
import {IUser} from "./user";
import {ICartDetail} from "./cartDetail";

export interface ICart {

    cartDetail: ICartDetail;
    user: IUser;
    status: string;
    total: number;
}
const cartSchema = new Schema<ICart>({
    total: Number,
    cartDetail: {
        type: String,
        ref: "CartDetail"
    },
    user: {
        type: String,
        ref: "User"
    },
    status: String
})
const Carts = model<ICart>('Cart', cartSchema)
export {Carts}