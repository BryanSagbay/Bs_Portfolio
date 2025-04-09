import express from 'express'
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectsController.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// Públicos
router.get('/', getAllProjects)
router.get('/:id', getProjectById)

// Protegidos
router.post('/', verifyToken, createProject)
router.put('/:id', verifyToken, updateProject)
router.delete('/:id', verifyToken, deleteProject)

export default router
