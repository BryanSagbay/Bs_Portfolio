import express from 'express'
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
} from '../controllers/experienceController.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// Públicos
router.get('/', getAllExperiences)
router.get('/:id', getExperienceById)

// Protegidos
router.post('/', verifyToken, createExperience)
router.put('/:id', verifyToken, updateExperience)
router.delete('/:id', verifyToken, deleteExperience)

export default router
