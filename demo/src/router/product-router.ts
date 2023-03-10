import {Router} from "express";
import homeController from "../controller/HomeController";
import {router} from "./router";
import {auth} from "../middleware/auth";

export const productRouter = Router();
productRouter.use(auth);
productRouter.get('/',homeController.getAll)
productRouter.post('',homeController.create)
productRouter.put('/:id',homeController.update)
productRouter.delete('/:id',homeController.remove)
productRouter.get('/:id',homeController.findById)
productRouter.get('/search/findByName',homeController.findByName)