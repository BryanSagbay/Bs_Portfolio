import React from 'react';
import Tilt from 'react-parallax-tilt';
import './CardModern.css';

interface ProyectoCardModernProps {
  tipo: 'pc' | 'movil';
  titulo: string;
  descripcion: string;
  imagenProyecto: string;
  indice: number;
  link: string;
}

const ProyectoCardModern: React.FC<ProyectoCardModernProps> = ({
  tipo,
  titulo,
  descripcion,
  imagenProyecto,
  indice,
  link,
}) => {
  return (
    <div className="moderno-container">
      <div className="texto">
        <span className="contador">{String(indice + 1).padStart(2, '0')}</span>
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
        <a className="boton-proyecto" href={link} target="_blank" rel="noreferrer">
          Ver proyecto →
        </a>
      </div>

      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#ffffff"
        glarePosition="all"
        className="tilt-mockup"
      >
        <div className={`mockup ${tipo}`}>
          <img src={imagenProyecto} alt="preview" className="contenido-mockup" />
        </div>
      </Tilt>
    </div>
  );
};

export default ProyectoCardModern;
