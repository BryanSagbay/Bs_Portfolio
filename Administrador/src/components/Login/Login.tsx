import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Asegúrate de tener un archivo CSS para estilos
// Define interfaces for our form data and response
interface LoginFormData {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

// Define tipos específicos para errores de Axios
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

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Consumir la API de login
      const response = await axios.post<LoginResponse>(
        '/api/auth/login', 
        formData
      );
      
      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.token);
      
      // Guardar información del usuario si es necesario
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Opcional: Configurar el token para futuras solicitudes
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // Redireccionar al dashboard o página principal
      navigate('/dashboard');
    } catch (err: unknown) {
      // Tipar el error como nuestro tipo personalizado
      const axiosError = err as AxiosErrorResponse;
      
      if (axiosError.response) {
        // El servidor respondió con un estado de error
        setError(axiosError.response.data?.message || 'Error al iniciar sesión');
      } else if (axiosError.request) {
        // La solicitud se hizo pero no se recibió respuesta
        setError('No se recibió respuesta del servidor');
      } else {
        // Algo ocurrió al configurar la solicitud
        setError('Error de conexión. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Iniciar Sesión</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button" 
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;