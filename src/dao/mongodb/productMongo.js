import mongoose from "mongoose";
import productModel from "../models/modelProduct.js";
import { addLogger } from "../../utils.js";

class ProductDAOMongo{
    constructor(){
        this.connect();
    }
    connect = () =>{
        const connection = mongoose.connect('mongodb+srv://ecommerceLibrery:123Library@ecommercelibrary.aqiseu9.mongodb.net/product?retryWrites=true&w=majority')
    }
    save = async(object)=>{
        object.code = (object.code).toUpperCase()
        let array = await this.getProduct(object.code);
        
        if(array.proload.length === 0){
            let insert = await productModel.create(object);
            return {status: 'success', proload: insert};
        }
        else{
            return {status: 'error code', proload: -1}
        }
    }
    getAll = async() =>{
        let select = await productModel.find();
        return {status: 'success', proload: select};
    }
    getProduct = async(code) =>{
        let select = await productModel.find({code: code});
        return {status: "Success", proload: select};
    }
    deleteProduct = async(code) =>{
        let result = await productModel.deleteOne({code: code});
        return {status: 'success', proload: result};
    }
    updateStock = async(data) =>{
        data.forEach(async (element) => {
            let result = await productModel.updateOne({_id: element.id}, {$set: {stock: (element.stock - element.count)}});
        });
        return {status: 'success', proload: 'ok'};
    }
    updateProduct = async(data) =>{
        console.log(data.image);
        if(Object.keys(data.image).length === 0){
            let result = await productModel.updateOne({_id: element.id}, {$set: {stock: (element.stock - element.count)}});
        }
        return {status: 'success', proload: 'ok'};
    }
}

export default ProductDAOMongo;