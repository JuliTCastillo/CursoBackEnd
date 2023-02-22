//importamos todo el modulo | utilizando la llaves
import { Router } from "express";
import {objectCart} from '../dao/index.js';
import jwt from 'jsonwebtoken';
import config from "../config/config.js";

const router = Router(); //inicializamos el route
const objeto = objectCart;

//* Crea un carrito y devuelve su id
router.post('/', async(req, res)=>{
    let id = await objeto.save(); //creamso el carrito
    console.log('soy el resultado de la bdd de cart ',id)
    const token = req.cookies['userConnect']; //obtenemos el token del usuario
    const user = jwt.verify(token, config.JWT.secret); //decodificamos el token del usuario
    const tokenizedUser = {
        id: user.id,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
        idCart : id.proload
    };
    console.log('hola doy post cart ', tokenizedUser)
    res.clearCookie('userConnect'); //! BORRAMOS LA COOKIE
    // //* CREAMOS UN NUEVO TOKEN CON LOS DATOS COA
    const newToken = jwt.sign(tokenizedUser, config.JWT.secret, {expiresIn: "1d" });
    res.cookie('userConnect', newToken);
    res.send({status:'success', proload: id.proload})
})
//* Vacia un carrito y lo elimina
router.delete('/:id',async(req, res)=>{
    let id = req.params.id;
    let response = await objeto.deleteCart(id);
    res.send(response);
})
//* Lista todos los productos al carrito por su id de producto
router.get('/:id/productos', async(req, res)=>{
    let id = req.params.id;
    let listProduct = await objeto.getProduct(id);
    res.send(listProduct);
})
//* Incorpora productos al carrito por su id de carrito y de producto
router.post('/:id/productos', async(req, res) =>{
    let id = req.params.id;
    let product = req.body;
    let response = await objeto.addProduct(id, product);
    res.send(response)
})
//* Elimina un producto del carrito por su id de carrito y de producto
router.delete('/:id/productos/:id_prod', async(req, res)=>{
    let idCart = req.params.id;
    let idProduct = req.params.id_prod;
    let response = await objeto.deleteProduct(idCart, idProduct);
    res.send(response)
})

export default router;