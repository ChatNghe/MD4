"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../service/ProductService"));
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
class HomeController {
    constructor() {
        this.showHome = async (req, res) => {
            let products = await ProductService_1.default.getAll();
            if (req.session["User"].role === 'admin') {
                res.render('home', { products: products });
            }
            else
                res.render('homeUser', { products: products });
        };
        this.showHomeSearch = async (req, res) => {
            let products = await ProductService_1.default.search(req.body.search);
            if (req.session["User"].role === 'admin') {
                res.render('home', { products: products });
            }
            else
                res.render('homeUser', { products: products });
        };
        this.showFormCreate = async (req, res) => {
            let categories = await this.categoryService.getAll();
            res.render('products/create', { categories: categories });
        };
        this.showCheckOut = async (req, res) => {
            res.render('products/checkout');
        };
        this.create = async (req, res) => {
            if (req.files) {
                let image = req.files.image;
                if ("mv" in image) {
                    await image.mv('./public/storage/' + image.name);
                    let product = req.body;
                    product.image = '/storage/' + image.name;
                    await ProductService_1.default.save(product);
                    res.redirect(301, '/home');
                }
            }
        };
        this.showFormEdit = async (req, res) => {
            let id = req.params.id;
            let product = await this.productService.findById(id);
            res.render('products/edit', { product: product });
        };
        this.update = async (req, res) => {
            let id = req.params.id;
            if (req.files) {
                let image = req.files.image;
                if ("mv" in image) {
                    await image.mv('./public/storage/' + image.name);
                    let product = req.body;
                    product.image = '/storage/' + image.name;
                    await this.productService.update(id, req.body);
                    res.redirect(301, '/home');
                }
            }
        };
        this.showFormDelete = async (req, res) => {
            let idDelete = req.params.id;
            res.render('products/delete', { idDelete: idDelete });
        };
        this.remove = async (req, res) => {
            let id = req.params.id;
            await this.productService.remove(id);
            res.redirect(301, '/home');
        };
        this.productService = ProductService_1.default;
        this.categoryService = CategoryService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=HomeController.js.map