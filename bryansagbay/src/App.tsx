import React from 'react';
import { TabItem } from './types/types';
import Home from './views/Home';
import Projects from './views/Projects';
import Profile from './views/Profile';
import Research from './views/Research';
import Layout from './components/Layout/Layout';


const App: React.FC = () => {
  // Definir los elementos del navbar
  const tabItems: TabItem[] = [
    { id: 'home', label: 'Inicio', content: <Home /> },
    { id: 'projects', label: 'Proyectos', content: <Projects /> },
    { id: 'profile', label: 'Perfil', content: <Profile /> },
    { id: 'settings', label: 'Configuración', content: <Research /> }
  ];

  return (
    <Layout tabItems={tabItems} defaultActiveTab="home" />
  );
};

export default App;