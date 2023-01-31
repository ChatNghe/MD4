import {Product} from "../model/product";

class ProductService{
    constructor() {
    }
    getAll = async () => {
        let products = await Product.find().populate('category');
        return products;
    }
    save = async (product)=>{
        return  Product.create(product)
    }
    private update = async (id, newProduct)=>{
        let product = await Product.findOne({_id: id});
        if(!product){
            return null;
        }
        return Product.updateOne({_id: id},newProduct);
    }
    private findById = async (id)=>{
        let product = await Product.findOne({_id:id});
        if(!product){
            return null;
        }
        return product;
    }
    private remove = async (id)=>{
        let product = await Product.findOne({_id:id});
        if(!product){
            return null;
        }
        return Product.deleteOne({_id: id});
    }
     search = async (name)=>{
        let product = await Product.find({ 'name' : { '$regex' : name, '$options' : 'i' } });
        return product;
    }
}

export default new ProductService();