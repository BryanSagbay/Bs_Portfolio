import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import { CiMobile3 } from "react-icons/ci";
import { SlScreenDesktop } from "react-icons/sl";
import ProyectoCardModern from '../../components/CardModern/CardModern';

interface Proyecto {
  id: number;
  tipo: 'pc' | 'movil';
  titulo: string;
  descripcion: string;
  imagenProyecto: string;
  link: string;
}

const ProyectosScroll: React.FC = () => {
  const proyectos: Proyecto[] = [
    {
      id: 1,
      tipo: "pc",
      titulo: "Designing the future of education",
      descripcion: "Designing a platform to help educators build better online courseware.",
      imagenProyecto: "src/assets/dashboard.png",
      link: "#"
    },
    {
      id: 2,
      tipo: "movil",
      titulo: "Video game progress tracking",
      descripcion: "A mobile app to track game time and achievements with a modern UI.",
      imagenProyecto: "src/assets/movil.png",
      link: "#"
    },
    {
      id: 3,
      tipo: "pc",
      titulo: "AI Dashboard",
      descripcion: "Analytics and visualizations for AI models in a modern desktop UI.",
      imagenProyecto: "src/assets/ai.gif",
      link: "#"
    },
    {
      id: 4,
      tipo: "movil",
      titulo: "Finance Tracker",
      descripcion: "Track your daily expenses and savings easily from your phone.",
      imagenProyecto: "src/assets/example.png",
      link: "#"
    }
  ];

  const [progreso, setProgreso] = useState<number>(0);
  const [tipoVisible, setTipoVisible] = useState<'pc' | 'movil' | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / totalHeight) * 100;
      setProgreso(Math.min(100, Math.max(0, progress)));

      const viewportCenter = window.innerHeight / 2;
      let closestIndex = -1;
      let closestDistance = Infinity;

      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== -1) {
        const tipo = proyectos[closestIndex].tipo;
        setTipoVisible((prevTipo) => (prevTipo !== tipo ? tipo : prevTipo));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Ejecuta una vez al montar

    return () => window.removeEventListener('scroll', handleScroll);
  }, [proyectos]);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="proyectos-container" ref={containerRef}>
      <div className="iconos-dispositivo">
        <span
          className={`icono-pc ${tipoVisible === 'pc' ? 'activo' : ''}`}
          title="Proyectos de escritorio"
        >
          <SlScreenDesktop />
        </span>
        <span
          className={`icono-movil ${tipoVisible === 'movil' ? 'activo' : ''}`}
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
            key={proyecto.id}
            ref={(el) => setRef(el, index)}
            className="proyecto-seccion"
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
