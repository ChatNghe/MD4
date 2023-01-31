"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cartDetail_1 = require("../model/cartDetail");
class CartDetailService {
    constructor() {
        this.addCartDetail = async (idProduct, idCart, amount, total) => {
            return cartDetail_1.CartDetails.create({ product: idProduct, cart: idCart, amountProduct: amount, total: total });
        };
        this.finById = async (idCart) => {
            let product = await cartDetail_1.CartDetails.find({ cart: idCart }).populate('product');
            return product;
        };
        this.updateQuantity = async (idCartDetail, quantity) => {
            await cartDetail_1.CartDetails.updateOne({ product: idCartDetail }, { amountProduct: quantity });
        };
        this.fillProduct = async (idProduct) => {
            let CartDetail = await cartDetail_1.CartDetails.findOne({ product: idProduct });
            return CartDetail;
        };
        this.updateTotal = async (idProduct, total) => {
            await cartDetail_1.CartDetails.updateOne({ product: idProduct }, { total: total });
        };
        this.fillTotal = async (idCart) => {
            let total = await cartDetail_1.CartDetails.aggregate([{ $match: { cart: idCart } }, { $group: { _id: "$id", total: { $sum: "$total" } } }]);
            return total;
        };
        this.deleteCartDetail = async (idCart) => {
            await cartDetail_1.CartDetails.deleteOne({ _id: idCart });
        };
    }
}
exports.default = new CartDetailService();
//# sourceMappingURL=cartDetailService.js.map