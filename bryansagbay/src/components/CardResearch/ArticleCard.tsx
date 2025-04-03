import React from 'react';
import './ArticleCard.css';

type Props = {
  titulo: string;
  fecha: string;
  tags: string[];
  descripcion: string;
  imagen: string;
  link: string;
};

const ArticleCard: React.FC<Props> = ({ titulo, fecha, tags, descripcion, imagen, link }) => {
  return (
    <a href={link} className="article-card">
      <div className="article-img" style={{ backgroundImage: `url(${imagen})` }} />
      <div className="article-content">
        <h3>{titulo}</h3>
        <span className="fecha">{fecha}</span>
        <div className="tags">
          {tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
        <p>{descripcion}</p>
      </div>
    </a>
  );
};

export default ArticleCard;
