import {Router} from 'express';
import {objectProduct, objectChat} from '../dao/index.js';

const router = Router();
const object = new objectProduct();

router.get('/tienda', async(req, res)=>{
    let result = await object.getAll();
    res.render('pages/products',{product:result.proload});
})

router.get('/tienda/product/:id', async(req, res)=>{
    let id = req.params.id;
    let result = await object.getProduct(id);
    res.render('pages/product',{product:result.proload});
})


export default router;