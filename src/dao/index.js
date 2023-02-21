import ProductDAOMongo from './mongodb/productMongo.js';
import CartDAOMongo from './mongodb/cartMongo.js';
import ChatDAOMongo from './mongodb/chatMongo.js';
import CartDAOFirebase from './fireBase/cartFireBase.js';
import ProductDAOFirebase from './fireBase/productFireBase.js'
import CartFileSystem from './fileSystem/CartFileSystem.js';
import ProductFileSystem from './fileSystem/ProductFileSystem.js';
import UserDAOMongo from './mongodb/userMongo.js';
import dotenv from 'dotenv';
dotenv.config('../../.env');

const bdd = 'Mongo'
let objectProduct;
let objectCart;
let objectChat;
let objectUSer;

switch( bdd){
    case 'Mongo':
        const config = process.env.MONGO_CONNECT
        objectProduct = new ProductDAOMongo(config);
        objectCart = new CartDAOMongo(config);
        objectChat = new ChatDAOMongo(config);
        objectUSer = new UserDAOMongo(config);
    break;
    case 'Firebase':
        objectProduct = ProductDAOFirebase;
        objectCart = CartDAOFirebase;
        objectChat = new ChatDAOMongo(config);
        objectUSer = new UserDAOMongo(config);
    break;
    case 'FileSystem':
        objectProduct = ProductFileSystem;
        objectCart = CartFileSystem;
        objectChat = new ChatDAOMongo(config);
        objectUSer = new UserDAOMongo(config);
    break;
}

export {objectCart, objectProduct, objectChat, objectUSer};