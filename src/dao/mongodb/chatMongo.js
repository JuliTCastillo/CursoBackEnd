import mongoose, { Schema } from "mongoose";
import cartModel from "../models/modelChat.js";
import {normalize, schema } from "normalizr";

class ChatDAOMongo{
    constructor(){
        this.connect();
    }
    connect = () =>{
        const connection = mongoose.connect('mongodb+srv://ecommerceLibrery:123Library@ecommercelibrary.aqiseu9.mongodb.net/product?retryWrites=true&w=majority')
    }
    save = async(object) =>{
        let result = await cartModel.create(object);
    }
    getAll = async() =>{
        let find = await cartModel.find({},{_id:0, __v:0})
        return find
    }
    getAllNormalize = async() =>{
        let find = await cartModel.find({},{_id:0, __v:0})
        const author = new schema.Entity('autor');
        const mensajes = new schema.Entity('text',{
            user:author
        },
        {
            idAttribute : 'id'
        }
        );
        const mensajesEntity = new schema.Entity('chat',{
            mensajes:[mensajes]
        })

        const normalizedData = normalize(find, mensajesEntity)
        return normalizedData;
    }
}

export default ChatDAOMongo;