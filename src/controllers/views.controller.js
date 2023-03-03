// import PersistenceFactory from '../dao/factory.js';
// const factory = await PersistenceFactory.getPersistence();
// const productService = factory.product;
import { productService } from "../services/services.js";

const tienda = async(req, res)=>{
    let result = await productService.getAll();
    res.render('pages/products',{product:result});
}

const getProduct = async(req, res)=>{
    let id = req.params.id;
    let result = (await productService.getAll({code: id}));
    res.render('pages/product',{product: result});
}

export default {tienda, getProduct}