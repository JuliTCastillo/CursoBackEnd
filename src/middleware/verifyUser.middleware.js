import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { userService } from '../services/services.js';


export const verifyUser = async(req, res, next) =>{
    const token = req.cookies[config.COOKIE.user];
    if(token !== undefined){
        const user = jwt.verify(token, config.JWT.secret);
        let result = await (userService.getAll({_id:user._id}))[0];
        if(result !== null) return res.send({status: 'success', payload: user})
        else return res.status(401).send({status:'error', ruta: 'No se encontro ningun usuario'});
    }
    else{
        return res.status(400).send({status:'error', ruta: '/error/400'})
    }
}