import React from 'react';
import './MiniArticleCard.css';

type Props = {
  titulo: string;
  fecha: string;
  onClick: () => void;
  activo: boolean;
};

const MiniArticleCard: React.FC<Props> = ({ titulo, fecha, onClick, activo }) => {
  return (
    <div className={`mini-card ${activo ? 'activo' : ''}`} onClick={onClick}>
      <span className="fecha">{fecha}</span>
      <h4>{titulo}</h4>
    </div>
  );
};

export default MiniArticleCard;