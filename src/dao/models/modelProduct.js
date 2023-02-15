import mongoose from "mongoose";

const collection = 'Product'; // nombere 

const schema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description : String,
    image : String,
    code: {
        type: String,
        require: true,
        unique: true
    },
    price:{
        type: Number,
        require: true
    },
    stock:{
        type: Number,
        require: true
    }
})

const productModel = mongoose.model(collection, schema);

export default productModel;