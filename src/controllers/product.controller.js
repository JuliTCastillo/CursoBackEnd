import jwt from 'jsonwebtoken'
import config from "../config/config.js";
import UserDTO from '../dao/dto/user.dto.js';
import ProductDTO from '../dao/dto/Product.dto.js';
import { productService, cartService} from '../services/services.js';
import { mailing } from '../services/MailingServices.js';

//! Obtenemos los producto
const product = async(req, res)=>{
    let result = await productService.getAll();
    res.send(result);
}
//! Obtenemos el producto por el code
const getProduct = async(req, res)=>{
    //pasamos como parametro un objeto con el nombre de la propiedad que queremos y el valor que buscamos
    let result = (await productService.getAll({code: req.params.id}))[0];
    res.send(result)
}

//! Guardamos el producto
const save = async(req, res)=>{
    let image = "";
    if(req.file !== undefined){
        //? Recibe y agrega un producto, y lo devuelve con su id asignada
        image = req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename;
    }
    const product = req.body;
    product.image = image;
    
    let result = await productService.save({...product}); 
    res.send(result);
}
//! modificamos el producto
const modifyProduct = async (req, res)=>{
    let newData = req.body;
    let data ={};

    if(req.file !== undefined){
        data = {...newData, image : req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename}
    }
    else data = {...newData};

    let id = req.params.idProduct;
    let result = await productService.update([{code:id}, {...data}])
    res.send({status: "success", payload: result})
}

const deleteProduct = async(req, res)=>{
    let result = await productService.delete({code: req.params.id});
    res.send({status: "success", payload: result})
}

const buyProduct = async(req, res) =>{
    const cart = (await cartService.getAll({_id: req.body.idCart}))[0];

    await mailing(cart, req.body.email);

    cart.product.forEach(async (element) => {
        const newProduct = ProductDTO.updateDbDTO(element);
        await productService.update([{_id: element._id}, {...newProduct}]);
    })

    const token = req.cookies[config.COOKIE.user]; //obtenemos el token del usuario
    const user = jwt.verify(token, config.JWT.secret); //decodificamos el token del usuario
    console.log(user)
    const tokenizedUser = UserDTO.newGetDbDTO(user, '') //modificamos el token del user
    console.log(tokenizedUser)

    res.clearCookie(config.COOKIE.user); //! BORRAMOS LA COOKIE
    //* CREAMOS UN NUEVO TOKEN CON LOS DATOS COA
    const newToken = jwt.sign(tokenizedUser, config.JWT.secret, {expiresIn: "1d" });
    res.cookie(config.COOKIE.user, newToken);

    res.send({status: "success", payload: 'ok'})
}

export default {product, getProduct, save, modifyProduct, deleteProduct, buyProduct}