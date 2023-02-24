//importamos todo el modulo | utilizando la llaves
import { Router } from "express";
import { addLogger, uploader } from "../utils.js"
import {objectProduct, objectChat, objectCart} from '../dao/index.js';
import { generateProduct } from "../utils/mocks.js";
import jwt from 'jsonwebtoken'
import config from "../config/config.js";

const router = Router(); //inicializamos el route
const object = objectProduct;

router.get('/home', (req, res)=>{
    const token = req.cookies['userConnect']; //obtenemos el token del usuario
    if(token !== undefined){
        const user = jwt.verify(token, config.JWT.secret);
        console.log(user)
        if(user.role === 'admin'){
            res.render('home');
        }
    }
    res.render('pages/problems', {problem: 'Esta pagina no es disponible :(', error: '404'});
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
router.put("/modifyProduct/:idProduct",uploader.single('image'), async (req, res)=>{
    let newData = req.body;
    let data ={};

    if(req.file !== undefined){
        data = {...newData, image : req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename}
    }
    else data = {...newData};
    let id = req.params.idProduct;
    let result = await object.updateProduct(data, id)
    res.send({status: "success", payload: result})
})
router.put("/:id",uploader.single('images') , async (req, res)=>{})
router.delete("/:id",async(req, res)=>{
    let result = await object.deleteProduct(req.params.id);
    res.send({status: "success", payload: result})
})

export default router;

