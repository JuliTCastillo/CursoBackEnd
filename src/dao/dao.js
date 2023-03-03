import mongoose from "mongoose";
import User from "./models/modelUser.js";
import Product from "./models/modelProduct.js";
import Cart from "./models/modelCart.js";
import config from '../config/config.js'

export default class Dao{
    constructor(){
        mongoose.set('strictQuery', false)
        this.connection = mongoose.connect(config.mongo.connect);
        const genericTime = {
            timestamps:{
                createdAt : "createad_at",
                updateAt : "update_at"
            }
        }
        const userSchema = mongoose.Schema(User.schema, genericTime);
        const ProductSchema = mongoose.Schema(Product.schema, genericTime);
        const cartSchema = mongoose.Schema(Cart.schema, genericTime);

        this.models = {
            [User.model] : mongoose.model(User.model, userSchema),
            [Product.model] : mongoose.model(Product.model, ProductSchema),
            [Cart.model] : mongoose.model(Cart.model, cartSchema),
        }
    }

    get = async(options, entity) =>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not defined in models`);
        let result = await this.models[entity].find(options);
        return result;
    }

    save = (options, entity) =>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not defined in models`);
        return this.models[entity].create(options);
    }

    update = (options, entity) =>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not defined in models`);
        return this.models[entity].updateOne(options[0],{$set:options[1]});
    }

    delete = (options, entity) =>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not defined in models`);
        return this.models[entity].deleteOne(options);
    }
}