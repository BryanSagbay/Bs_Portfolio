import express from 'express'
import {
  getAllHome,
  getHomeById,
  createHome,
  updateHome,
  deleteHome
} from '../controllers/homeController.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// Públicos
router.get('/', getAllHome)
router.get('/:id', getHomeById)

// Protegidos
router.post('/', verifyToken, createHome)
router.put('/:id', verifyToken, updateHome)
router.delete('/:id', verifyToken, deleteHome)

export default router
