import React, { useState } from 'react';

import { TabItem } from '../../types/types';
import './Layout.css';
import VerticalNavbar from '../Navbar/Navbar';
import ContentArea from '../Contents/Contents';

interface LayoutProps {
  tabItems: TabItem[];
  defaultActiveTab?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  tabItems, 
  defaultActiveTab 
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabItems[0].id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Encontrar el contenido activo
  const activeContent = tabItems.find(item => item.id === activeTab)?.content;

  return (
    <div className="layout">
      <VerticalNavbar 
        items={tabItems} 
        activeTabId={activeTab} 
        onTabChange={handleTabChange} 
      />
      <ContentArea content={activeContent} />
    </div>
  );
};

export default Layout;