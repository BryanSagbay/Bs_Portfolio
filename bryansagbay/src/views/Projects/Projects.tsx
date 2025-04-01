import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import { IoIosLaptop } from "react-icons/io";
import { CiMobile3 } from "react-icons/ci";

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  tipo: 'pc' | 'movil' | 'ia';
}

const ProyectosScroll: React.FC = () => {
  const proyectos: Proyecto[] = [
    { id: 1, nombre: "Sistema de Gestión", descripcion: "Aplicación de escritorio para gestión empresarial", imagen: "/imagenes/proyecto1.jpg", tipo: "pc" },
    { id: 2, nombre: "App Financiera", descripcion: "Aplicación móvil para control de finanzas personales", imagen: "/imagenes/proyecto2.jpg", tipo: "movil" },
    { id: 3, nombre: "Modelo Predictivo", descripcion: "IA para predicción de comportamiento de usuarios", imagen: "/imagenes/proyecto3.jpg", tipo: "ia" },
    { id: 4, nombre: "Sistema de Inventario", descripcion: "Software de escritorio para control de inventario", imagen: "/imagenes/proyecto4.jpg", tipo: "pc" },
    { id: 5, nombre: "App de Delivery", descripcion: "Aplicación móvil para servicio de delivery", imagen: "/imagenes/proyecto5.jpg", tipo: "movil" },
    { id: 6, nombre: "Chatbot Inteligente", descripcion: "IA conversacional para atención al cliente", imagen: "/imagenes/proyecto6.jpg", tipo: "ia" },
    { id: 7, nombre: "Software Contable", descripcion: "Sistema de escritorio para contabilidad", imagen: "/imagenes/proyecto7.jpg", tipo: "pc" },
    { id: 8, nombre: "App de Fitness", descripcion: "Aplicación móvil para seguimiento de ejercicios", imagen: "/imagenes/proyecto8.jpg", tipo: "movil" },
    { id: 9, nombre: "Recomendador de Productos", descripcion: "IA para recomendación de productos", imagen: "/imagenes/proyecto9.jpg", tipo: "ia" },
    { id: 10, nombre: "Sistema de Facturación", descripcion: "Software de facturación para PC", imagen: "/imagenes/proyecto10.jpg", tipo: "pc" },
  ];

  const [proyectoActual, setProyectoActual] = useState<number>(0);
  const [progreso, setProgreso] = useState<number>(10); // Comienza en 10% (1 de 10)
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Inicializa referencias para cada sección
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, proyectos.length);
    while (sectionRefs.current.length < proyectos.length) {
      sectionRefs.current.push(null);
    }
  }, [proyectos.length]);

  // Detecta la sección visible y actualiza el índice
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      const index = sectionRefs.current.findIndex((ref) => {
        if (!ref) return false;
        const rect = ref.getBoundingClientRect();
        return rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2;
      });

      if (index !== -1 && index !== proyectoActual) {
        setProyectoActual(index);
      }

      // ✅ Calcula progreso basado en índice actual
      const progresoCalculado = ((index + 1) / proyectos.length) * 100;
      setProgreso(progresoCalculado);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Ejecutar al cargar

    return () => window.removeEventListener('scroll', handleScroll);
  }, [proyectoActual, proyectos.length]);

  const tipoActual = proyectos[proyectoActual]?.tipo || 'pc';

  const setRef = (el: HTMLDivElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="proyectos-container" ref={containerRef}>
      {/* Iconos de tipo de proyecto */}
      <div className="navbar-iconos">
        <div className={`icono ${tipoActual === 'pc' ? 'activo' : ''}`}><IoIosLaptop /></div>
        <div className={`icono ${tipoActual === 'movil' ? 'activo' : ''}`}><CiMobile3 /></div>
      </div>

      {/* Barra de progreso personalizada */}
      <div className="barra-progreso-container">
        <div className="barra-progreso-fondo">
          <div
            className="barra-progreso-relleno"
            style={{ height: `${progreso}%` }}
          ></div>
        </div>
      </div>

      {/* Secciones del scroll */}
      <div className="proyectos-contenido">
        {proyectos.map((proyecto, index) => (
          <div
            key={proyecto.id}
            ref={(el) => setRef(el, index)}
            className="proyecto-seccion"
            id={`proyecto-${proyecto.id}`}
          >
            <div className="proyecto-card">
              <h2>{proyecto.nombre}</h2>
              <p>{proyecto.descripcion}</p>
              <div className="proyecto-imagen">
                <img src={proyecto.imagen} alt={proyecto.nombre} />
              </div>
              <div className="proyecto-tipo">
                {proyecto.tipo === 'pc' && <span>🖥️ Proyecto de PC</span>}
                {proyecto.tipo === 'movil' && <span>📱 Proyecto Móvil</span>}
                {proyecto.tipo === 'ia' && <span>🤖 Proyecto de IA</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProyectosScroll;
