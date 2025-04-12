import express from 'express'
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectsController.js'

import { verifyToken } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

// Públicos
router.get('/', getAllProjects)
router.get('/:id', getProjectById)

// Protegidos con subida de imagen
router.post('/', verifyToken, upload.single('imagen'), createProject)
router.put('/:id', verifyToken, upload.single('imagen'), updateProject)
router.delete('/:id', verifyToken, deleteProject)

export default router
