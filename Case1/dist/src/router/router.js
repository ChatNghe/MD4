"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const HomeController_1 = __importDefault(require("../controller/HomeController"));
const product_router_1 = require("./product-router");
const user_router_1 = require("./user-router");
const cart_router_1 = require("./cart-router");
exports.router = (0, express_1.Router)();
exports.router.get('/home', HomeController_1.default.showHome);
exports.router.use('/products', product_router_1.productRouter1);
exports.router.use('/users', user_router_1.userRouter);
exports.router.use('/carts', cart_router_1.cartRouter);
//# sourceMappingURL=router.js.map