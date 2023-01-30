"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const HomeController_1 = __importDefault(require("../controller/HomeController"));
const UserController_1 = __importDefault(require("../controller/UserController"));
exports.router = (0, express_1.Router)();
exports.router.get('/home', HomeController_1.default.showHome);
exports.router.post('/home', HomeController_1.default.showHomeSearch);
exports.router.get('/create', HomeController_1.default.showFormCreate);
exports.router.post('/create', HomeController_1.default.create);
exports.router.get('/edit/:id', HomeController_1.default.showFormEdit);
exports.router.post('/edit/:id', HomeController_1.default.update);
exports.router.get('/delete/:id', HomeController_1.default.showFormDelete);
exports.router.get('/deletePost/:id', HomeController_1.default.remove);
exports.router.get('/login', UserController_1.default.showFormLogin);
exports.router.post('/login', UserController_1.default.login);
exports.router.get('/register', UserController_1.default.showFormRegister);
exports.router.post('/register', UserController_1.default.register);
exports.router.get('/logout', UserController_1.default.logOut);
//# sourceMappingURL=router.js.map