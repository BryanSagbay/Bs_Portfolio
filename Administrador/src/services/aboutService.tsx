import { About } from "../model/about"

const API_URL = "http://localhost:3000/api/about"

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

export const getAllAbout = async (): Promise<About[]> => {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error("Error al obtener los datos")
  return await response.json()
}

export const getAboutById = async (id: number): Promise<About> => {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) throw new Error("Error al obtener el perfil")
  return await response.json()
}

export const createAbout = async (data: Omit<About, "id">): Promise<About> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error("Error al crear el perfil")
  return await response.json()
}

export const updateAbout = async (id: number, data: Omit<About, "id">): Promise<About> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error("Error al actualizar el perfil")
  return await response.json()
}

export const deleteAbout = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  })
  if (!response.ok) throw new Error("Error al eliminar el perfil")
}
