import { Experience } from "../model/experience"

const API_URL = "http://localhost:3000/api/experience"

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

export const getAllExperiences = async (): Promise<Experience[]> => {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error("Error al obtener experiencias")
  return await response.json()
}

export const getExperienceById = async (id: number): Promise<Experience> => {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) throw new Error("Error al obtener experiencia")
  return await response.json()
}

export const createExperience = async (data: Omit<Experience, "id">): Promise<Experience> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error("Error al crear experiencia")
  return await response.json()
}

export const updateExperience = async (
  id: number,
  data: Omit<Experience, "id">
): Promise<Experience> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error("Error al actualizar experiencia")
  return await response.json()
}

export const deleteExperience = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error("Error al eliminar experiencia")
}
