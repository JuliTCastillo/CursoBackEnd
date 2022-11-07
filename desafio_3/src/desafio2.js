//modulo de archivo
import fs from 'fs'; 

class Contenedor {
    constructor(){
        this.ruta = "src/productos/producto.json";
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
            objeto.id  = "COD"+1; //colocamos la id
            contenido.push(objeto); //agregamos el objeto a la lista
            await fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
        }
        else{
            contenido.forEach(element => {this.id = element.id});
            objeto.id  = this.id+=1;
            contenido.push(objeto);
            fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, "\t"));
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