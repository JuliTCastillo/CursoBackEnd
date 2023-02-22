import mongoose from "mongoose";

const collection = 'cart'; // nombere 

const schema = new mongoose.Schema({
    product: {
        type: Array,
        require: true
    },
    count: {
        type: Number,
        default: 0
    }
})

const cartModel = mongoose.model(collection, schema);

export default cartModel;