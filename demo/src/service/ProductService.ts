import {Product} from "../model/product";


class ProductService{
    constructor() {
    }
    getAll = async ()=>{
        let products = await Product.find()
        return products;
    }
    save = async (product)=>{
        return 'Success';
    }

}
export default new ProductService();