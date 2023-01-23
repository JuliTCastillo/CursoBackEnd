import e, { json } from 'express';
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
    addProduct = async() => {
        
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
const obj = new CartDAOFirebase();
// await obj.save([
//     {name: 'Regla',price: 232, code: 'COD-04'},
//     {name: 'Lapiz',price: 232, code: 'COD-04'},
//     {name: 'Borrador',price: 232, code: 'COD-04'}
// ])
//await obj.deleteCart('ZA3MaVRdWpm5wH8ZhYqt')
//await obj.getAll()
