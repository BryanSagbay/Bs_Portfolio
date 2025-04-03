import React, { useState } from 'react';
import './Research.css';
import { articulos } from '../../data/Articulos';
import FeaturedArticleCard from '../../components/FeaturedCard/FeaturedArticleCard';
import MiniArticleCard from '../../components/MiniCard/MiniArticleCard';


const Research: React.FC = () => {
  const [activo, setActivo] = useState(articulos[0]);

  return (
    <div className="research-grid">
      <div className="lista-articulos">
        <h3>Latest articles</h3>
        {articulos.map((a) => (
          <MiniArticleCard
            key={a.id}
            titulo={a.titulo}
            fecha={a.fecha}
            onClick={() => setActivo(a)}
            activo={a.id === activo.id}
          />
        ))}
      </div>

      <div className="preview-articulo">
        <FeaturedArticleCard {...activo} />
      </div>
    </div>
  );
};

export default Research;
