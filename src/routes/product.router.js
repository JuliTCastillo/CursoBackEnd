//importamos todo el modulo | utilizando la llaves
import { Router } from "express";
import { addLogger, uploader } from "../utils.js"
import {objectProduct, objectChat, objectCart} from '../dao/index.js';
import { generateProduct } from "../utils/mocks.js";

const router = Router(); //inicializamos el route
const object = objectProduct;

router.get('/home', (req, res)=>{
    res.render('home');
})
router.get('/chat', async(req, res)=>{
    let obj = new objectChat();
    let result = await obj.getAllNormalize();
    res.send(result)
})
router.get('/product', async(req, res)=>{
    let result = await object.getAll();
    res.send(result.proload);
})
router.get('/test', (req, res)=>{
    let product = [];
    for(let i=0; i < 5; i++){
        let aux = generateProduct();
        product.push(aux)
    }
    res.send({status: 'success', payload: product})
})
router.get('/allProduct', async(req, res)=>{
    let result = await object.getAll();
    res.render('pages/producto',{product:result.proload});
})
router.get("/:id", async(req, res)=>{
    let result = await object.getProduct(req.params.id);
    res.send(result)
})
router.post("/", uploader.single('image'), async(req, res)=>{
    //? Recibe y agrega un producto, y lo devuelve con su id asignada
    let image = req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename ;
    const product = req.body;
    product.image = image;
    let result = await object.save(product); 
    res.send(result);
})
router.put("/modifyProduct/:idProduct", async (req, res)=>{
    let newData = req.body;
    let id = req.params.idProduct;
    let result = await object.updateProduct(newData, id)
    res.send({status: "success", payload: result})
})
router.put("/:id",uploader.single('images') , async (req, res)=>{})
router.delete("/:id",async(req, res)=>{
    let result = await object.deleteProduct(req.params.id);
    res.send({status: "success", payload: result})
})

export default router;

