import axios from 'axios'
import { Research } from '../model/research'

const API_URL = 'http://localhost:3000/api/research' // ajusta si usas .env

export const getAllResearch = async (): Promise<Research[]> => {
  const res = await axios.get(API_URL)
  return res.data as Research[]
}

export const getResearchById = async (id: number): Promise<Research> => {
  const res = await axios.get(`${API_URL}/${id}`)
  return res.data as Research
}

export const createResearch = async (data: Omit<Research, 'id'>, token: string) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data as Research
}

export const updateResearch = async (id: number, data: Omit<Research, 'id'>, token: string) => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data as Research
}

export const deleteResearch = async (id: number, token: string) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}