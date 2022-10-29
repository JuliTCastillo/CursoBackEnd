import express from 'express';
import fs from 'fs';
import Contenedor from './desafio2.js';

const app = express();
const product = new Contenedor();

const server = app.listen(8080, () => console.log('Holaaa'));

app.get('/', (req, res)=>{
    res.send('ahora si?');
})

app.get('/productos', async(req, res)=>{
    let producto = await  product.getAll(); //convertimos a array 
    res.send(producto);
    console.log(producto.length)
})

app.get('/productoRandom', async(req, res)=>{
    let producto = await  product.getAll();
    let random = Math.floor(Math.random() * producto.length);
    let productRandom = await product.getById(random);
    res.send(productRandom);
    console.log(`producto ${producto.length} numero ${random} producto ${productRandom}`)
})