import {Carts} from "../model/cart";

class CartService {
    constructor() {
    }
    addCart = async (idUser, status) => {
        await Carts.create({user: idUser,status: status})
    }
    findById = async (idUser) => {
        let idCart = await Carts.findOne({user: idUser})
        return idCart;
    }
    addTotal = async (idUser, totalCart) => {
        await Carts.updateOne({user: idUser}, {total: totalCart})
    }
}
export default new CartService();