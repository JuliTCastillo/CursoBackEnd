import database from '../db/knex.js';

class Contenedor {
    constructor(table){
        this.table = table;
    }
    validateCode = async(col, data) =>{
        let result = await database(this.table).select('*').where(`${col}`, data);
        return result;
    }
    save = async(object) =>{
        let data = await this.validateCode('code', object.code);
        if(data.length === 0){
            let result = await database(this.table).insert(object);
            return {status: 'success', proload: result};
        }
        else{
            return {status: 'error code', proload: -1}
        }
    }
    saveMessage = async(object) =>{
        let result = await database(this.table).insert(object);
        return {status: 'success', proload: result};
    }
    getAll = async() =>{
        try{
            let result = await database(this.table).select('*');
            return {status: 'success', proload: result};
        }
        catch(erro){
            console.log('error en el select')
        }
    }
    getProduct = async(code) =>{
        try{
            let result = await database(this.table).select('*').where('code', code);
            return {status: 'success', proload: result};
        }
        catch(erro){
            console.log('error en el select id')
        }
    }
    deleteProduct = async(code) =>{
        try{
            let result = await database(this.table).where('code', code).del();
            return {status: 'success', proload: result};
        }
        catch(erro){
            console.log('error en el delete')
        }
    }

}

export default Contenedor;