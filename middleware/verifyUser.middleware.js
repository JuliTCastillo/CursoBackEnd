import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../src/dao/models/modelUser.js';

dotenv.config('../../.env')

export const verifyUser = async(req, res, next) =>{
    const token = req.cookies['userConnect'];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    console.log(user)
    next()
}