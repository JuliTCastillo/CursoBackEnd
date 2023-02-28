//importamos todo el modulo | utilizando la llaves
import { Router } from "express";
import carritoController from "../controllers/carrito.controller.js";

const router = Router(); //inicializamos el route

//* Crea un carrito y devuelve su id
router.post('/', carritoController.save);

//* Vacia un carrito y lo elimina
router.delete('/:id', carritoController.deleteCart);

//* Lista todos los productos al carrito por su id de producto
router.get('/:id/productos', carritoController.getProduct);

//* Obtenemos la informacion del carrito
router.get('/:idCart', carritoController.getAll);

//* Incorpora productos al carrito por su id de carrito y de producto
// router.post('/:id/productos', async(req, res) =>{
//     let id = req.params.id;
//     let product = req.body;
//     let response = await objeto.addProduct(id, product);
//     res.send(response)
// })
//* Incorpora productos al carrito por su id de carrito y de producto

router.post('/:idProduct/:count', carritoController.addProduct);

//* Elimina un producto del carrito por su id de carrito y de producto
router.delete('/:id/productos/:id_prod', carritoController.deleteProduct);

export default router;