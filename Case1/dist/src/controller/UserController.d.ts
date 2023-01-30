import { Request, Response } from "express";
declare class HomeController {
    private userService;
    constructor();
    showFormLogin: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
}
declare const _default: HomeController;
export default _default;
