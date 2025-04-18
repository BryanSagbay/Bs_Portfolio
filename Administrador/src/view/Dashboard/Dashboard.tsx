import { FC, useState } from 'react';
import {
  FiMenu, FiUser, FiHome, FiSettings, FiBarChart2, FiFolder, FiLogOut, FiBell
} from 'react-icons/fi';
import './Dashboard.css';
import Home from '../../components/Home/Home';
import Projects from '../../components/Projects/Projects';
import Research from '../../components/Research/Research';
import About from '../../components/About/About';
import Settings from '../Settings/Settings';


interface User {
  id: number;
  username: string;
  email: string;
}

interface DashboardPageProps {
  onLogout: () => void;
}

export type DashboardSection = 'dashboard' | 'analytics' | 'projects' | 'settings';

const Dashboard: FC<DashboardPageProps> = ({ onLogout }) => {
  const userJSON = localStorage.getItem('user');
  const user: User | null = userJSON ? JSON.parse(userJSON) : null;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<DashboardSection>('dashboard');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const changeSection = (section: DashboardSection) => {
    setActiveSection(section);
    if (window.innerWidth <= 992) setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <Home />;
      case 'analytics': return <Projects />;
      case 'projects': return <Research />;
      case 'settings': return <About  />;
      default: return <Settings />;
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-toggle" onClick={toggleSidebar}><FiMenu /></button>
          <h1 className="navbar-title">Panel de Control</h1>
        </div>
        <div className="navbar-right">
          <div className="notification-icon">
            <FiBell />
            <span className="notification-badge">3</span>
          </div>
          <div className="user-profile">
            <span className="user-name">{user?.username || 'Usuario'}</span>
            <div className="user-avatar"><FiUser /></div>
          </div>
        </div>
      </nav>

      <div className="main-container">
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-header"><h2>MI APLICACIÓN</h2></div>
          <div className="sidebar-user">
            <div className="sidebar-avatar"><FiUser /></div>
            <div className="sidebar-user-info">
              <p className="sidebar-username">{user?.username || 'Usuario'}</p>
              <p className="sidebar-email">{user?.email || 'correo@ejemplo.com'}</p>
            </div>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li className={activeSection === 'dashboard' ? 'active' : ''}>
                <button onClick={() => changeSection('dashboard')}><FiHome /> Inicio</button>
              </li>
              <li className={activeSection === 'analytics' ? 'active' : ''}>
                <button onClick={() => changeSection('analytics')}><FiBarChart2 /> Estadísticas</button>
              </li>
              <li className={activeSection === 'projects' ? 'active' : ''}>
                <button onClick={() => changeSection('projects')}><FiFolder /> Proyectos</button>
              </li>
              <li className={activeSection === 'settings' ? 'active' : ''}>
                <button onClick={() => changeSection('settings')}><FiSettings /> Configuración</button>
              </li>
              <li className="logout">
                <button onClick={onLogout}><FiLogOut /> Cerrar sesión</button>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;