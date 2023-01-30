"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const cartDetailController_1 = __importDefault(require("../controller/cartDetailController"));
exports.cartRouter = (0, express_1.Router)();
exports.cartRouter.get("/cart", cartDetailController_1.default.showFormCart);
exports.cartRouter.get("/addProduct/:id", cartDetailController_1.default.addCartDetail);
exports.cartRouter.post("/quantity/:id", cartDetailController_1.default.updateQuantity);
exports.cartRouter.get("/delete/:id", cartDetailController_1.default.deleteProductCart);
//# sourceMappingURL=cart-router.js.map