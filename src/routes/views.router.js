import {Router} from 'express';
import {objectProduct} from '../dao/index.js';
import { verifyUser } from '../../middleware/verifyUser.middleware.js';

const router = Router();
const object = objectProduct;

router.get('/tienda', async(req, res)=>{
    let result = await object.getAll();
    res.render('pages/products',{product:result.proload});
})
router.get('/error/:error', async(req, res)=>{
    if(req.params.error==='400') res.render('pages/problems',{problem: 'Tiene que loguearte para realizar esta acción'});
})

router.get('/tienda/product/:id', async(req, res)=>{
    let id = req.params.id;
    let result = await object.getProduct(id);
    res.render('pages/product',{product:result.proload});
})

router.get('/user/register', (req, res)=>{
    res.render('pages/register');
})

export default router;