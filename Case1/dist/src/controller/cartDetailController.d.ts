import { Request, Response } from "express";
declare class CartDetailController {
    private productService;
    private categoryService;
    private userService;
    constructor();
    showFormCart: (req: Request, res: Response) => Promise<void>;
    addCartDetail: (req: Request, res: Response) => Promise<void>;
    updateQuantity: (req: Request, res: Response) => Promise<void>;
    deleteProductCart: (req: Request, res: Response) => Promise<void>;
}
declare const _default: CartDetailController;
export default _default;
