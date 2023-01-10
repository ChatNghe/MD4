"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../model/product");
class ProductService {
    constructor() {
        this.getAll = async () => {
            let products = await product_1.Product.find();
            return products;
        };
        this.save = async (product) => {
            return 'Success';
            x;
        };
    }
}
exports.default = new ProductService();
//# sourceMappingURL=ProductService.js.map