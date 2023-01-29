import ProductDAOMongo from './mongodb/productMongo.js';
import CartDAOMongo from './mongodb/cartMongo.js';
import CartDAOFirebase from './fireBase/cartFireBase.js';
import ProductDAOFirebase from './fireBase/productFireBase.js'
import CartFileSystem from './fileSystem/CartFileSystem.js';
import ProductFileSystem from './fileSystem/ProductFileSystem.js';

const bdd = 'FileSystem'
let objectProduct;
let objectCart;

switch( bdd){
    case 'Mongo':
        objectProduct = ProductDAOMongo;
        objectCart = CartDAOMongo;
    break;
    case 'Firebase':
        objectProduct = ProductDAOFirebase;
        objectCart = CartDAOFirebase;
    break;
    case 'FileSystem':
        objectProduct = ProductFileSystem;
        objectCart = CartFileSystem;
    break;
}

export {objectCart, objectProduct};