"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter1 = void 0;
const express_1 = require("express");
const HomeController_1 = __importDefault(require("../controller/HomeController"));
exports.productRouter1 = (0, express_1.Router)();
exports.productRouter1.get('/create', HomeController_1.default.showFormCreate);
exports.productRouter1.post('/create', HomeController_1.default.create);
exports.productRouter1.get('/edit/:id', HomeController_1.default.showFormEdit);
exports.productRouter1.post('/edit/:id', HomeController_1.default.update);
exports.productRouter1.get('/delete/:id', HomeController_1.default.showFormDelete);
exports.productRouter1.get('/deleteProduct/:id', HomeController_1.default.remove);
//# sourceMappingURL=product-router.js.map