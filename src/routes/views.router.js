import {Router} from 'express';
import viewsController from '../controllers/views.controller.js';
import config from '../config/config.js';
import jwt from 'jsonwebtoken'; 

const router = Router();

router.get('/tienda', viewsController.tienda);

router.get("/admin", viewsController.admin);

router.get('/user', async(req, res)=>{
    const token = req.cookies[config.COOKIE.user];
    const user = jwt.verify(token, config.JWT.secret);
    console.log(user)
    res.render('pages/user',{user: user});
})

router.get('/user/register', (req, res)=>{
    res.render('pages/register');
})

router.get('/error/:error', async(req, res)=>{
    if(req.params.error==='400') res.render('pages/problems',{problem: 'Tiene que loguearte para realizar esta acción', error: '400'});
})

router.get('/tienda/product/:id', viewsController.getProduct);

export default router;