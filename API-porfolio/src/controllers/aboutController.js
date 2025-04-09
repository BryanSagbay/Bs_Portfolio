import { About } from '../models/About.js'

export const getAllAbout = async (_req, res) => {
  try {
    const data = await About.findAll()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error al obtener información de About:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const getAboutById = async (req, res) => {
  const { id } = req.params
  try {
    const about = await About.findById(id)
    if (!about) return res.status(404).json({ message: 'No encontrado' })
    res.status(200).json(about)
  } catch (error) {
    console.error('Error al obtener About por ID:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const createAbout = async (req, res) => {
  try {
    const created = await About.create(req.body)
    res.status(201).json(created)
  } catch (error) {
    console.error('Error al crear About:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const updateAbout = async (req, res) => {
  const { id } = req.params
  try {
    const updated = await About.update(id, req.body)
    if (!updated) return res.status(404).json({ message: 'No encontrado' })
    res.status(200).json(updated)
  } catch (error) {
    console.error('Error al actualizar About:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const deleteAbout = async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await About.delete(id)
    if (!deleted) return res.status(404).json({ message: 'No encontrado' })
    res.status(200).json({ message: 'Eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar About:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}
