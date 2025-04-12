import express from 'express'
import {
  getAllResearch,
  getResearchById,
  createResearch,
  updateResearch,
  deleteResearch
} from '../controllers/researchController.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// Públicos
router.get('/', getAllResearch)
router.get('/:id', getResearchById)

// Protegidos
router.post('/', verifyToken, createResearch)
router.put('/:id', verifyToken, updateResearch)
router.delete('/:id', verifyToken, deleteResearch)

export default router
