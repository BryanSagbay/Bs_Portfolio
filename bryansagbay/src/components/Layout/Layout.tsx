import React, { useState } from 'react';
import { TabItem } from '../../types/types';
import VerticalNavbar from '../Navbar/Navbar';
import './Layout.css';

interface LayoutProps {
  tabItems: TabItem[];
  defaultActiveTab: string;
}

const Layout: React.FC<LayoutProps> = ({ tabItems, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <div className="layout">
      <VerticalNavbar
        items={tabItems}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="main-content">
        {tabItems.find(item => item.id === activeTab)?.content}
      </main>
    </div>
  );
};

export default Layout; 