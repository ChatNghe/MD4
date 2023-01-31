"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryService_1 = __importDefault(require("../service/categoryService"));
const userService_1 = __importDefault(require("../service/userService"));
const productService_1 = __importDefault(require("../service/productService"));
const cartService_1 = __importDefault(require("../service/cartService"));
const cartDetailService_1 = __importDefault(require("../service/cartDetailService"));
class CartDetailController {
    constructor() {
        this.showFormCart = async (req, res) => {
            let Cart = await cartService_1.default.findById(req.session["User"]._id);
            let idCart = Cart._id.toString();
            let products = await cartDetailService_1.default.finById(idCart);
            res.render('products/cart', { product1: products, cart: Cart });
        };
        this.addCartDetail = async (req, res) => {
            const idProduct = req.params.id;
            if (req.session["User"] !== undefined) {
                let Cart = await cartService_1.default.findById(req.session["User"]._id);
                let idCart = Cart._id.toString();
                let priceProduct = await this.productService.findById(idProduct);
                let amountProduct = 1;
                let total = amountProduct * priceProduct.price;
                await cartDetailService_1.default.addCartDetail(idProduct, idCart, amountProduct, total);
                let totalProduct = await cartDetailService_1.default.fillTotal(idCart);
                let totalCart = totalProduct[totalProduct.length - 1].total;
                await cartService_1.default.addTotal(req.session["User"]._id, totalCart);
                res.redirect(301, '/home');
            }
            else {
                console.log(1);
                console.log(req.session);
            }
        };
        this.updateQuantity = async (req, res) => {
            const idProduct = req.params.id;
            let quantity = req.body;
            let id = req.session["user"];
            let Cart = await cartService_1.default.findById(id.id);
            let idCart = Cart._id.toString();
            await cartDetailService_1.default.updateQuantity(idProduct, quantity.amountProduct);
            let priceProduct = await this.productService.findById(idProduct);
            let amount = await cartDetailService_1.default.fillProduct(idProduct);
            let total = priceProduct.price * amount.amountProduct;
            await cartDetailService_1.default.updateTotal(idProduct, total);
            let totalProduct = await cartDetailService_1.default.fillTotal(idCart);
            let totalCart = totalProduct[totalProduct.length - 1].total;
            await cartService_1.default.addTotal(id.id, totalCart);
            res.redirect('/carts/cart');
        };
        this.deleteProductCart = async (req, res) => {
            let idCartDetail = req.params.id;
            await cartDetailService_1.default.deleteCartDetail(idCartDetail);
            let Cart = await cartService_1.default.findById(req.session["User"]._id);
            let idCart = Cart._id.toString();
            let totalProduct = await cartDetailService_1.default.fillTotal(idCart);
            let totalCart = totalProduct[totalProduct.length - 1].total;
            await cartService_1.default.addTotal(req.session["User"]._id, totalCart);
            res.redirect('/carts/cart');
        };
        this.productService = productService_1.default;
        this.categoryService = categoryService_1.default;
        this.userService = userService_1.default;
    }
}
exports.default = new CartDetailController();
//# sourceMappingURL=cartDetailController.js.map