import jwt from 'jsonwebtoken';
import {objectUSer, objectProduct} from '../src/dao/index.js';
import config from '../src/config/config.js';


export const verifyUser = async(req, res, next) =>{
    const token = req.cookies['userConnect'];
    if(token !== undefined){
        const user = jwt.verify(token, config.JWT.secret);
        console.log('verify user ',user)
        let result = await objectUSer.getById(user.id);

        if(result !== null) return res.send({status: 'success', payload: user})
        else return res.send({status: '401', ruta: 'No se encontro ningun usuario'});
    }
    else{
        console.log('hola soy verifyuser ')
        return res.send({status: '400', ruta: '/error/400'})
    }
}