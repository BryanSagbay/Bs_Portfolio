import { Research } from '../models/Research.js'

export const getAllResearch = async (req, res) => {
  try {
    const researchList = await Research.findAll()
    res.status(200).json(researchList)
  } catch (error) {
    console.error('Error al obtener investigaciones:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const getResearchById = async (req, res) => {
  const { id } = req.params
  try {
    const research = await Research.findById(id)
    if (!research) {
      return res.status(404).json({ message: 'Investigación no encontrada' })
    }
    res.status(200).json(research)
  } catch (error) {
    console.error('Error al obtener investigación por ID:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const createResearch = async (req, res) => {
  try {
    const research = await Research.create(req.body)
    res.status(201).json(research)
  } catch (error) {
    console.error('Error al crear investigación:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const updateResearch = async (req, res) => {
  const { id } = req.params
  try {
    const updated = await Research.update(id, req.body)
    if (!updated) return res.status(404).json({ message: 'Investigación no encontrada' })
    res.status(200).json(updated)
  } catch (error) {
    console.error('Error al actualizar investigación:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const deleteResearch = async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await Research.delete(id)
    if (!deleted) return res.status(404).json({ message: 'Investigación no encontrada' })
    res.status(200).json({ message: 'Investigación eliminada' })
  } catch (error) {
    console.error('Error al eliminar investigación:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}
