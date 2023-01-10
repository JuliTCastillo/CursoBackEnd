//importamos todo el modulo | utilizando la llaves
import { Router } from "express";
import Carrito from "../managers/carrito.js";


const router = Router(); //inicializamos el route
const objeto = new Carrito();
let idUsuario = -1;//Para guardar la id del carrito del usuario

//* Crea un carrito y devuelve su id
router.post('/', async(req, res)=>{
    let id = await objeto.save();
    idUsuario = id.proload;
    res.send(id);
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
    let listProduct = await objeto.getAll(id);
    console.log(listProduct)
    res.send(listProduct.proload);
})
//* Incorpora productos al carrito por su id de carrito y de producto
router.post('/:id/productos', async(req, res) =>{
    let id = req.params.id;
    const product = req.body;
    let response = await objeto.addProduct(id, JSON.stringify(product));
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