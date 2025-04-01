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
      imagenProyecto: "/gamestats-preview.jpg",
      link: "#"
    },
    {
      id: 3,
      tipo: "pc",
      titulo: "AI Dashboard",
      descripcion: "Analytics and visualizations for AI models in a modern desktop UI.",
      imagenProyecto: "/dashboard-preview.jpg",
      link: "#"
    },
    {
      id: 4,
      tipo: "movil",
      titulo: "Finance Tracker",
      descripcion: "Track your daily expenses and savings easily from your phone.",
      imagenProyecto: "/finance-preview.jpg",
      link: "#"
    }
    // Puedes seguir agregando más...
  ];

  const [progreso, setProgreso] = useState<number>(0);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, proyectos.length);
    while (sectionRefs.current.length < proyectos.length) {
      sectionRefs.current.push(null);
    }
  }, [proyectos.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const newProgress = (scrollPosition / totalHeight) * 100;
      setProgreso(Math.min(100, Math.max(0, newProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Progreso inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      {/* Barra de progreso */}
      <div className="barra-progreso-container">
        <div className="barra-progreso-fondo">
          <div
            className="barra-progreso-relleno"
            style={{ height: `${progreso}%` }}
          ></div>
        </div>
      </div>

      {/* Contenido de proyectos */}
      <div className="proyectos-contenido">
        {proyectos.map((proyecto, index) => (
          <div
            key={index}
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
