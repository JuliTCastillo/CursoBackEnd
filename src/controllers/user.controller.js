import {objectUSer} from '../dao/index.js';
import { createHash, validatePassword} from "../utils.js";
import jwt from 'jsonwebtoken';
import config from "../config/config.js";

const registerUser = async(req, res)=>{
    const {email, passwordUser} = req.body;
    //Consultamos los datos del usuario
    let result = await objectUSer.getUser(email);
    //Nos fijamos si existe un usuario con ese correo
    if(result) return res.status(400).send({status:'error', error:'El correo ya existe'})
    let newPassword = await createHash(passwordUser);
    req.body.passwordUser = newPassword;
    let consult = await objectUSer.save(req.body); 
    res.send({status:'success', proload: 'El usuario se registro'})
}

const login = async(req,res)=>{
    const {email, passwordUser} = req.body;
    let result = await objectUSer.getUser(email);
    if(!result) return res.status(400).send({status:'error', error:'El usuario no existe'})
    const validate = await validatePassword(result, passwordUser)
    if(!validate) return res.status(400).send({status:'error', error:'La contraseña no es correcta'})

    const tokenizedUser = {
        id: result._id,
        role: result.role,
        name: `${result.firstName} ${result.lastName}`,
        email: result.email,
        avatar: result.avatar,
        idCart : ''
    };

    const token = jwt.sign(tokenizedUser, config.JWT.secret, {expiresIn: "1d" });
    res.cookie(config.COOKIE.user, token);
    res.send({status:'success', proload: 'Usuario conectado', payload: tokenizedUser})
}
const updateData =  (req, res)=>{
    let data = req.params.data;
    //* CREAMOS UN NUEVO TOKEN CON LOS DATOS ACTUALIZADOS 
    const newToken = jwt.sign(data, config.JWT.secret, {expiresIn: "1d" });
    res.cookie(config.COOKIE.user, newToken, {overwrite: true});
}

const dataUser = (req, res)=>{
    const token = req.cookies[config.COOKIE.user]; //obtenemos el token del usuario
    const user = jwt.verify(token, config.JWT.secret); //decodificamos el token del usuario
    res.send({status: 'success', payload: user})
}

const logout = (req, res) =>{
    res.clearCookie(config.COOKIE.user).send({status:'success', message: 'Usuario desloguado'}); //! BORRAMOS LA COOKIE
}

export default {registerUser, updateData, login, logout, dataUser};