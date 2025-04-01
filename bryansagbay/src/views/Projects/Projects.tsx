import React, { useRef } from 'react';
import './Projects.css';
import { CiMobile3 } from "react-icons/ci";
import { SlScreenDesktop } from "react-icons/sl";

interface Proyecto {
  id: number;
  tipo: 'pc' | 'movil';
}

const ProyectosScroll: React.FC = () => {
  const proyectos: Proyecto[] = [
    { id: 1, tipo: "pc" },
    { id: 2, tipo: "movil" },
    { id: 3, tipo: "pc" },
    { id: 4, tipo: "movil" },
    { id: 5, tipo: "pc" },
    { id: 6, tipo: "movil" },
    { id: 7, tipo: "pc" },
    { id: 8, tipo: "movil" },
    { id: 9, tipo: "pc" },
    { id: 10, tipo: "movil" },
  ];

  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="proyectos-container" ref={containerRef}>
      {/* Iconos arriba */}
      <div className="navbar-iconos">
        <div className="icono"><SlScreenDesktop /></div>
        <div className="icono"><CiMobile3 /></div>
      </div>

      {/* Contenido de proyectos */}
      <div className="proyectos-contenido">
        {proyectos.map((proyecto, index) => (
          <div
            key={index}
            ref={(el) => setRef(el, index)}
            className="proyecto-seccion"
          >
            <div className="proyecto-card">
              <h2>Proyecto #{proyecto.id}</h2>
              <div className="proyecto-imagen">Imagen {proyecto.tipo}</div>
              <div className="proyecto-tipo">
                Tipo: {proyecto.tipo === 'pc' ? 'Desktop' : 'Móvil'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProyectosScroll;