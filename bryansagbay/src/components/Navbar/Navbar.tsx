import React from 'react';
import { TabItem } from '../../types/types';
import './Navbar.css';
import NavItem from '../NavItem/NavItem';

interface VerticalNavbarProps {
  items: TabItem[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = ({
  items,
  activeTabId,
  onTabChange
}) => {
  return (
    <nav className="vertical-navbar">
  {items.map((item) => (
    <NavItem
      key={item.id}
      id={item.id}
      label={item.label}
      isActive={activeTabId === item.id}
      onClick={() => onTabChange(item.id)}
    />
  ))}
</nav>

  );
};

export default VerticalNavbar;