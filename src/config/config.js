import dotenv from 'dotenv';

dotenv.config();

export default {
    mongo : {
        connect : process.env.MONGO_CONNECT
    },
    JWT :{
        secret : process.env.JWT_SECRET
    }
}