import {Request, Response} from "express";
import productService from "../service/ProductService";
import categoryService from "../service/CategoryService";

class HomeController {
    private productService;
    private categoryService;

    constructor() {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    getAll = async (req: Request, res: Response) => {
        try {
            let products = await productService.getAll()
            res.status(200).json(products)
        } catch (e) {
            res.status(500).json({
                    message: e.message
                }
            )
        }


    }

    create = async (req: Request, res: Response) => {
        try {
            let product = await productService.save(req.body)
            res.status(200).json(product)

        } catch (e) {
            res.status(500).json({
                    message: e.message
                }
            )
        }

    }

    update = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let product = await this.productService.update(id, req.body)
            res.status(200).json(product)
        } catch (e) {
            res.status(500).json({
                    message: e.message
                }
            )
        }

    }

    remove = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            await this.productService.remove(id)
            res.status(200).json({message: 'thành công'})
        } catch (e) {
            res.status(500).json({
                    message: e.message
                }
            )
        }
    }
    findById = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let product = await this.productService.findById(id)
            res.status(200).json(product)
        } catch (e) {
            res.status(500).json({
                    message: e.message
                }
            )
        }
    }
    findByName = async (req: Request, res: Response) => {
        try {
            let name = req.query.name;
            let product = await this.productService.findByName(name)
            res.status(200).json(product)
        } catch (e) {
            res.status(500).json({
                    message: e.message
                }
            )
        }
    }
}

export default new HomeController()