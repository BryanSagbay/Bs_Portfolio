import { LoginCredentials, LoginResponse } from "../model/auth";


const API_URL = import.meta.env.VITE_API_AUTH;

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al iniciar sesión');
  }

  const data: LoginResponse = await response.json();
  return data;
};
