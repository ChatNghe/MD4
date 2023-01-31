"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../service/ProductService"));
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
class HomeController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                let products = await ProductService_1.default.getAll();
                res.status(200).json(products);
            }
            catch (e) {
                res.status(500).json({
                    message: e.message
                });
            }
        };
        this.create = async (req, res) => {
            try {
                let product = await ProductService_1.default.save(req.body);
                res.status(200).json(product);
            }
            catch (e) {
                res.status(500).json({
                    message: e.message
                });
            }
        };
        this.update = async (req, res) => {
            try {
                let id = req.params.id;
                let product = await this.productService.update(id, req.body);
                res.status(200).json(product);
            }
            catch (e) {
                res.status(500).json({
                    message: e.message
                });
            }
        };
        this.remove = async (req, res) => {
            try {
                let id = req.params.id;
                await this.productService.remove(id);
                res.status(200).json({ message: 'thành công' });
            }
            catch (e) {
                res.status(500).json({
                    message: e.message
                });
            }
        };
        this.findById = async (req, res) => {
            try {
                let id = req.params.id;
                let product = await this.productService.findById(id);
                res.status(200).json(product);
            }
            catch (e) {
                res.status(500).json({
                    message: e.message
                });
            }
        };
        this.findByName = async (req, res) => {
            try {
                let name = req.query.name;
                let product = await this.productService.findByName(name);
                res.status(200).json(product);
            }
            catch (e) {
                res.status(500).json({
                    message: e.message
                });
            }
        };
        this.productService = ProductService_1.default;
        this.categoryService = CategoryService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=HomeController.js.map