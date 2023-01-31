import categoryService from "../service/categoryService";
import userService from "../service/userService";
import productService from "../service/productService";
import cartService from "../service/cartService";
import cartDetailService from "../service/cartDetailService";
import {Request, Response} from "express";
class CartDetailController {
    private productService
    private categoryService
    private userService
    constructor() {
        this.productService = productService;
        this.categoryService = categoryService;
        this.userService = userService;

    }
    showFormCart = async (req: Request, res: Response) => {

        let Cart = await cartService.findById(req.session["User"]._id)
        let idCart = Cart._id.toString()
        let products = await cartDetailService.finById(idCart)
        res.render('products/cart', {product1: products, cart: Cart})
    }
    addCartDetail = async (req: Request, res: Response) => {
        const idProduct = req.params.id;
        if(req.session["User"] !== undefined){
            let Cart = await cartService.findById(req.session["User"]._id)
            let idCart = Cart._id.toString()
            let priceProduct = await this.productService.findById(idProduct)
            let amountProduct = 1
            let total = amountProduct * priceProduct.price
            await cartDetailService.addCartDetail(idProduct, idCart,amountProduct, total)
            let totalProduct = await cartDetailService.fillTotal(idCart)
            let totalCart = totalProduct[totalProduct.length - 1].total
            await cartService.addTotal(req.session["User"]._id,totalCart)
            res.redirect(301, '/home')
        }else {
            console.log(1)
            console.log(req.session)
        }

    }
    updateQuantity = async (req: Request, res: Response) => {
        const idProduct = req.params.id;
        let quantity = req.body;
        let id = req.session["user"];
        let Cart = await cartService.findById(id.id)
        let idCart = Cart._id.toString()
        await cartDetailService.updateQuantity(idProduct, quantity.amountProduct)
        let priceProduct = await this.productService.findById(idProduct)
        let amount = await cartDetailService.fillProduct(idProduct)
        let total = priceProduct.price * amount.amountProduct
        await cartDetailService.updateTotal(idProduct, total)
        let totalProduct = await cartDetailService.fillTotal(idCart)
        let totalCart = totalProduct[totalProduct.length - 1].total
        await cartService.addTotal(id.id,totalCart)
        res.redirect('/carts/cart')
    }
    deleteProductCart = async (req: Request, res: Response) => {
        let idCartDetail = req.params.id;
        await cartDetailService.deleteCartDetail(idCartDetail)
        let Cart = await cartService.findById(req.session["User"]._id)
        let idCart = Cart._id.toString()
        let totalProduct = await cartDetailService.fillTotal(idCart)
        let totalCart = totalProduct[totalProduct.length - 1].total
        await cartService.addTotal(req.session["User"]._id,totalCart)
        res.redirect('/carts/cart')
    }
}
export default new CartDetailController();