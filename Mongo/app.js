import mongoose from "mongoose";
import StudentsModel from "./models/Student.js";

const URL = "mongodb://127.0.0.1:27017/escuela"; //URL del puerto (falta colocar la base de datos)

const connection = mongoose.connect(URL, (error)=>{
    if(error) console.log('Hubo un error: '+ error);
    else console.log("conectado a monguito");
})
const StudentsToInsert = 
    [
        { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
        { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
        { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
        { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
        { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
        { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
        { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
        { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
        { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
        { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
    ]
    

const CRUD = async() =>{
    //Todas la consultas de la base de datos son promesas
    //let insertResult = StudentsModel.insertMany(StudentsToInsert);
    //console.log(insertResult)
    //const newStudent = {nombre: 'Camilla Yael', apellido: 'Villaverde', edad: 19, dni: '12345678', curso: '3A', nota: 10}
    //let insertResult = await  StudentsModel(newStudent);
    //console.log(insertResult);
    //FIND
    //let Students = await StudentsModel.find();
    //console.log(Students);
    //UPDATE
    //let result = await StudentsModel.updateOne({dni:'37923460'}, {$set: {nota: 5}});
   // let result = await StudentsModel.updateOne({dni:'37923460'}, {$set: {password: '123123'}});
    //console.log(result);
    //mongoose.connection.close();
    let  result = await StudentsModel.deleteOne({dni:'37923460'})
    console.log(result);
}

CRUD();