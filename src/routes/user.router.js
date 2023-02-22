import { Router } from "express";
import {objectUSer} from '../dao/index.js';
import { createHash } from "../utils.js";
import { validatePassword } from "../utils.js";
import jwt from 'jsonwebtoken';
import config from "../config/config.js";
import { verifyUser } from "../../middleware/verifyUser.middleware.js";

const router = Router(); //inicializamos el route
const obj = objectUSer;

router.post('/', async(req, res)=>{
    console.log(req.body)
    const {email, passwordUser} = req.body;
    //Consultamos los datos del usuario
    let result = await obj.getUser(email);
    //Nos fijamos si existe un usuario con ese correo
    if(result) return res.status(400).send({status:'error', error:'El correo ya existe'})
    let newPassword = await createHash(passwordUser);
    req.body.passwordUser = newPassword;
    let consult = await obj.save(req.body); 
    res.send({status:'success', proload: 'El usuario se registro'})
})

router.post('/login', async(req,res)=>{
    const {email, passwordUser} = req.body;
    let result = await obj.getUser(email);
    if(!result) return res.status(400).send({status:'error', error:'El usuario no existe'})
    const validate = await validatePassword(result, passwordUser)
    if(!validate) return res.status(400).send({status:'error', error:'La contraseña no es correcta'})

    const tokenizedUser = {
        id: result._id,
        role: result.role,
        name: `${result.firstName} ${result.lastName}`,
        avatar: result.avatar,
        idCart : ''
    };

    const token = jwt.sign(tokenizedUser, config.JWT.secret, {expiresIn: "1d" });
    res.cookie('userConnect', token);
    res.send({status:'success', proload: 'Usuario conectado', payload: result})
})
router.get('/updateData/:data', (req, res)=>{
    let data = req.params.data;
    //* CREAMOS UN NUEVO TOKEN CON LOS DATOS ACTUALIZADOS 
    const newToken = jwt.sign(data, config.JWT.secret, {expiresIn: "1d" });
    res.cookie('userConnect', newToken, {overwrite: true});
})

router.get('/data', (req, res)=>{
    const token = req.cookies['userConnect']; //obtenemos el token del usuario
    const user = jwt.verify(token, config.JWT.secret); //decodificamos el token del usuario
    console.log('data router ', user)
    res.send({status: 'success', payload: user})
})

router.get('/verifyUser', verifyUser);

// router.get('/:id', async(req, res)=>{
//     let idUser = req.params.id;
//     console.log(idUser);
//     let result = await obj.getById(idUser);
//     res.send({status: 'success', payload: result})
// })

export default router;