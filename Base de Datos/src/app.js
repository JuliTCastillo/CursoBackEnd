import express from 'express';
import database from './db/knex.js';

const app = express();
const server = app.listen(8080, ()=> console.log("listener 8080"));

const users = [
    {First_name: "Rodrigo", last_name: 'Ajnota', email: 'Correo@correo.com', age: 26, gender: 'male'},
    {First_name: "Matias Nicolas", last_name: 'Saldano', email: 'Correo@correo.com', age: 22, gender: 'male'},
    {First_name: "Ayelen", last_name: 'Aguilar', email: 'Correo@correo.com', age: 36, gender: 'female'},
    {First_name: "Julieta", last_name: 'Castillo', email: 'Correo@correo.com', age: 24, gender: 'female'}
]   

app.get('/', async(req, res)=>{
    let result = await database('users').select('First_name', 'email').where('gender', 'female');
    console.log(result)
    res.send({result})
})
app.get('/users', async(req, res)=>{
    let result = await database('users').insert(users);
    res.send({result})
})
app.get('/updateUser', async(req, res)=>{
    const updateAge = {age: 30}
    let result = await database('users').insert(users);
    res.send({result})
})