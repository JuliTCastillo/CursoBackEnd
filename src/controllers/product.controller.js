import jwt from 'jsonwebtoken'
import config from "../config/config.js";
// import PersistenceFactory from '../dao/factory.js';
import UserDTO from '../dao/dto/User.dto.js';
import nodemailer from 'nodemailer';
import { productService } from '../services/services.js';

// const factory = await PersistenceFactory.getPersistence();
// const productService = factory.product;
// const cartService = factory.cart;

const home =  (req, res)=>{
    const token = req.cookies[config.COOKIE.user]; //obtenemos el token del usuario
    if(token !== undefined){
        const user = jwt.verify(token, config.JWT.secret);
        console.log(user)
        if(user.role === 'admin'){
            res.render('home');
        }
    }
    res.render('pages/problems', {problem: 'Esta pagina no esta disponible :(', error: '404'});
}

const product = async(req, res)=>{
    let result = await productService.getAll();
    res.send(result);
}

const allProduct = async(req, res)=>{
    let result = await productService.getAll();
    res.render('pages/producto',{product:result.proload});
}

const getProduct = async(req, res)=>{
    //pasamos como parametro un objeto con el nombre de la propiedad que queremos y el valor que buscamos
    let result = (await productService.getAll({code: req.params.id}))[0];
    console.log(result)
    res.send(result)
}
const save = async(req, res)=>{
    let image = "";
    if(req.file !== undefined){
        //? Recibe y agrega un producto, y lo devuelve con su id asignada
        image = req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename;
    }
    const product = req.body;
    product.image = image;
    
    let result = await productService.save(product); 
    res.send(result);
}
const modifyProduct = async (req, res)=>{
    let newData = req.body;
    let data ={};

    if(req.file !== undefined){
        data = {...newData, image : req.protocol+"://"+req.hostname+":8080/imagen/"+req.file.filename}
    }
    else data = {...newData};
    let id = req.params.idProduct;
    let result = await productService.updateProduct(data, id)
    res.send({status: "success", payload: result})
}

const deleteProduct = async(req, res)=>{
    let result = await productService.deleteProduct(req.params.id);
    res.send({status: "success", payload: result})
}

const buyProduct = async(req, res) =>{
    const transport = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: config.CORREO.user,
            pass: config.CORREO.password
        }
    })
    const cart = (await cartService.getAll(req.body.idCart))[0];
    let message = '';
    let precioTotal = 0;
    cart.forEach(element => {
        message += 
        `
            <p>Numero de compra: ${element.id}<p>
            <div>
                <h3>${element.name}</h3>
                <div style='display: flex;'>
                    <img src="${element.image}" alt='${element.name}' width="100">
                    <div>
                        <p>${element.description}</p>
                        <div style='display: flex;'>
                            <p>Precio: $${element.price}</p>
                            <p>Cantidad: ${element.count}</p>
                            <p>Precio Total del Producto: $${(element.price * element.count)}</p>
                        </div>
                    </div>
                </div>   
            </div>
            <hr style="width: 300px; margin: 0px;">
        `    
        precioTotal += (element.price * element.count)
    });
    message += `<h3>Precio Total: $${precioTotal}</h3>`
    await transport.sendMail({
        from: 'yo',
        to: `${req.body.email}`,
        subject: 'Libreria Juli :)',
        html: `<div>${message}</div>`
    })

    await productService.updateStock(cart);
    const token = req.cookies[config.COOKIE.user]; //obtenemos el token del usuario
    const user = jwt.verify(token, config.JWT.secret); //decodificamos el token del usuario
    console.log(user)
    const tokenizedUser = UserDTO.putDbDTO(user, '') //modificamos el token del user
    console.log('tokenizedUser ', tokenizedUser)
    res.clearCookie(config.COOKIE.user); //! BORRAMOS LA COOKIE
    //* CREAMOS UN NUEVO TOKEN CON LOS DATOS COA
    const newToken = jwt.sign(tokenizedUser, config.JWT.secret, {expiresIn: "1d" });
    res.cookie(config.COOKIE.user, newToken);

    res.send({status: "success", payload: 'ok'})
}

export default {home, product, allProduct, getProduct, save, modifyProduct, deleteProduct, buyProduct}