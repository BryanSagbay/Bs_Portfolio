import { FC } from 'react';

// Definimos la interfaz User aquí
interface User {
  id: number;
  username: string;
  email: string;
}

interface DashboardPageProps {
  onLogout: () => void;
}

const Dashboard: FC<DashboardPageProps> = ({ onLogout }) => {
  // Recuperar información del usuario del localStorage
  const userJSON = localStorage.getItem('user');
  const user: User | null = userJSON ? JSON.parse(userJSON) : null;
  
  return (
    <div className="home-page">
      <header>
        <h1>Página Principal</h1>
        <button onClick={onLogout}>Cerrar sesión</button>
      </header>
      
      <main>
        {user ? (
          <div className="welcome-section">
            <h2>Bienvenido, {user.username}!</h2>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Cargando información del usuario...</p>
        )}
        
        {/* Aquí puedes agregar más contenido de la página principal */}
        <div className="dashboard-content">
          <h3>Panel de Control</h3>
          <p>Contenido del panel de control aquí...</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;