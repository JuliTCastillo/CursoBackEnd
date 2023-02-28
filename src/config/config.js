import dotenv from 'dotenv';
import { Cookie } from 'express-session';

dotenv.config();

export default {
    mongo : {
        connect : process.env.MONGO_CONNECT
    },
    JWT :{
        secret : process.env.JWT_SECRET
    },
    COOKIE:{
        user: process.env.COOKIE_USER
    }
}