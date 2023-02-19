import mongoose from "mongoose";

const collection = 'User'; // nombre 

const schema = new mongoose.Schema({
    avatar:{
        type: String
    },
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        uniqued: true
    },
    role:{
        type: String,
        default: 'user'
    },
    passwordUser:{
        type: String,
        require: true
    },
})

const userModel = mongoose.model(collection, schema);

export default userModel;