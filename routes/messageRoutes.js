import express from 'express'
import { getMessages, sendMessage } from '../controllers/messageController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/:id',authMiddleware,getMessages)
router.post('/send/:id',authMiddleware,sendMessage)

export default router