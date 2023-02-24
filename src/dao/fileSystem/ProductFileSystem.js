//modulo de archivo
import fs from 'fs'; 
import { type } from 'os';
import __dirname from '../../utils.js';

class ProductFileSystem {
    constructor(){
    this.ruta = __dirname+"/dao/fileSystem/archive/producto.json";
        this.id = 0;
        this.createFile();
    }
    createFile=()=>{
        if(!fs.existsSync(this.ruta)){
            fs.writeFileSync(this.ruta, "[]");
        }
    }
    save = async (objeto)=>{
        let data = await fs.promises.readFile(this.ruta, 'utf-8'); //devuelve un string
        let contenido = JSON.parse(data); //convertimos a array 
        if(contenido.length == 0){ //si es 0, el archivo se acaba de crear
            objeto.id  = 1; //colocamos la id
            contenido.push(JSON.parse(JSON.stringify(objeto))); //agregamos el objeto a la lista\
            await fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
        }
        else{
            let result = await this.getProduct(objeto.code);
            if(result.proload.length === 0){
                contenido.forEach(element => {this.id = element.id});
                objeto.id  = this.id+=1;
                contenido.push(objeto); //agregamos el objeto a la lista
                fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
                return {status: 'success', proload: contenido};
            }
            else{
                return {status: 'error code', proload: -1}
            }
        }
    }
    putById = async (id, object) =>{
        try{
            let data = await fs.promises.readFile(this.ruta, 'utf-8'); //devuelve un string
            let contenido = JSON.parse(data); //convertimos a array 
            const {name, price, images} = object;
            contenido.map((element)=>{
                if(element.id == id){
                    element.name = name;
                    element.price = price;
                    element.images = images;
                };
            });
            await fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
            return contenido;
        }
        catch(error){
            return {status: "Error",message: error.message}
        }
    }
    getProduct= async (code)=>{
        try{
            //a traves de una id devolvemos una lista 
            let data = await fs.promises.readFile(this.ruta, 'utf-8'); //devuelve un string
            let contenido = JSON.parse(data); //convertimos a array 
            let producto=[];
            contenido.map((element, index)=>{
                if(element.code == code) producto.push(element);
            });
            return {status: "Success", proload: producto};
        }
        catch(error){
            return {status: "Error",message: error.message}
        }
        
    }
    getAll= async ()=>{
        try{
            //devuelve una array con todos los objeto
            let data = await fs.promises.readFile(this.ruta, 'utf-8'); //devuelve un string
            let contenido = JSON.parse(data); //convertimos a array 
            return {status: 'success', proload: contenido};
        }
        catch(error){
            return {status: "Error",message: error.message}
        }
    }
    deleteProduct= async (id)=>{
        //elimina del archivo la id mandada | no devuelve nada
        let data = await fs.promises.readFile(this.ruta, 'utf-8'); //devuelve un string
        let contenido = JSON.parse(data); //convertimos a array 
        contenido.map((element, index)=>{
            if(element.code == id) contenido.splice(index, 1);
        });
        await fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
    }
    deleteAll= async ()=>{
        //elimina todos los objetos presente en el archivo
        let data = await fs.promises.readFile(this.ruta, 'utf-8'); //devuelve un string
        let contenido = JSON.parse(data); //convertimos a array 
        contenido.map((element, index)=>{
  
        });
        await fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
    }
}

export default ProductFileSystem;