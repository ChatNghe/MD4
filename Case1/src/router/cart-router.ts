import {Router} from "express";
import cartDetailController from "../controller/cartDetailController";
export const cartRouter = Router();
cartRouter.get("/cart",cartDetailController.showFormCart)
cartRouter.post("/addProduct/:id",cartDetailController.addCartDetail)
cartRouter.post("/quantity/:id", cartDetailController.updateQuantity)
cartRouter.get("/delete/:id", cartDetailController.deleteProductCart)