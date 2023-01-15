//importamos todo el modulo | utilizando la llaves
import { Router } from "express";
import { uploader } from "../utils.js"
import Contenedor from "../managers/dbProducto.js";

const router = Router(); //inicializamos el route
const object = new Contenedor ('products');

router.get('/home', (req, res)=>{
    res.render('home');
})

router.get('/product', async(req, res)=>{
    let result = await object.getAll();
    res.send(result.proload);
})

router.get('/allProduct', async(req, res)=>{
    let result = await object.getAll();
    res.render('pages/producto',{product:result.proload});
})

router.get("/:id", async(req, res)=>{
    let result = await object.getProduct(req.params.id);
    res.send(result.proload)
})
router.post("/", uploader.single('image'), async(req, res)=>{
    //? Recibe y agrega un producto, y lo devuelve con su id asignada
    let image = req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename ;
    const product = req.body;
    product.image = image;
    let result = await object.save(product); 
    console.log(result)
    res.send(result);
})
router.put("/:id",uploader.single('images') , async (req, res)=>{
    
})
router.delete("/:id",async(req, res)=>{
    let result = await object.deleteProduct(req.params.id);
    res.send({status: "success", payload: result})
})

export default router;

