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
    let image;
    !(req.file == null ) ? image = req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename : image = "";
    const product = req.body;
    product.images = image;
    //Se lo mandamos a nuestra class Contendor
    object.save(product);
    res.send({status: "success", payload: product})
})
router.put("/:id",uploader.single('images') , async (req, res)=>{
    //? Recibe y actualiza un producto segun su id
    let image;
    !(req.file == null ) ? image = req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename : image = "";
    const product = req.body;
    product.images = image;
    console.log(product)
    
    //let parametro = req.params;
    let consulta = await object.putById(2, product)
    console.log(consulta)
    res.send(product);
    //? deberiamos obtener la clave, luego buscar nuestro producto con el metodo getById pasarle los datos que teniamos y luego reemplazarlo, en el array y reescribir el archivo con el producto actualizado
})
router.delete("/:id",(req, res)=>{
    //? Elimina un producto segun su id
    let parametro = req.params;
    object.deleteById(parametro);
})

export default router;

