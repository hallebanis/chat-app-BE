import jwt from 'jsonwebtoken'
import { CustomError } from '../helpers/CustomError.js';
import dotenv from 'dotenv'
import User from '../models/userModel.js'

dotenv.config()

export const authMiddleware = 
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
async (req,res,next)=>{
    try {
        const token= req.cookies.jwt
        if(!token){
           throw new CustomError('Unthorized',401)
        }
        const decoded= jwt.verify(token,process.env.SECRET)
        if(!decoded){
            throw new CustomError('Invalid Token!',401)
        }
        const user = await User.findById(decoded.userId)
        if(!user){
            throw new CustomError('User not found',404)
        }
        req.userId= user._id
        next()
    } catch (error) {
        console.error(error);
        res.status(error.code || 500).json({error:error.message || 'Auth error!'})
    }
}