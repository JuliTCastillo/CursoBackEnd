export default class User{
    static get model(){
        return 'user'
    }
    static get schema(){
        return{
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
        }
    }
}