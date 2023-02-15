import ProductDAOMongo from './mongodb/productMongo.js';
import CartDAOMongo from './mongodb/cartMongo.js';
import ChatDAOMongo from './mongodb/chatMongo.js';
import CartDAOFirebase from './fireBase/cartFireBase.js';
import ProductDAOFirebase from './fireBase/productFireBase.js'
import CartFileSystem from './fileSystem/CartFileSystem.js';
import ProductFileSystem from './fileSystem/ProductFileSystem.js';

const bdd = 'FileSystem'
let objectProduct;
let objectCart;
let objectChat;

switch( bdd){
    case 'Mongo':
        objectProduct = ProductDAOMongo;
        objectCart = CartDAOMongo;
        objectChat = ChatDAOMongo
    break;
    case 'Firebase':
        objectProduct = ProductDAOFirebase;
        objectCart = CartDAOFirebase;
        objectChat = ChatDAOMongo
    break;
    case 'FileSystem':
        objectProduct = ProductFileSystem;
        objectCart = CartFileSystem;
        objectChat = ChatDAOMongo
    break;
}

export {objectCart, objectProduct, objectChat};