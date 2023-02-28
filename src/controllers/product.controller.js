import jwt from 'jsonwebtoken'
import config from "../config/config.js";
import PersistenceFactory from '../dao/factory.js';

const factory = await PersistenceFactory.getPersistence();
const productService = factory.product;

const home =  (req, res)=>{
    const token = req.cookies[config.COOKIE.user]; //obtenemos el token del usuario
    if(token !== undefined){
        const user = jwt.verify(token, config.JWT.secret);
        console.log(user)
        if(user.role === 'admin'){
            res.render('home');
        }
    }
    res.render('pages/problems', {problem: 'Esta pagina no esta disponible :(', error: '404'});
}

// const chat = async(req, res)=>{
//     let result = await objectChat.getAllNormalize();
//     res.send(result)
// }
const product = async(req, res)=>{
    let result = await productService.getAll();
    res.send(result.proload);
}

const allProduct = async(req, res)=>{
    let result = await productService.getAll();
    res.render('pages/producto',{product:result.proload});
}

const getProduct = async(req, res)=>{
    let result = await productService.getProduct(req.params.id);
    res.send(result)
}
const save = async(req, res)=>{
    //? Recibe y agrega un producto, y lo devuelve con su id asignada
    let image = req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename ;
    const product = req.body;
    product.image = image;
    let result = await productService.save(product); 
    res.send(result);
}
const modifyProduct = async (req, res)=>{
    let newData = req.body;
    let data ={};

    if(req.file !== undefined){
        data = {...newData, image : req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename}
    }
    else data = {...newData};
    let id = req.params.idProduct;
    let result = await productService.updateProduct(data, id)
    res.send({status: "success", payload: result})
}

const deleteProduct = async(req, res)=>{
    let result = await productService.deleteProduct(req.params.id);
    res.send({status: "success", payload: result})
}

export default {home, product, allProduct, getProduct, save, modifyProduct, deleteProduct}