import { HomeData } from '../model/home';

const API_URL = import.meta.env.VITE_API_HOME;

//ss
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const getAllHomes = async (): Promise<HomeData[]> => {
  const res = await fetch(API_URL, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener los datos');
  return res.json();
};

export const getHomeById = async (id: number): Promise<HomeData> => {
  const res = await fetch(`${API_URL}/${id}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener el dato');
  return res.json();
};

export const createHome = async (data: Omit<HomeData, 'id'>): Promise<HomeData> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear');
  return res.json();
};

export const updateHome = async (id: number, data: Omit<HomeData, 'id'>): Promise<HomeData> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar');
  return res.json();
};

export const deleteHome = async (id: number): Promise<{ message: string }> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Error al eliminar');
  return res.json();
};