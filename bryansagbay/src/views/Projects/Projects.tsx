import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import { CiMobile3 } from "react-icons/ci";
import { SlScreenDesktop } from "react-icons/sl";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import ProyectoCardModern from '../../components/CardModern/CardModern';
import { proyectos } from '../../data/Proyectos';

const ProyectosScroll: React.FC = () => {
  const [tipoActivo, setTipoActivo] = useState<'pc' | 'movil' | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSectionRef = useRef<HTMLDivElement | null>(null);

  // Asigna refs a cada sección
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, proyectos.length);
    while (sectionRefs.current.length < proyectos.length) {
      sectionRefs.current.push(null);
    }
  }, []);

  // Detección de sección visible
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
        threshold: 0.6
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Redirección con animación
  const startRedirect = () => {
    setFadeOut(true);
    setTimeout(() => {
      window.location.href = '/all-projects';
    }, 800);
  };

  // Detecta scroll hacia abajo en el último proyecto
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

  const setRef = (el: HTMLDivElement | null, index: number) => {
    sectionRefs.current[index] = el;
    if (index === proyectos.length - 1) {
      lastSectionRef.current = el;
    }
  };

  return (
    <div
      className={`proyectos-container ${fadeOut ? 'fade-out' : ''}`}
      ref={containerRef}
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {/* Íconos tipo de proyecto */}
      <div className="iconos-dispositivo">
        <span className={`icono-pc ${tipoActivo === 'pc' ? 'activo' : ''}`} title="Proyectos de escritorio">
          <SlScreenDesktop />
        </span>
        <span className={`icono-movil ${tipoActivo === 'movil' ? 'activo' : ''}`} title="Proyectos móviles">
          <CiMobile3 />
        </span>
      </div>

      {/* Lista de proyectos */}
      <div className="proyectos-contenido">
        {proyectos.map((proyecto, index) => (
          <div
            key={index}
            ref={(el) => setRef(el, index)}
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

            {/* Botón solo en el último proyecto */}
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
    </div>
  );
};

export default ProyectosScroll;
