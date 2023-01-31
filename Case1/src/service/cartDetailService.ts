import {CartDetails} from "../model/cartDetail";
class CartDetailService {
    constructor() {
    }
    addCartDetail = async (idProduct, idCart, amount, total) => {
        return CartDetails.create({product: idProduct,cart: idCart,amountProduct: amount,total: total})

    }

    finById = async (idCart) => {
        let product =  await CartDetails.find({cart: idCart}).populate('product')
        return product;
    }
    updateQuantity = async (idCartDetail,quantity) => {
        await CartDetails.updateOne({product: idCartDetail} ,{amountProduct:quantity})
    }
    fillProduct = async (idProduct) => {
        let CartDetail =  await CartDetails.findOne({product: idProduct});
        return CartDetail;

    }
    updateTotal = async (idProduct, total) => {
        await CartDetails.updateOne({product: idProduct}, {total: total})
    }
    fillTotal = async (idCart) => {
        let total = await CartDetails.aggregate([{$match: {cart: idCart}}, {$group : {_id : "$id", total : {$sum : "$total"}}}])
        return total
    }
    deleteCartDetail = async (idCart) => {
        await CartDetails.deleteOne({_id: idCart})
    }
}
export default new CartDetailService();