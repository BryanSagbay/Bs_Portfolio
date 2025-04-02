import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import { CiMobile3 } from 'react-icons/ci';
import { SlScreenDesktop } from 'react-icons/sl';
import ProyectoCardModern from '../../components/CardModern/CardModern';
import { proyectos } from '../../data/Proyectos';
import ListProjects from '../../components/ListProjects/ListProjects';

const ProyectosScroll: React.FC = () => {
  const [tipoActivo, setTipoActivo] = useState<'pc' | 'movil' | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [showList, setShowList] = useState(false);

  const handleBackToFeatured = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowList(false);
      setFadeOut(false);
    }, 800);
  };

  
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSectionRef = useRef<HTMLDivElement | null>(null);

  // Inicializa refs
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, proyectos.length);
    while (sectionRefs.current.length < proyectos.length) {
      sectionRefs.current.push(null);
    }
  }, []);

  // Detecta tipo de proyecto visible
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

  // Redirección visual con animación
  const startRedirect = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowList(true);
      setFadeOut(false);
    }, 800);
  };

  // Scroll en último proyecto → cambiar vista
  useEffect(() => {
    const section = lastSectionRef.current;
    if (!section) return;

    let hasScrolled = false;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0 && !hasScrolled) {
        hasScrolled = true;
        startRedirect();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('wheel', handleWheel, { passive: true });
        } else {
          window.removeEventListener('wheel', handleWheel);
          hasScrolled = false;
        }
      },
      {
        root: null,
        threshold: 0.8,
      }
    );

    observer.observe(section);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`proyectos-container ${fadeOut ? 'fade-out' : ''}`}
      ref={containerRef}
    >
      {!showList ? (
        <>
          {/* Íconos activos */}
          <div className="iconos-dispositivo">
            <span className={`icono-pc ${tipoActivo === 'pc' ? 'activo' : ''}`} title="Proyectos de escritorio">
              <SlScreenDesktop />
            </span>
            <span className={`icono-movil ${tipoActivo === 'movil' ? 'activo' : ''}`} title="Proyectos móviles">
              <CiMobile3 />
            </span>
          </div>

          {/* Lista de proyectos modernos */}
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

                {/* Botón final */}
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
        <ListProjects onBackToFeatured={handleBackToFeatured} />
      )}
    </div>
  );
};

export default ProyectosScroll;
