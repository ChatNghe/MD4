import {Router} from "express"
import homeController from "../controller/HomeController";
import productService from "../service/ProductService";
import categoryService from "../service/CategoryService";
import {productRouter} from "./product-router";
import {userRouter} from "./user-router";
import categoryController from "../controller/CategoryController";
export const router = Router();
router.get('/categories',categoryController.getAll)
router.use('/products',productRouter)
router.use('/users',userRouter)
