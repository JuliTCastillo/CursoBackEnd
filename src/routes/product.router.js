//importamos todo el modulo | utilizando la llaves
import { Router } from "express";
import { uploader } from "../utils.js"
import {objectProduct, objectChat} from '../dao/index.js';
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
    console.log('hola');

    let product = [];
    for(let i=0; i < 5; i++){
        console.log(i)
        let aux = generateProduct();
        console.log(aux)
        product.push(aux)
    }
    res.send({status: 'success', payload: product})
})
router.get('/allProduct', async(req, res)=>{
    let result = await object.getAll();
    res.render('pages/producto',{product:result.proload});
})
router.get("/:id", async(req, res)=>{
    console.log('router get '+req.params.id);
    let result = await object.getProduct(req.params.id);
    res.send(result)
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
router.put("/:id",uploader.single('images') , async (req, res)=>{})
router.delete("/:id",async(req, res)=>{
    console.log(req.params.id);
    let result = await object.deleteProduct(req.params.id);
    console.log(result);
    res.send({status: "success", payload: result})
})

export default router;

