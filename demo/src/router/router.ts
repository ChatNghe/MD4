import {Router} from "express"
import homeController from "../controller/HomeController";
export const router = Router();
router.get('/home',homeController.showHome)
router.get('/products/create',homeController.showFormCreate)
router.post('/products/create',homeController.create)
