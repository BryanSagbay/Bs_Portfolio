import React, { useState, useEffect } from 'react';
import "./NotFound.css"

const NotFound404: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Animación de entrada
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Movimiento del ratón
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Clases de animación CSS
  const visibleClass = isVisible ? 'opacity-100' : 'opacity-0';
  const translateYUp = isVisible ? 'translate-y-0' : '-translate-y-8';
  const translateYDown = isVisible ? 'translate-y-0' : 'translate-y-8';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Fondo con partículas */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(15)].map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-blue-500 opacity-10"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-${index} ${Math.random() * 10 + 10}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Contenedor principal */}
      <div 
        className="relative z-10 text-center max-w-lg mx-auto p-8"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        {/* 404 Número */}
        <h1 
          className={`text-9xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-700 ${visibleClass} ${translateYUp}`}
          style={{ textShadow: '0 10px 30px rgba(79, 70, 229, 0.3)' }}
        >
          404
        </h1>
        
        {/* Título */}
        <h2 
          className={`text-3xl font-bold mb-4 transition-all duration-700 delay-100 ${visibleClass} ${translateYDown}`}
        >
          Página no encontrada
        </h2>
        
        {/* Descripción */}
        <p 
          className={`text-gray-400 mb-8 transition-all duration-700 delay-200 ${visibleClass} ${translateYDown}`}
        >
          La página que estás buscando parece haberse perdido en el espacio digital.
        </p>
        
        {/* Botón */}
        <button 
          className={`relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 delay-300 ${visibleClass} ${translateYDown}`}
        >
          <span className="relative z-10">Volver al inicio</span>
          <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
        </button>
      </div>

      {/* Keyframes para animar las partículas */}
      <style dangerouslySetInnerHTML={{ __html: `
        ${[...Array(15)].map((_, index) => `
          @keyframes float-${index} {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(${-20 - Math.random() * 30}px) scale(1.05); }
          }
        `).join('')}
      `}} />
    </div>
  );
};

export default NotFound404;