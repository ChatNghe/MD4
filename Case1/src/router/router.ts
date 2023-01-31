import {Router} from "express";
import homeController from "../controller/HomeController";
import {productRouter1} from "./product-router";
import {userRouter} from "./user-router";
import {cartRouter} from "./cart-router";



export const router = Router();

router.use('/products',productRouter1)
router.use('/users',userRouter)
router.use('/carts',cartRouter)
router.get('/home', homeController.showHome)
router.post('/home', homeController.showHomeSearch)
router.get('/checkout', homeController.showCheckOut)