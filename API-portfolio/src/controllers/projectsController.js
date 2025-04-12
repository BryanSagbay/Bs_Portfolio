import { Projects } from '../models/Projects.js'

export const getAllProjects = async (_req, res) => {
  try {
    const projects = await Projects.findAll()
    res.status(200).json(projects)
  } catch (error) {
    console.error('Error al obtener proyectos:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const getProjectById = async (req, res) => {
  const { id } = req.params
  try {
    const project = await Projects.findById(id)
    if (!project) return res.status(404).json({ message: 'Proyecto no encontrado' })
    res.status(200).json(project)
  } catch (error) {
    console.error('Error al obtener proyecto:', error)
    res.status(500).json({ message: 'Error del servidor', error: error.message })
  }
}

export const createProject = async (req, res) => {
  try {
    const { type, title, description, indice, link } = req.body
    const imagen = req.file ? `/uploads/${req.file.filename}` : null

    const project = await Projects.create({
      type,
      title,
      description,
      imagen,
      indice,
      link
    })

    res.status(201).json(project)
  } catch (error) {
    console.error('Error al crear proyecto:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const updateProject = async (req, res) => {
  const { id } = req.params
  try {
    const { type, title, description, indice, link } = req.body
    const imagen = req.file ? `/uploads/${req.file.filename}` : undefined

    const updated = await Projects.update(id, {
      type,
      title,
      description,
      imagen,
      indice,
      link
    })

    if (!updated) return res.status(404).json({ message: 'Proyecto no encontrado' })
    res.status(200).json(updated)
  } catch (error) {
    console.error('Error al actualizar proyecto:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const deleteProject = async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await Projects.delete(id)
    if (!deleted) return res.status(404).json({ message: 'Proyecto no encontrado' })
    res.status(200).json({ message: 'Proyecto eliminado' })
  } catch (error) {
    console.error('Error al eliminar proyecto:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}
