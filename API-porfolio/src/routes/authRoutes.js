import express from 'express'
import * as authController from '../controllers/authController.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// Rutas públicas
router.post('/login', authController.login)
router.post('/register', authController.register)

// Rutas protegidas (si aplica)
router.post('/logout', verifyToken, authController.logout)

export default router
