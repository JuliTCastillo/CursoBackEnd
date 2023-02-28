import PersistenceFactory from '../dao/factory.js';
import jwt from 'jsonwebtoken';
import config from "../config/config.js";

const factory = await PersistenceFactory.getPersistence();
const productService = factory.product;

const tienda = async(req, res)=>{
    let result = await productService.getAll();
    res.render('pages/products',{product:result.proload});
}

const getProduct = async(req, res)=>{
    let id = req.params.id;
    let result = await productService.getProduct(id);
    res.render('pages/product',{product: result.proload});
}

export default {tienda, getProduct}