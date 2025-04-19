import axios from 'axios'
import { ProjectData } from '../model/projects'

const API_URL = 'http://localhost:3000/api/projects'

export const getProjects = async (): Promise<ProjectData[]> => {
  const res = await axios.get<ProjectData[]>(API_URL)
  return res.data
}

export const createProject = async (project: Omit<ProjectData, 'id'>) => {
  const res = await axios.post<ProjectData>(API_URL, project, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  return res.data
}

export const updateProject = async (id: number, project: ProjectData) => {
  const res = await axios.put<ProjectData>(`${API_URL}/${id}`, project, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  return res.data
  
}

export const deleteProject = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  return res.data
}

