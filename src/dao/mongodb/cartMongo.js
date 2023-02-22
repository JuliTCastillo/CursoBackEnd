import mongoose from "mongoose";
import cartModel from "../models/modelCart.js";

class CartDAOMongo{
    constructor(connect){
        this.connect(connect);
    }
    connect = (connect) =>{
        const connection = mongoose.connect(connect)
    }
    save = async() =>{
        let insert = await cartModel.create({});
        let id = (insert._id).toString()
        return {status:'success', proload: id}
    }
    getAll = async(idCart) =>{
        let find = await cartModel.find({_id:idCart})
        return {status: "success", proload:find}
    }
    getProduct = async(idCart) =>{
        let find = await cartModel.find({_id:idCart});
        let list = []
        find.forEach(element => {
            list.push(element.product);
        });
        find = await cartModel.find({_id:idCart});
        return find[0].product;
    }
    addProduct = async(id, info) =>{
        let result = await cartModel.updateOne({_id:id},{$set:{product:info.product, count:info.count}});
        return {status: 'success', menssage: 'ok'}
    }
    deleteProduct = async(id, code) =>{
        let arrayProduct = await this.getProduct(id);
        let result = []
        console.log(arrayProduct)
        arrayProduct.map(item =>{
            console.log(item.code + ' ' + code)
            if(item.code !== code){ result.push(item)};
        })
        console.log(result)
        await cartModel.updateOne({_id:id},{$set:{product:result, count: result.length}})
    }
    deleteCart = async(id) =>{
        let result = await cartModel.deleteOne({_id: id});
        console.log(result)
    }
}

export default CartDAOMongo;