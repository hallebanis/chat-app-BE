import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const genToken = async (userId, res) => {
    console.log(process.env.SECRET);
    const token = jwt.sign({ userId }, process.env.SECRET, {
        expiresIn: '15d'
    })
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export  {genToken}