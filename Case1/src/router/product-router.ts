import {Router} from "express";
import homeController from "../controller/HomeController";


export const productRouter1 = Router()
productRouter1.get('/create', homeController.showFormCreate)
productRouter1.post('/create',homeController.create)
productRouter1.get('/edit/:id', homeController.showFormEdit)
productRouter1.post('/edit/:id',homeController.update)
productRouter1.get('/delete/:id',homeController.showFormDelete)
productRouter1.get('/deleteProduct/:id',homeController.remove)