import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginForm from './view/Login/Login';
import Dashboard from './view/Dashboard/Dashboard';
import "./App.css"

// Componente para rutas protegidas
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Verificar si existe un token al cargar la aplicación
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Función para manejar el login exitoso
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isLoggedIn ?
            <Navigate to="/inicio/home" replace /> :
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        } />

        <Route path="/inicio/*" element={
          <ProtectedRoute>
            <Dashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } />

        <Route path="/" element={<Navigate to="/inicio/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;