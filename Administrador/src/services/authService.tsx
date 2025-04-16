import axios from 'axios';

// Interfaces
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Interfaz para los errores de Axios
interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  request?: unknown;
  message?: string;
}

// API URL - Ajusta esto a tu URL base
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Service class
class AuthService {
  // Método para iniciar sesión
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/api/auth/login`,
        credentials
      );
      
      // Guardar token en localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Configurar token para todas las solicitudes futuras
        this.setAuthHeader(response.data.token);
      }
      
      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }
  
  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  }
  
  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  
  // Obtener el token actual
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  // Obtener el usuario actual
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
  
  // Configurar el token en los headers para todas las solicitudes
  setAuthHeader(token: string): void {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  
  // Manejar errores de la API
  private handleError(error: unknown): Error {
    const axiosError = error as AxiosErrorResponse;
    
    if (axiosError.response) {
      const message = axiosError.response.data?.message || 'Ocurrió un error en la autenticación';
      return new Error(message);
    }
    
    return new Error('Error de conexión al servidor');
  }
}

export default new AuthService();