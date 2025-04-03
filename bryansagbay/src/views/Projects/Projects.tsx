import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import { CiMobile3 } from 'react-icons/ci';
import { SlScreenDesktop } from 'react-icons/sl';
import ProyectoCardModern from '../../components/CardModern/CardModern';
import { proyectos } from '../../data/Proyectos';

const ProyectosScroll: React.FC = () => {
  const [tipoActivo, setTipoActivo] = useState<'pc' | 'movil' | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollBar, setShowScrollBar] = useState(true);

  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSectionRef = useRef<HTMLDivElement | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inicializar refs
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, proyectos.length);
    while (sectionRefs.current.length < proyectos.length) {
      sectionRefs.current.push(null);
    }
  }, []);

  // Observa el tipo de proyecto visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const index = Number((visibleEntry.target as HTMLDivElement).dataset.index);
          const tipo = proyectos[index]?.tipo;
          if (tipo) setTipoActivo(tipo);
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

  // Manejo de scroll personalizado y visibilidad de la barra
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setScrollProgress(progress);

    setShowScrollBar(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    hideTimeoutRef.current = setTimeout(() => {
      setShowScrollBar(false);
    }, 2000);
  };

  return (
    <div className="proyectos-wrapper">
      <div className={`scroll-indicador ${!showScrollBar ? 'oculto' : ''}`}>
        <div className="agua" style={{ height: `${scrollProgress}%` }} />
      </div>

      <div
        className="proyectos-container"
        ref={containerRef}
        onScroll={handleScroll}
      >
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
            >
              <ProyectoCardModern
                tipo={proyecto.tipo}
                titulo={proyecto.titulo}
                descripcion={proyecto.descripcion}
                imagenProyecto={proyecto.imagenProyecto}
                indice={index}
                link={proyecto.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProyectosScroll;
