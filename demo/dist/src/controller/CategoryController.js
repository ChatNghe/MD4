"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
class CategoryController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                let categories = await CategoryService_1.default.getAll();
                res.status(200).json(categories);
            }
            catch (e) {
                res.status(500).json({
                    message: e.message
                });
            }
        };
        this.categoryService = CategoryService_1.default;
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=CategoryController.js.map