import React, { useEffect, useState } from 'react';
import { TabItem } from '../../types/types';
import './Navbar.css';
import NavItem from '../NavItem/NavItem';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { RiMailSendLine } from 'react-icons/ri';

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
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    if (activeTabId !== 'home' && !animationPlayed) {
      setAnimationPlayed(true);
    }
  }, [activeTabId, animationPlayed]);

  return (
    <nav className="vertical-navbar">
      <div className="nav-items">
        {items.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            label={item.label}
            isActive={activeTabId === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </div>

      {activeTabId !== 'home' && (
        <div className="social-icons">
          <a className={animationPlayed ? 'bounce-in' : ''} href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub /></a>
          <a className={animationPlayed ? 'bounce-in' : ''} href="mailto:tuemail@ejemplo.com" title="Enviar mensaje"><RiMailSendLine /></a>
          <a className={animationPlayed ? 'bounce-in' : ''} href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin /></a>
          <a className={animationPlayed ? 'bounce-in' : ''} href="/cv.pdf" download title="Ver CV"><FaDownload /></a>
        </div>
      )}
    </nav>
  );
};

export default VerticalNavbar;
