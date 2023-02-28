import mongoose from "mongoose";
import productModel from "../models/modelProduct.js";
import config from "../../config/config.js"

class ProductDAOMongo{
    constructor(){
        this.connect();
    }
    connect = () =>{
        const connection = mongoose.connect(config.mongo.connect)
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
    updateProduct = async(data, id) =>{
        let result;
        console.log(data)
        if(data.image === undefined){
            result = await productModel.updateOne({code: id}, {$set: {name: data.name, description: data.description, price: data.price, stock: data.stock}});
        }else{
            console.log('cai aca')
            result = await productModel.updateOne({code: id}, {$set: {name: data.name, description: data.description, price: data.price, stock: data.stock, image: data.image}});
        }
        return {status: 'success', proload: result};
    }
}

export default ProductDAOMongo;