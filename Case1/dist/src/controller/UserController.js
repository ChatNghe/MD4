"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const cartService_1 = __importDefault(require("../service/cartService"));
class UserController {
    constructor() {
        this.showFormLogin = async (req, res) => {
            await this.userService.getAll();
            res.render('user/login');
        };
        this.login = async (req, res) => {
            let user = await this.userService.checkUser(req.body);
            let idUser = user._id.toString();
            let status = "unpaid";
            await cartService_1.default.addCart(idUser, status);
            if (user) {
                req.session.User = user;
                res.redirect(301, '/home');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.logOut = async (req, res) => {
            req.session.destroy(() => {
                res.redirect(301, '/users/login');
            });
        };
        this.userService = UserService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map