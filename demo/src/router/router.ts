import {Router} from "express"
import {productRouter} from "./product-router";
import {userRouter} from "./user-router";
import categoryController from "../controller/CategoryController";
export const router = Router();
router.get('/categories',categoryController.getAll)
router.use('/products',productRouter)
router.use('/auth',userRouter)
