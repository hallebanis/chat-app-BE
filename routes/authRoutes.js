import express from 'express'
import { loginUser, logout, signupUser } from '../controllers/authController.js'

const router = express.Router()

router.post('/signup', signupUser)
router.post('/login',loginUser)
router.post('/logout', logout)

export default router

