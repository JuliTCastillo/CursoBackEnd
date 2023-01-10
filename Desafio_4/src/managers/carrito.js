// modulos de archivo
import fs from 'fs';
import { exit } from 'process';
import __dirname from '../utils.js';

class Carrito {
    constructor(){
        this.ruta = __dirname+'/producto/compra.json';
        this.id = 0;
        this.createFile();
    }

    createFile = () =>{
        //Si el archivo exite se crea un json con un arreglo
        if(!fs.existsSync(this.ruta)) fs.writeFileSync(this.ruta, "[]");
    }
    //TODO: GUARDA Y CREA EL CARRITO DEL USUARIO CON SUS PRODUCTOS
    save = async() => {
        //leemos los datos que guardamos en el json compra
        let data = await fs.promises.readFile(this.ruta, 'utf-8');
        let contenido = JSON.parse(data); //Convertimos el json en un arreglo
        if(contenido.length == 0){ //en el caso de que contenido no tenga nada
            //agregamos el carrito con una id 0, el nombre del usuario y la lista de producto
            contenido.push({id: this.id, product:[]});
        }
        else{ 
            contenido.forEach(element => {this.id = element.id});
            this.id += 1;
            contenido.push({id: this.id, product:[]});
        }
        await fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
        return {status:'success', proload: this.id}
    }
    //TODO: AGREGAMOS PRODUCTO AL CARRITO
    addProduct = async(idUser, product) =>{
        //convertimos a objeto | product paso como String
        product = JSON.parse(product); 
        //leemos los datos que guardamos en el json compra
        let data = await fs.promises.readFile(this.ruta, 'utf-8');
        let contenido = JSON.parse(data); //Convertimos el json en un arreglo
        contenido.forEach((element) => {
            if(element.id === parseInt(idUser)){
                element.product.push(product)
            }
        })
        await fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
        return {status: 'success', menssage: 'ok'}
    }
    //TODO: MOSTRAMOS LOS PRODUCTO QUE TIENE EL USUARIO
    getAll = async(idUser) => {
        //leemos los datos que guardamos en el json compra
        let data = await fs.promises.readFile(this.ruta, 'utf-8');
        let contenido = JSON.parse(data); //Convertimos el json en un arreglo
        let listProducts = [];
        contenido.forEach((element) => {
            if(element.id === parseInt(idUser)){
                listProducts = element.product;
            }
        })
        //listProducts = JSON.stringify(listProducts)
        //console.log(`aaaa ${typeof(listProducts)} ${listProducts} `)
        return {status: "success", proload:listProducts}
    }

    //TODO: ELIMINA TODOS LOS PRODUCTOS Y EL CARRITO
    deleteCart = async(id) =>{
        //leemos los datos que guardamos en el json compra
        let data = await fs.promises.readFile(this.ruta, 'utf-8');
        let contenido = JSON.parse(data); //Convertimos el json en un arreglo
        let filtrados = contenido.filter(item => item.id !== parseInt(id));
        console.log(filtrados)
        await fs.promises.writeFile(this.ruta, JSON.stringify(filtrados, null, "\t"));
        return {status: 'success', menssage: 'ok'}
    }
    //TODO: ELIMINA EL PRODUCTO SELECCIONADO POR EL USUARIO
    deleteProduct = async(id, idProduct) =>{
        //leemos los datos que guardamos en el json compra
        let data = await fs.promises.readFile(this.ruta, 'utf-8');
        let contenido = JSON.parse(data); //Convertimos el json en un arreglo
        let filtrados;
        contenido.forEach((element) => {
            if(element.id === parseInt(id)){ //validamos la id del usuario
                filtrados = element.product.filter(item => item.id !== parseInt(idProduct));
                element.product = filtrados;
            }
        })
        await fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
        return {status: 'success', menssage: 'ok'}
    }
}

export default Carrito;