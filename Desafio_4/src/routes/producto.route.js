//importamos todo el modulo | utilizando la llaves
import { Router } from "express";
import { uploader } from "../utils.js"
import Contenedor from "../managers/contenedor.js";
const router = Router(); //inicializamos el route
const object = new Contenedor ();

router.get("/", async (req, res)=>{
    //? Devuelve todos los productos
    let consulta = await object.getAll(); //convertimos a array 
    res.send(consulta);
    console.log(consulta.length) //Devolvemos el array producto
})
router.get("/:id", async(req, res)=>{
    //? Devuelve un producto segun su id
    let parametro = req.params;
    let consulta = await object.getById(parametro.id);
    res.send(consulta);
})
router.post("/", uploader.single('images') ,(req, res)=>{
    //? Recibe y agrega un producto, y lo devuelve con su id asignada
    console.log(req.file);
    const image = req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename;
    console.log(image)
    const product = req.body;
    product.images = image;
    //Se lo mandamos a nuestra class Contendor
    object.save(product);
    res.send({status: "success", payload: product})
})
router.put("/:id", (req, res)=>{
    //? Recibe y actualiza un producto segun su id
    let clave = req.body.clave;
    res.send(clave);
})
router.delete("/:id",(req, res)=>{
    //? Elimina un producto segun su id
    let id = req.body.clave;
    object.deleteById(id);
})

export default router;

