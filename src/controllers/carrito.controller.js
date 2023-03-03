// import PersistenceFactory from '../dao/factory.js';
import jwt from 'jsonwebtoken';
import config from "../config/config.js";
import UserDTO from '../dao/dto/User.dto.js'
import CartDTO from '../dao/dto/cart.dto.js';
import { cartService, productService} from '../services/services.js';

// const factory = await PersistenceFactory.getPersistence();
// const cartService = factory.cart;
// const productService = factory.product;

//* Crea un carrito y devuelve su id
const save = async(req, res)=>{
    let id = (await cartService.save())._id.toString(); //creamso el carrito
    const token = req.cookies[config.COOKIE.user]; //obtenemos el token del usuario
    const user = jwt.verify(token, config.JWT.secret); //decodificamos el token del usuario

    const tokenizedUser = UserDTO.putDbDTO(user, id) //modificamos el token del user
    console.log('tokenizedUser ', tokenizedUser)
    res.clearCookie(config.COOKIE.user); //! BORRAMOS LA COOKIE
    // // //* CREAMOS UN NUEVO TOKEN CON LOS DATOS COA
        const newToken = jwt.sign(tokenizedUser, config.JWT.secret, {expiresIn: "1d" });
        res.cookie(config.COOKIE.user, newToken);
        res.send({status:'success', proload: id})
}

//* Vacia un carrito y lo elimina
const deleteCart = async(req, res)=>{
    let id = req.params.id;
    await cartService.deleteCart(id);
    const token = req.cookies[config.COOKIE.user]; //obtenemos el token del usuario
    const user = jwt.verify(token, config.JWT.secret); //decodificamos el token del usuario
    const tokenizedUser = UserDTO.getDbDTO(user); //Traemos al objeto desde el DTO

    res.clearCookie(config.COOKIE.user); //! BORRAMOS LA COOKIE
    // //* CREAMOS UN NUEVO TOKEN CON LOS DATOS COA
    const newToken = jwt.sign(tokenizedUser, config.JWT.secret, {expiresIn: "1d" });
    res.cookie(config.COOKIE.user, newToken);
    res.send({status: 'success', message:'esto aca'})
}

//* Lista todos los productos al carrito por su id de producto
const getProduct = async(req, res)=>{
    let id = req.params.id;
    //La nueva estructura del dao devuelve los datos en array
    let listProduct = (await cartService.getAll({_id:id}))[0];
    res.send(listProduct);
}

//* Obtenemos la informacion del carrito
const getAll = async(req, res)=>{
    let id = req.params.idCart;
    let listProduct = (await cartService.getAll({_id:id}))[0];
    res.send(listProduct);
}
//* Incorpora productos al carrito por su id de carrito y de producto
const addProduct = async(req, res) =>{
    let idProduct = req.params.idProduct;
    let count = req.params.count;

    const token = req.cookies[config.COOKIE.user]; //obtenemos el token del usuario
    const user = jwt.verify(token, config.JWT.secret); //decodificamos el token del usuario
    let dataCart = (await cartService.getAll({_id: user.idCart}))[0]; //obtenemos la info del carrito
    let infoProduct = (await productService.getAll({code: idProduct}))[0]; //obtenemos la informacion del producto

    let obj = CartDTO.getDbDTO(infoProduct, count); //agregamos la propiedad de count
    dataCart.product.push(obj); //pusheamos el nuevo producto
    
    let lengthProduct = dataCart.product; //obtenemos el tamaño el array del producto
    dataCart.count = lengthProduct.length //Lo asignamos a la infor del carrito

    let result = await cartService.update([{_id: dataCart._id.toString()}, {product: dataCart.product, count: dataCart.count}])
    res.send({status:'success', proload: dataCart});
}
//* Elimina un producto del carrito por su id de carrito y de producto
const deleteProduct = async(req, res)=>{
    let idCart = req.params.id;
    let idProduct = req.params.id_prod;
    let response = await cartService.deleteProduct(idCart, idProduct);
    res.send(response)
}

export default {save, deleteCart, getProduct, getAll, addProduct, deleteCart, deleteProduct}