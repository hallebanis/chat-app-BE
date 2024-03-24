import express from 'express'
import { getUserById } from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get("/",authMiddleware,getUserById)


export default router