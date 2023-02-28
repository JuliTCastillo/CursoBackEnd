import {objectCart, objectProduct} from '../dao/index.js';
import jwt from 'jsonwebtoken';
import config from "../config/config.js";

//* Crea un carrito y devuelve su id
const save = async(req, res)=>{
    let id = await objectCart.save(); //creamso el carrito
    const token = req.cookies[config.COOKIE.user]; //obtenemos el token del usuario
    const user = jwt.verify(token, config.JWT.secret); //decodificamos el token del usuario
    const tokenizedUser = {
        id: user.id,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
        idCart : id.proload
    };
    res.clearCookie(config.COOKIE.user); //! BORRAMOS LA COOKIE
    // //* CREAMOS UN NUEVO TOKEN CON LOS DATOS COA
    const newToken = jwt.sign(tokenizedUser, config.JWT.secret, {expiresIn: "1d" });
    res.cookie(config.COOKIE.user, newToken);
    res.send({status:'success', proload: id.proload})
}

//* Vacia un carrito y lo elimina
const deleteCart = async(req, res)=>{
    let id = req.params.id;
    await objectCart.deleteCart(id);
    const token = req.cookies[config.COOKIE.user]; //obtenemos el token del usuario
    const user = jwt.verify(token, config.JWT.secret); //decodificamos el token del usuario
    const tokenizedUser = {
        id: user.id,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
        idCart : ''
    };
    res.clearCookie(config.COOKIE.user); //! BORRAMOS LA COOKIE
    // //* CREAMOS UN NUEVO TOKEN CON LOS DATOS COA
    const newToken = jwt.sign(tokenizedUser, config.JWT.secret, {expiresIn: "1d" });
    res.cookie(config.COOKIE.user, newToken);
    res.send({status: 'success', message:'esto aca'})
}

//* Lista todos los productos al carrito por su id de producto
const getProduct = async(req, res)=>{
    let id = req.params.id;
    let listProduct = await objectCart.getProduct(id);
    res.send(listProduct);
}

//* Obtenemos la informacion del carrito
const getAll = async(req, res)=>{
    let id = req.params.idCart;
    let listProduct = await objectCart.getAll(id);
    res.send(listProduct);
}
//* Incorpora productos al carrito por su id de carrito y de producto
const addProduct = async(req, res) =>{
    let idProduct = req.params.idProduct;
    let count = req.params.count;
    const token = req.cookies[config.COOKIE.user]; //obtenemos el token del usuario
    const user = jwt.verify(token, config.JWT.secret); //decodificamos el token del usuario
    let dataCart = (await objectCart.getAll(user.idCart)).proload[0]; //obtenemos la info del carrito
    let infoProduct = (await objectProduct.getProduct(idProduct)).proload[0]; //obtenemos la informacion del producto
    
    let newInfoProduct = {
        id: infoProduct.id,
        name: infoProduct.name,
        description: infoProduct.description,
        image: infoProduct.image,
        code: infoProduct.code,
        price: infoProduct.price,
        stock: infoProduct.stock,
    }

    let obj = {...newInfoProduct, count: count}; //agregamos la propiedad de count
    dataCart.product.push(obj); //pusheamos el nuevo producto
    let lengthProduct = dataCart.product; //obtenemos el tamaño el array del producto
    dataCart.count = lengthProduct.length //Lo asignamos a la infor del carrito

    let result = await objectCart.addProduct(dataCart._id, dataCart)
    res.send({status:'success', proload: dataCart});
}
//* Elimina un producto del carrito por su id de carrito y de producto
const deleteProduct = async(req, res)=>{
    let idCart = req.params.id;
    let idProduct = req.params.id_prod;
    let response = await objectCart.deleteProduct(idCart, idProduct);
    res.send(response)
}

export default {save, deleteCart, getProduct, getAll, addProduct, deleteCart, deleteProduct}