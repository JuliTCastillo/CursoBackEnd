import admin from 'firebase-admin';
import claveJson from '../ClaveEcommerceLibrary.json' assert {type: 'json'};

class CartDAOFirebase {
    constructor(){
        this.config = admin.initializeApp({
            credential : admin.credential.cert(claveJson)
        })
        this.db = this.config.firestore();
        this.cart = this.db.collection('cart');
    }
    save = async(object) =>{
        let doc = this.cart.doc();
        let result = await doc.create({products : object});
        console.log(result)
    }
    addProduct = async(id, product) => {
        let arrayProduct = await this.getProduct(id);
        arrayProduct.push(product)
        const doc = this.cart.doc(id);
        let result = await doc.update({products: arrayProduct});
        console.log(result)
    }
    //TODO: obtiene el array de producto del carrito de la id
    getProduct = async(id)=>{
        console.log(id);
        const snapshot = await this.cart.get();
        const docs = snapshot.docs;
        let result;
        docs.map(doc => {
            if(doc.id === id){
                result = doc.data().products;
            }
        })
        return result;
    }
    getAll = async() =>{
        const snapshot = await this.cart.get();
        const docs = snapshot.docs;
        let result = docs.map(doc => ({
            id: doc.id,
            products: JSON.stringify(doc.data().products)
        }))
        console.log(result)
    }
    deleteProduct = async(id, code) => {
        let arrayProduct = await this.getProduct(id);
        let result=[];
        arrayProduct.map(prod => {
            if(prod.code !== code) {result.push(prod)}
        })
        const doc = this.cart.doc(id);
        let newProduct = await doc.update({products: arrayProduct});
        console.log(newProduct)
    }
    deleteCart = async(id) => {
        const snapshot = await this.cart.get();
        const docs = snapshot.docs;
        docs.map(async doc => {
            if(doc.id === id){
                await this.cart.doc(doc.id).delete()
            }
        })
    }
}

export default  CartDAOFirebase;