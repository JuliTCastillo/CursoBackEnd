import mongoose from "mongoose";
import User from "./models/modelUser.js";
import Product from "./models/modelProduct.js";
import Cart from "./models/modelCart.js";
import config from '../config/config.js'

export default class Dao{
    constructor(){
        this.connection = mongoose.connect()
    }
}