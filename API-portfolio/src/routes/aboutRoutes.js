import express from 'express'
import {
  getAllAbout,
  getAboutById,
  createAbout,
  updateAbout,
  deleteAbout
} from '../controllers/aboutController.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// Públicos
router.get('/', getAllAbout)
router.get('/:id', getAboutById)

// Protegidos
router.post('/', verifyToken, createAbout)
router.put('/:id', verifyToken, updateAbout)
router.delete('/:id', verifyToken, deleteAbout)

export default router
