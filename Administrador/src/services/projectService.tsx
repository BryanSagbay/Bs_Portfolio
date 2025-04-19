import axios from 'axios'
import { ProjectData } from '../model/projects'

const API_URL = 'http://localhost:3000/api/projects'

export const getProjects = async (): Promise<ProjectData[]> => {
  const res = await axios.get<ProjectData[]>(API_URL)
  return res.data
}

export const createProject = async (data: Omit<ProjectData, 'id'>, file?: File) => {
  const formData = new FormData()

  // Agrega campos uno por uno
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, String(value))
  }

  if (file) {
    formData.append('imagen', file)
  }

  const res = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  return res.data
}

export const updateProject = async (id: number, data: Partial<ProjectData>, file?: File) => {
  const formData = new FormData()

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) formData.append(key, String(value))
  }

  if (file) {
    formData.append('imagen', file)
  }

  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  return res.data
}

export const deleteProject = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  return res.data
}
