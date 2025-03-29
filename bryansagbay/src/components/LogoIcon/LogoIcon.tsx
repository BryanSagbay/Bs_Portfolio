import React from 'react';
import './LogoIcon.css';

interface LogoIconProps {
  isActive?: boolean;
}

const LogoIcon: React.FC<LogoIconProps> = ({ isActive = false }) => {
  return (
    <svg 
      width="160" 
      height="120" 
      viewBox="0 0 200 100" 
      className={`logo-icon ${isActive ? 'active' : ''}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <mask id="text-mask">
          <text 
            x="50%" 
            y="75" 
            className="text"
            fontFamily="Georgia, serif"
            fontSize="80"
            fontWeight="bold"
            fill="white" 
            textAnchor="middle"
          >
            BS
          </text>
        </mask>
      </defs>
      
      {/* Texto estático */}
      <text 
        x="50%" 
        y="75" 
        className="text"
        fontFamily="Georgia, serif"
        fontSize="80"
        fontWeight="bold"
        fill="white" 
        textAnchor="middle"
      >
        BS
      </text>

      {/* Efecto de llenado */}
      <g mask="url(#text-mask)">
        <rect
          className="fill-text"
          x="0"
          y="0"
          width="200"
          height="100"
          fill="#64f2ff"
        >
          <animate
            attributeName="y"
            from="100"
            to="0"
            dur="0.8s"
            begin="0s"
            fill="freeze"
            restart="whenNotActive"
          />
        </rect>
      </g>
    </svg>
  );
};

export default LogoIcon; 