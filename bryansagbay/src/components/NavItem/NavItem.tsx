import React from 'react';
import './NavItem.css';
import LogoIcon from '../LogoIcon/LogoIcon';

interface NavItemProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  id,
  label,
  isActive,
  onClick
}) => {
  const isHome = id === 'home';

  return (
    <div 
      className={`nav-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      data-id={id}
    >
      {isHome ? (
        <LogoIcon isActive={isActive} />
      ) : (
        <span className="rotated-text">{label}</span>
      )}
    </div>
  );
};

export default NavItem;