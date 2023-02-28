import config from "../config/config.js";

const persistence = config.APP.persistence;

export default class PersistenceFactory {
    static getPersistence = async () =>{
        switch(persistence){
            case "MONGO" : 
                const {default: UserDAO} = await import("./mongodb/userMongo.js")
                const {default: ProductDAO} = await import("./mongodb/productMongo.js")
                const {default: CartDAO} = await import("./mongodb/cartMongo.js")
                return {user: new UserDAO(), product: new ProductDAO(), cart: new CartDAO()}
            case "FILESYSTEM" :
                //const {default: UserDAOFile} = await import("./mongodb/userMongo.js")
                const {default: ProductDAOFile} = await import("./fileSystem/ProductFileSystem.js")
                const {default: CartDAOFile} = await import("./fileSystem/CartFileSystem.js")
                return {/*users: new UserDAOFile(), */product: new ProductDAOFile(), cart: new CartDAOFile()}
        }
    }
}