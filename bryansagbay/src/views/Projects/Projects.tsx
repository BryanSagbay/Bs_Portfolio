import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Projects.css';
import { CiMobile3 } from 'react-icons/ci';
import { SlScreenDesktop } from 'react-icons/sl';
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
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

  // Optimizar la redirección usando useCallback para memorizar la función
  const startRedirect = useCallback(() => {
    setFadeOut(true);
    // Reducir el tiempo de espera de 800ms a 400ms
    setTimeout(() => {
      setShowList(true);
      setFadeOut(false);
    }, 400);
  }, []);

  // Optimizar el manejador del evento de retorno
  const handleReturnToProjects = useCallback(() => {
    setFadeOut(true);
    // Reducir el tiempo de espera de 800ms a 400ms
    setTimeout(() => {
      setShowList(false);
      setFadeOut(false);
    }, 400);
  }, []);

  // Escuchar el evento de retorno con el callback optimizado
  useEffect(() => {
    window.addEventListener('returnToProjects', handleReturnToProjects);
    return () => {
      window.removeEventListener('returnToProjects', handleReturnToProjects);
    };
  }, [handleReturnToProjects]);

  // Inicializar los refs con mejor rendimiento
  useEffect(() => {
    // Preasignar el array con la longitud correcta
    sectionRefs.current = Array(proyectos.length).fill(null);
  }, []);

  // Observador de intersección optimizado
  useEffect(() => {
    // Crear una sola instancia del observador
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLDivElement).dataset.index);
            const tipo = proyectos[index]?.tipo;
            if (tipo) {
              setTipoActivo(tipo);
              break; // Salir una vez que encontramos la entrada visible
            }
          }
        }
      },
      {
        root: containerRef.current,
        rootMargin: '0px',
        threshold: 0.6,
      }
    );

    // Observar elementos existentes
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Hook para activar redirección al hacer scroll
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
                      <MdOutlineKeyboardDoubleArrowDown />
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

export default React.memo(ProyectosScroll);