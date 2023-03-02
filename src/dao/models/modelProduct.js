export default class Product {
    static get model(){
        return 'Products'
    }
    static get schema(){
        return{
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
        }
    }
}