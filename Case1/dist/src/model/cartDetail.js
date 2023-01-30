"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartDetails = void 0;
const mongoose_1 = require("mongoose");
const cartDetailSchema = new mongoose_1.Schema({
    total: Number,
    amountProduct: Number,
    product: {
        type: String,
        ref: "Product"
    },
    cart: {
        type: String,
        ref: "Carts"
    },
});
const CartDetails = (0, mongoose_1.model)('CartDetail', cartDetailSchema);
exports.CartDetails = CartDetails;
//# sourceMappingURL=cartDetail.js.map