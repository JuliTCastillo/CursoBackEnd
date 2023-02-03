import admin from 'firebase-admin';
// import claveJson from '../ClaveEcommerceLibrary.json' assert {type: 'json'};

class ProductDAOFirebase {
    constructor(){
        this.config = admin.initializeApp({
            credential : admin.credential.cert(claveJson)
        })
        this.db = this.config.firestore();
        this.product = this.db.collection('product');
    }
    save = async(object) =>{
        try{
            let result = await this.getProduct(object.code);
            if(result.length === 0){
                console.log('la clase no existe')
                let doc = this.product.doc();
                let result = await doc.create(object);
                return {status: 'success', proload: result};
            }
            else{
                return {status: 'error code', proload: -1}
            }
        }
        catch(error){
            console.log('hubo un error: '+error);
        }
    }
    getProduct = async(code) => {
        try{
            console.log(code)
            const snapshot = await this.product.get();
            const docs = snapshot.docs;
            let result = [];
            docs.map(doc => {
                if(doc.data().code === code){
                    result = {
                        id: doc.id,
                        name: doc.data().name,
                        code: doc.data().code
                    }
                }
            })
            return result;
        }
        catch(error){
            console.log('hubo un error: '+error);
        }
    }
    getAll = async() =>{
        try{
            const snapshot = await this.product.get();
            const docs = snapshot.docs;
            let result = docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                code: doc.data().code
            }))
            console.log(result)
        }
        catch(error){
            console.log('hubo un error: '+error);
        }
    }
    deleteProduct = async(code) =>{
        const snapshot = await this.product.get();
        const docs = snapshot.docs;
        docs.map(async doc => {
            if(doc.data().code === code){
                await this.product.doc(doc.id).delete()
            }
        })
    }
}

export default ProductDAOFirebase;