import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import { CiMobile3 } from "react-icons/ci";
import { SlScreenDesktop } from "react-icons/sl";
import ProyectoCardModern from '../../components/CardModern/CardModern';
import { proyectos} from '../../data/proyectos';

const ProyectosScroll: React.FC = () => {
  const [progreso, setProgreso] = useState<number>(0);
  const [tipoActivo, setTipoActivo] = useState<'pc' | 'movil' | null>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Inicializa refs por cada sección
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, proyectos.length);
    while (sectionRefs.current.length < proyectos.length) {
      sectionRefs.current.push(null);
    }
  }, []);

  // Barra de progreso
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const newProgress = (scrollPosition / totalHeight) * 100;
      setProgreso(Math.min(100, Math.max(0, newProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detección del proyecto visible usando IntersectionObserver
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
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // 60% visible
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="proyectos-container" ref={containerRef} style={{ scrollSnapType: 'y mandatory' }}>
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

      <div className="barra-progreso-container">
        <div className="barra-progreso-fondo">
          <div
            className="barra-progreso-relleno"
            style={{ height: `${progreso}%` }}
          ></div>
        </div>
      </div>

      <div className="proyectos-contenido">
        {proyectos.map((proyecto, index) => (
          <div
            key={index}
            ref={(el) => setRef(el, index)}
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
  );
};

export default ProyectosScroll;
