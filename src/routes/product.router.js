//importamos todo el modulo | utilizando la llaves
import { Router } from "express";
import {uploader } from "../utils.js"
import productController from "../controllers/product.controller.js";

const router = Router(); //inicializamos el route

router.get('/product', productController.product);

router.get("/:id", productController.getProduct);

router.post("/",uploader.single('image'),  productController.save);

router.put("/modifyProduct/:idProduct",uploader.single('image'), productController.modifyProduct);

router.put('/updateStock', productController.buyProduct)

router.delete("/:code", productController.deleteProduct);

router.get('*', (req, res)=>{
    req.logger.warn(`Se inteto ingresar a ${req.url} que no existe`);
    res.render('pages/problems', {problem: 'Esta pagina no es disponible :(', error: '404'});
})


export default router;

