import React from 'react';
import './FeaturedArticleCard.css';
import { motion } from 'framer-motion';

type Props = {
  titulo: string;
  descripcion: string;
  fecha: string;
  tiempoLectura: string;
  imagen: string;
  link: string;
};

const FeaturedArticleCard: React.FC<Props> = ({ titulo, descripcion, fecha, tiempoLectura, imagen, link }) => {
  return (
    <motion.div
      key={titulo}
      className="featured-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="imagen" style={{ backgroundImage: `url(${imagen})` }} />
      <div className="contenido">
        <span className="fecha">{fecha}</span>
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="leer-mas">
          Read article
        </a>
        <span className="duracion">⏱ {tiempoLectura}</span>
      </div>
    </motion.div>
  );
};

export default FeaturedArticleCard;