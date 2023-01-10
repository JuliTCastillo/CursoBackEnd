//importamos todo el modulo | utilizando la llaves
import { Router } from "express";
import { uploader } from "../utils.js"
import Contenedor from "../managers/contenedor.js";

const router = Router(); //inicializamos el route
const object = new Contenedor ();

router.get('/home', (req, res)=>{
    res.render('home', {nombre: 'juli'});
})

router.get('/product', async(req, res)=>{
    let consulta = await object.getAll(); //convertimos a array 
    console.log(consulta.length) //Devolvemos el array producto
    res.render('pages/producto',{product:consulta});
})

router.get('/allProduct', async(req, res)=>{
    let consulta = await object.getAll(); //convertimos a array 
    console.log(consulta.length) //Devolvemos el array producto
    res.send(consulta)
    res.render('pages/allProduct',{product:consulta});
})
 
// router.get("/", async (req, res)=>{
//     //? Devuelve todos los productos
//     let consulta = await object.getAll(); //convertimos a array 
//     res.send(consulta);
//     console.log(consulta.length) //Devolvemos el array producto
// })
router.get("/:id", async(req, res)=>{
    //? Devuelve un producto segun su id
    let parametro = req.params;
    let consulta = await object.getById(parametro.id);
    res.send(consulta.proload);
})
router.post("/", uploader.single('images') ,(req, res)=>{
    //? Recibe y agrega un producto, y lo devuelve con su id asignada
    let image;
    image = req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename ;
    const product = req.body;
    product.images = image;
    //!socket.emit('addProduct', product);
    ///console.log(product);
    res.send(product)
    //Se lo mandamos a nuestra class Contendor
    let array = object.save(product);
    res.send({status: "success", payload: array})
})
router.put("/:id",uploader.single('images') , async (req, res)=>{
    //? Recibe y actualiza un producto segun su id
    let image;
    //!(req.file == null ) ? image = req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename : image = "";
    const product = req.body;
    product.images = image;
    
    let parametro = req.params.id;
    let consulta = await object.putById(parametro, product)
    res.send(product);
    //? deberiamos obtener la clave, luego buscar nuestro producto con el metodo getById pasarle los datos que teniamos y luego reemplazarlo, en el array y reescribir el archivo con el producto actualizado
})
router.delete("/:id",(req, res)=>{
    //? Elimina un producto segun su id
    let parametro = req.params.id;
    object.deleteById(parametro);
})

export default router;

