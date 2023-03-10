import { productService } from "../services/services.js";
import jwt from 'jsonwebtoken'
import config from "../config/config.js";

const tienda = async(req, res)=>{
    let result = await productService.getAll();
    res.render('pages/products',{product:result});
}


const admin =  (req, res)=>{
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


const getProduct = async(req, res)=>{
    let id = req.params.id;
    let result = (await productService.getAll({code: id}));
    res.render('pages/product',{product: result});
}

export default {tienda, getProduct, admin}