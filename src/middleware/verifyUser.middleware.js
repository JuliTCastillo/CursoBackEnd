import jwt from 'jsonwebtoken';
import PersistenceFactory from '../dao/factory.js';
import config from '../config/config.js';

const factory = await PersistenceFactory.getPersistence();
const userService = factory.user;


export const verifyUser = async(req, res, next) =>{
    const token = req.cookies[config.COOKIE.user];
    if(token !== undefined){
        const user = jwt.verify(token, config.JWT.secret);
        let result = await userService.getById(user.id);

        if(result !== null) return res.send({status: 'success', payload: user})
        else return res.send({status: '401', ruta: 'No se encontro ningun usuario'});
    }
    else{
        return res.send({status: '400', ruta: '/error/400'})
    }
}