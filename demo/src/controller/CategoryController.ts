import {Request, Response} from "express";

import categoryService from "../service/CategoryService";


class CategoryController {
    private categoryService;


    constructor() {
        this.categoryService =categoryService;

    }
    getAll = async (req: Request, res: Response) => {
        try {
            let categories = await categoryService.getAll()
            res.status(200).json(categories)
        } catch (e) {
            res.status(500).json({
                    message: e.message
                }
            )
        }


    }


}
export default new CategoryController()