import Product from "../../dao/models/modelProduct.js";
import GenericRepository from "./GenericRepository.js";

export default class ProductRepository extends GenericRepository{
    constructor(dao){
        super(dao, Product.model);
    }
}