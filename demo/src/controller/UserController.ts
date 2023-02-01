import {Request, Response} from "express";
import userService from "../service/UserService";


class HomeController {
    private userService;


    constructor() {
        this.userService = userService;

    }

    register = async (req: Request, res: Response) => {
        let user = await this.userService.register(req.body);
        res.status(201).json(user)
    }
    login = async (req: Request, res: Response) => {
        let response = await this.userService.checkUser(req.body);
        res.status(200).json(response)
    }
}

export default new HomeController()