"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carts = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
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
});
const Carts = (0, mongoose_1.model)('Cart', cartSchema);
exports.Carts = Carts;
//# sourceMappingURL=cart.js.map