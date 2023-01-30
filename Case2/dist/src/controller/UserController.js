"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
class UserController {
    constructor() {
        this.showFormLogin = async (req, res) => {
            await this.userService.getAll();
            res.render('user/login');
        };
        this.showFormRegister = async (req, res) => {
            res.render('user/register');
        };
        this.login = async (req, res) => {
            let user = await this.userService.checkUser(req.body);
            if (user) {
                req.session["User"] = user;
                res.redirect(301, '/home');
            }
            else {
                res.redirect(301, '/login');
            }
        };
        this.register = async (req, res) => {
            let user = req.body;
            user.role = 'user';
            user.status = 'unlock';
            await this.userService.addUser(user);
            res.redirect(301, '/login');
        };
        this.logOut = async (req, res) => {
            req.session.destroy(() => {
                res.redirect(301, '/login');
            });
        };
        this.userService = UserService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map