import mongoose from "mongoose";

const collection = 'Students'; //Solo es un String

const schema = new mongoose.Schema({
    nombre:{
        type: String, //Tipo de dato a guardar
        required: true, //Obligamos que nuestro dato se obligatorio
    },
    apellido:{
        type: String,
        required: true,
    },
    edad:{
        type:Number,
        required: true,
    },
    dni:{
        type: String,
        required: true,
        unique:true, //No permite datos repetidos
    },
    curso:{
        type: String,
        required:true,
    },
    nota:{
        type: Number,
        required:true,
    }
}) //Solo es un objeto

//REECIEN ACA SE CONVIERTE EN UNA COLLECCION CON SCHEMA
const StudentsModel = mongoose.model(collection, schema);  

export default StudentsModel;