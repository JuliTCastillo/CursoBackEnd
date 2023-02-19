import mongoose from "mongoose";
import userModel from "../models/modelUser.js";

class UserDAOMongo{
    constructor(){
        this.connect();
    }
    connect = () =>{
        const connection = mongoose.connect('mongodb+srv://ecommerceLibrery:123Library@ecommercelibrary.aqiseu9.mongodb.net/product?retryWrites=true&w=majority')
    }
    save = async(object) =>{
        console.log(object)
        let insert = await userModel.create(object);
        console.log(insert)
        return {status:'success', proload: insert}
    }
    getUser= async(email) =>{
        let find = await userModel.findOne({email});
        return find;
    }
}

export default UserDAOMongo;