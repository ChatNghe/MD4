"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../model/cart");
class CartService {
    constructor() {
        this.addCart = async (idUser, status) => {
            await cart_1.Carts.create({ user: idUser, status: status });
        };
        this.findById = async (idUser) => {
            let idCart = await cart_1.Carts.findOne({ user: idUser });
            return idCart;
        };
        this.addTotal = async (idUser, totalCart) => {
            await cart_1.Carts.updateOne({ user: idUser }, { total: totalCart });
        };
    }
}
exports.default = new CartService();
//# sourceMappingURL=cartService.js.map