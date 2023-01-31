import {Request, Response} from "express";
import userService from "../service/UserService";
import cartService from "../service/cartService";

class UserController {
    private userService;
    constructor() {
        this.userService = userService;

    }
    showFormLogin = async (req: Request, res: Response) => {
        await this.userService.getAll();
        res.render('user/login',)
    }

    login = async (req: Request, res: Response) => {
        let user = await this.userService.checkUser(req.body);
        let idUser = user._id.toString()
        let status = "unpaid"
        await cartService.addCart(idUser, status);
        if (user) {
            // @ts-ignore
            req.session.User = user;
            res.redirect(301, '/home')
        } else {
            res.redirect(301, '/users/login')
        }
    }
    logOut = async (req: Request, res: Response) => {
        req.session.destroy(() => {
            res.redirect(301, '/users/login')
        })
    }
}

export default new UserController();