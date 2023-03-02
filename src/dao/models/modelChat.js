export default class Chat{
    static get model(){
        return 'Chats'
    }
    static get schema(){
        return{
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
        }
    }
}