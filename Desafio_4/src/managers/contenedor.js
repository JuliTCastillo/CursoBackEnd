//modulo de archivo
import fs from 'fs'; 
import __dirname from '../utils.js';

class Contenedor {
    constructor(){
    this.ruta = __dirname+"/producto/producto.json";
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
            console.log(objeto);
            contenido.push(JSON.parse(JSON.stringify(objeto))); //agregamos el objeto a la lista\
            await fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
        }
        else{
            contenido.forEach(element => {this.id = element.id});
            objeto.id  = this.id+=1;
            contenido.push(objeto); //agregamos el objeto a la lista
            console.log(contenido);
            fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
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
    getById= async (id)=>{
        try{
            //a traves de una id devolvemos una lista 
            let data = await fs.promises.readFile(this.ruta, 'utf-8'); //devuelve un string
            let contenido = JSON.parse(data); //convertimos a array 
            let producto;
            contenido.map((element, index)=>{
                if(element.id == id) producto = contenido[index];
            });
            return producto;
        }
        catch{
            return {status: "Error",message: error.message}
        }
        
    }
    getAll= async ()=>{
        try{
            //devuelve una array con todos los objeto
            let data = await fs.promises.readFile(this.ruta, 'utf-8'); //devuelve un string
            let contenido = JSON.parse(data); //convertimos a array 
            return contenido;
        }
        catch(error){
            return {status: "Error",message: error.message}
        }
    }
    deleteById= async (id)=>{
        //elimina del archivo la id mandada | no devuelve nada
        let data = await fs.promises.readFile(this.ruta, 'utf-8'); //devuelve un string
        let contenido = JSON.parse(data); //convertimos a array 
        contenido.map((element, index)=>{
            if(element.id == id) contenido.splice(index, 1);
        });
        await fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
    }
    deleteAll= async ()=>{
        //elimina todos los objetos presente en el archivo
        let data = await fs.promises.readFile(this.ruta, 'utf-8'); //devuelve un string
        let contenido = JSON.parse(data); //convertimos a array 
        contenido.map((element, index)=>{
            contenido.splice(index, 1);
        });
        await fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
    }
}

export default Contenedor;