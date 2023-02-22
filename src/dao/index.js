import ProductDAOMongo from './mongodb/productMongo.js';
import CartDAOMongo from './mongodb/cartMongo.js';
import ChatDAOMongo from './mongodb/chatMongo.js';
import CartDAOFirebase from './fireBase/cartFireBase.js';
import ProductDAOFirebase from './fireBase/productFireBase.js'
import CartFileSystem from './fileSystem/CartFileSystem.js';
import ProductFileSystem from './fileSystem/ProductFileSystem.js';
import UserDAOMongo from './mongodb/userMongo.js';
import config from '../config/config.js';

const bdd = 'Mongo'
let objectProduct;
let objectCart;
let objectChat;
let objectUSer;

switch( bdd){
    case 'Mongo':
        objectProduct = new ProductDAOMongo(config.mongo.connect);
        objectCart = new CartDAOMongo(config.mongo.connect);
        objectChat = new ChatDAOMongo(config.mongo.connect);
        objectUSer = new UserDAOMongo(config.mongo.connect);
    break;
    case 'Firebase':
        objectProduct = ProductDAOFirebase;
        objectCart = CartDAOFirebase;
        objectChat = new ChatDAOMongo(config.mongo.connect);
        objectUSer = new UserDAOMongo(config.mongo.connect);
    break;
    case 'FileSystem':
        objectProduct = ProductFileSystem;
        objectCart = CartFileSystem;
        objectChat = new ChatDAOMongo(config.mongo.connect);
        objectUSer = new UserDAOMongo(config.mongo.connect);
    break;
}

export {objectCart, objectProduct, objectChat, objectUSer};