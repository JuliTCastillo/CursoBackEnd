import {fileURLToPath} from 'url';
import { dirname } from 'path';
import multer from 'multer';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    //creamos un almacenamiento en nuestro servidor
    destination: function(req, file, cb){
        //el primer parametros es el error | 2do: destino
        cb(null, __dirname+"/public/imagen");
    },
    //Indicamos el nombre de nuestro archivo que guardamos
    filename: function(req, file, cb){
        //Le damos ese nombre al archivo para que no se sobreescriban
        cb(null, Date.now() + "-" + file.originalname)
    }
})

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10); //damos saltos (?)
    return bcrypt.hash(password, salts); //Ciframos el password
}

export const validatePassword = async(user, password)=>{
    return bcrypt.compare(password, user.passwordUser)
}
//inicializamos multer indicando en donde vamos almacenar todo
//Multer es un MIDDLERWARE | la exportamos para usarlo donde nosotros queramos
export const uploader = multer({storage});

export default __dirname;