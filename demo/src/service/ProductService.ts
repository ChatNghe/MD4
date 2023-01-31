import {Product} from "../model/product";
import {AppDataSource} from "../data-source";


class ProductService{
    private productRepository
    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }
    getAll = async ()=>{
        let sql = `select p.id,p.name,p.price,p.image,c.id as idCategory, c.name as nameCategory from product p join category c on p.category = c.id`
        let products = await this.productRepository.query(sql)
        return products;
    }
    save = async (product)=>{
        return this.productRepository.save(product);
    }
    private update = async (id, newProduct)=>{
        let product = await this.productRepository.findOneBy({id:id});
        if(!product){
            return null;
        }
        return this.productRepository.update({id:id},newProduct);
    }
    private findById = async (id)=>{
        let product = await this.productRepository.findOneBy({id:id});
        if(!product){
            return null;
        }
        return product;
    }
    private findByName = async (name)=>{
        let sql =`select p.id,p.name,p.price,p.image,c.id as idCategory, c.name as nameCategory from product p join category c on p.category = c.id where p.name like '%${name}%';`
        let product = await this.productRepository.query(sql);
        if(!product){
            return null;
        }
        return product;
    }
    private remove = async (id)=>{
        let product = await this.productRepository.findOneBy({id:id});
        if(!product){
            return null;
        }
        return this.productRepository.delete({id: id});
    }

}
export default new ProductService();