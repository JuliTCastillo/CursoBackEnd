import {Router} from 'express';
import {objectProduct} from '../dao/index.js';
import config from '../config/config.js';
import jwt from 'jsonwebtoken'; 

const router = Router();

router.get('/tienda', async(req, res)=>{
    let result = await objectProduct.getAll();
    res.render('pages/products',{product:result.proload});
})
router.get('/user', async(req, res)=>{
    const token = req.cookies[config.COOKIE.user];
    const user = jwt.verify(token, config.JWT.secret);
    console.log(user)
    res.render('pages/user',{user: user});
})
router.get('/error/:error', async(req, res)=>{
    if(req.params.error==='400') res.render('pages/problems',{problem: 'Tiene que loguearte para realizar esta acción', error: '400'});
})

router.get('/tienda/product/:id', async(req, res)=>{
    let id = req.params.id;
    let result = await objectProduct.getProduct(id);
    res.render('pages/product',{product: result.proload});
})

router.get('/user/register', (req, res)=>{
    res.render('pages/register');
})

export default router;