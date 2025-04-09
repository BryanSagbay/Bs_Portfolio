import { Experience } from '../models/Experience.js'

export const getAllExperiences = async (_req, res) => {
  try {
    const data = await Experience.findAll()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error al obtener experiencias:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const getExperienceById = async (req, res) => {
  const { id } = req.params
  try {
    const experience = await Experience.findById(id)
    if (!experience) return res.status(404).json({ message: 'No encontrado' })
    res.status(200).json(experience)
  } catch (error) {
    console.error('Error al obtener experiencia:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body)
    res.status(201).json(experience)
  } catch (error) {
    console.error('Error al crear experiencia:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const updateExperience = async (req, res) => {
  const { id } = req.params
  try {
    const updated = await Experience.update(id, req.body)
    if (!updated) return res.status(404).json({ message: 'No encontrado' })
    res.status(200).json(updated)
  } catch (error) {
    console.error('Error al actualizar experiencia:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const deleteExperience = async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await Experience.delete(id)
    if (!deleted) return res.status(404).json({ message: 'No encontrado' })
    res.status(200).json({ message: 'Experiencia eliminada' })
  } catch (error) {
    console.error('Error al eliminar experiencia:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}
