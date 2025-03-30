import React from 'react';
import { TabItem } from './types/types';
import Home from './views/home/Home';
import Projects from './views/Projects';
import Profile from './views/Profile';
import Research from './views/Research';
import Layout from './components/Layout/Layout';


const App: React.FC = () => {
  // Definir los elementos del navbar
  const tabItems: TabItem[] = [
    { id: 'home', label: 'Home', content: <Home /> },
    { id: 'projects', label: 'Projects', content: <Projects /> },
    { id: 'research', label: 'Research', content: <Research /> },
    { id: 'about', label: 'About Me', content: <Profile /> }
  ];

  return (
    <Layout tabItems={tabItems} defaultActiveTab="home" />
  );
};

export default App;