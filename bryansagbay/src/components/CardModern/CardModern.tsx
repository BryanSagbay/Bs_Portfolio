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
  const layoutClass = tipo === 'movil' ? 'fila-invertida' : '';

  return (
    <div className={`moderno-container ${layoutClass}`}>
      <div className="texto">
        <span className="contador">{String(indice + 1).padStart(2, '0')}</span>
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
        <a className="boton-proyecto" href={link} target="_blank" rel="noreferrer">
          Ver proyecto →
        </a>
      </div>

      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.05}
        transitionSpeed={1500}
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#ffffff"
        glarePosition="all"
        className="tilt-mockup"
      >
        <div className={`mockup ${tipo}`}>
          {/* The key change is here - we create a proper container for the mockup screen */}
          <div className="mockup-screen">
            <img 
              src={imagenProyecto} 
              alt={titulo} 
              className="contenido-mockup" 
            />
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default ProyectoCardModern;