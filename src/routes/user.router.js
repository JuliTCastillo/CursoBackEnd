import { Router } from "express";
import {objectUSer} from '../dao/index.js';
import { createHash } from "../utils.js";
import { validatePassword } from "../utils.js";
import jwt from 'jsonwebtoken';

const router = Router(); //inicializamos el route
const obj = new objectUSer();

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
        name:` ${result.firstName} ${result.lastName}`,
        avatar: result.avatar,
      };
      const token = jwt.sign(tokenizedUser, 'config.jwt.SECRET', { expiresIn: "1d" });

    res.send({status:'success', proload: 'Usuario conectado', payload: result, token : token})
})

export default router;