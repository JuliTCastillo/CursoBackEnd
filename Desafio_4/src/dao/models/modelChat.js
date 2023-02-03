import mongoose from "mongoose";

const collection = 'chat'; // nombere 

const schema = new mongoose.Schema({
    autor : {
        id: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        avatar:{
            type: String
        }
    },
    text: {
        message:{
            type:String,
            require: true,
        }
    }
})

const chatModel = mongoose.model(collection, schema);

export default chatModel;