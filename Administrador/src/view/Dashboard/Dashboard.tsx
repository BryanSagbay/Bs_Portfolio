import { FC, useState } from 'react';
import {
  FiMenu, FiUser, FiHome, FiBarChart2, FiFolder, FiLogOut
} from 'react-icons/fi';
import { MdOutlineGrade } from "react-icons/md";
import { LuUserSearch } from "react-icons/lu";
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './Dashboard.css';
import About from '../About/About';
import Home from '../Home/Home';
import ProjectList from '../../components/Projects/Projects';
import ResearchList from '../../components/Research/Research';
import ExperienceList from '../Experience/Expererience';

interface User {
  id: number;
  username: string;
  email: string;
}

interface DashboardPageProps {
  onLogout: () => void;
}

const Dashboard: FC<DashboardPageProps> = ({ onLogout }) => {
  const userJSON = localStorage.getItem('user');
  const user: User | null = userJSON ? JSON.parse(userJSON) : null;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getActiveSection = () => {
    const path = location.pathname;
    if (path.includes('/home')) return 'home';
    if (path.includes('/projects')) return 'projects';
    if (path.includes('/research')) return 'research';
    if (path.includes('/about')) return 'about';
    if (path.includes('/experience')) return 'experience';
    return 'dashboard';
  };

  const activeSection = getActiveSection();

  const changeSection = (section: string) => {
    navigate(`/inicio/${section === 'dashboard' ? '' : section}`);
    if (window.innerWidth <= 992) setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-toggle" onClick={toggleSidebar}><FiMenu /></button>
          <h1 className="navbar-title">Panel de Control</h1>
        </div>
        <div className="navbar-right">
        </div>
      </nav>

      <div className="main-container">
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-user">
            <div className="sidebar-avatar"><FiUser size={32} /></div>
            <div className="sidebar-user-info">
              <p className="sidebar-username">{user?.username || 'Usuario'}</p>
              <p className="sidebar-email">{user?.email || 'correo@ejemplo.com'}</p>
            </div>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li className={activeSection === 'home' ? 'active' : ''}>
                <button onClick={() => changeSection('home')}><FiHome /> Home</button>
              </li>
              <li className={activeSection === 'projects' ? 'active' : ''}>
                <button onClick={() => changeSection('projects')}><FiBarChart2 /> Projects </button>
              </li>
              <li className={activeSection === 'research' ? 'active' : ''}>
                <button onClick={() => changeSection('research')}><FiFolder /> Research </button>
              </li>
              <li className={activeSection === 'about' ? 'active' : ''}>
                <button onClick={() => changeSection('about')}><LuUserSearch/> About</button>
              </li>
              <li className={activeSection === 'experience' ? 'active' : ''}>
                <button onClick={() => changeSection('experience')}><MdOutlineGrade/> Experience</button>
              </li>
              <li className="logout">
                <button onClick={onLogout}><FiLogOut /> Logout </button>
              </li>
            </ul>
          </nav>
        </aside>
        {sidebarOpen && window.innerWidth <= 992 && (
          <div className="overlay" onClick={toggleSidebar}></div>
        )}
        <main className="main-content">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="projects" element={<ProjectList />} />
            <Route path="research" element={<ResearchList />} />
            <Route path="about" element={<About />} />
            <Route path="experience" element={<ExperienceList />} />
            <Route path="*" element={<Navigate to="home" replace />} />
            </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
