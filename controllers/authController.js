import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { genToken } from '../utils/genToken.js'

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const isPasswordCorrect = bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordCorrect) {
            const error = new Error('Invalid credentials!')
            error.code = 400
            throw error
        }
        await genToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.error(error);
        res.status(error.code || 500).json({ error: error.message })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        })
        res.status(200).send('logout')
    } catch (error) {
        console.error(error);
        res.status(error.code || 500).json({ error: error.message })
    }
}

export const signupUser = async (req, res) => {
    const { fullName, username, password, confirmPassword, gender } = req.body
    try {
        if (password !== confirmPassword) {
            const error = new Error('password do not match')
            error.code = 400
            throw error
        }
        const user = await User.findOne({ username })
        if (user) {
            const error = new Error('user exist')
            error.code = 401
            throw error
        }

        const profilePic = `https://avatar.iran.liara.run/public/${gender === 'male' ? 'boy' : 'girl'}?username=${username}`

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            username,
            password: hash,
            gender,
            profilePic
        })

        await newUser.save()
        await genToken(newUser._id, res)
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.error(error);
        res.status(error.code || 500).json({ error: error.message })
    }
}