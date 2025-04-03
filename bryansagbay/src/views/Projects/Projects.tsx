import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import { CiMobile3 } from 'react-icons/ci';
import { SlScreenDesktop } from 'react-icons/sl';
import ProyectoCardModern from '../../components/CardModern/CardModern';
import { proyectos } from '../../data/Proyectos';
import ListProjects from '../../components/ListProjects/ListProjects';
import { useScrollToRedirect } from '../../hooks/useScrollToDirect';

const ProyectosScroll: React.FC = () => {
  const [tipoActivo, setTipoActivo] = useState<'pc' | 'movil' | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [showList, setShowList] = useState(false);

  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSectionRef = useRef<HTMLDivElement | null>(null);

  // Redirección visual con animación
  const startRedirect = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowList(true);
      setFadeOut(false);
    }, 800);
  };


  // Inicializa los refs para cada sección
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, proyectos.length);
    while (sectionRefs.current.length < proyectos.length) {
      sectionRefs.current.push(null);
    }
  }, []);

  // Observa el tipo de proyecto visible para resaltar icono
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const index = Number((visibleEntry.target as HTMLDivElement).dataset.index);
          const tipo = proyectos[index]?.tipo;
          if (tipo) {
            setTipoActivo(tipo);
          }
        }
      },
      {
        root: containerRef.current,
        rootMargin: '0px',
        threshold: 0.6,
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Hook para activar redirección al hacer scroll en la última sección
  useScrollToRedirect({
    elementRef: lastSectionRef as React.RefObject<HTMLElement>,
    onTrigger: startRedirect,
    enabled: !showList,
  });

  return (
    <div className={`proyectos-container ${fadeOut ? 'fade-out' : ''}`} ref={containerRef}>
      {!showList ? (
        <>
          {/* Iconos de tipo de proyecto */}
          <div className="iconos-dispositivo">
            <span
              className={`icono-pc ${tipoActivo === 'pc' ? 'activo' : ''}`}
              title="Proyectos de escritorio"
            >
              <SlScreenDesktop />
            </span>
            <span
              className={`icono-movil ${tipoActivo === 'movil' ? 'activo' : ''}`}
              title="Proyectos móviles"
            >
              <CiMobile3 />
            </span>
          </div>

          {/* Lista de proyectos */}
          <div className="proyectos-contenido">
            {proyectos.map((proyecto, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                  if (index === proyectos.length - 1) {
                    lastSectionRef.current = el;
                  }
                }}
                className="proyecto-seccion"
                data-index={index}
                style={{ position: 'relative' }}
              >
                <ProyectoCardModern
                  tipo={proyecto.tipo}
                  titulo={proyecto.titulo}
                  descripcion={proyecto.descripcion}
                  imagenProyecto={proyecto.imagenProyecto}
                  indice={index}
                  link={proyecto.link}
                />

                {index === proyectos.length - 1 && (
                  <div className="footer-more-projects">
                    <button className="boton-more" onClick={startRedirect}>
                      More Projects ↓
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <ListProjects />
      )}
    </div>
  );
};

export default ProyectosScroll;