import { Home } from '../models/Home.js'

export const getAllHome = async (_req, res) => {
  try {
    const data = await Home.findAll()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error al obtener datos de home:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const getHomeById = async (req, res) => {
  const { id } = req.params
  try {
    const data = await Home.findById(id)
    if (!data) return res.status(404).json({ message: 'No encontrado' })
    res.status(200).json(data)
  } catch (error) {
    console.error('Error al obtener home por ID:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const createHome = async (req, res) => {
  try {
    const created = await Home.create(req.body)
    res.status(201).json(created)
  } catch (error) {
    console.error('Error al crear home:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const updateHome = async (req, res) => {
  const { id } = req.params
  try {
    const updated = await Home.update(id, req.body)
    if (!updated) return res.status(404).json({ message: 'No encontrado' })
    res.status(200).json(updated)
  } catch (error) {
    console.error('Error al actualizar home:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const deleteHome = async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await Home.delete(id)
    if (!deleted) return res.status(404).json({ message: 'No encontrado' })
    res.status(200).json({ message: 'Eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar home:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}
