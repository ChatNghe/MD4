import {Request, Response} from "express";
import userService from "../service/UserService";


class UserController {
    private userService;
    constructor() {
        this.userService = userService;

    }
    showFormLogin = async (req: Request, res: Response) => {
        await this.userService.getAll();
        res.render('user/login',)
    }
    showFormRegister = async (req: Request, res: Response) => {
        res.render('user/register',)
    }

    login = async (req: Request, res: Response) => {
        let user = await this.userService.checkUser(req.body);

        if (user) {
            req.session["User"] = user;
            res.redirect(301, '/home')
        } else {
            res.redirect(301, '/login')
        }
    }
    register = async (req: Request, res: Response) => {
        let user = req.body
        // user.username = req.body.username
        // user.password = req.body.password
        user.role = 'user'
        user.status = 'unlock'
        await this.userService.addUser(user)
        res.redirect(301, '/login')
    }

    logOut = async (req: Request, res: Response) => {
        req.session.destroy(() => {
            res.redirect(301, '/login')
        })
    }
}

export default new UserController();