import React, { useEffect, useRef, useCallback } from 'react';
import './ListProjects.css';

const ListProjects: React.FC = () => {
    // Referencia al contenedor para animaciones
    const containerRef = useRef<HTMLDivElement>(null);
    // Referencia para rastrear si estamos en la parte superior
    const isAtTopRef = useRef(true);
    
    // Optimizar función de redirección con useCallback
    const redirectToProjects = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.classList.add('fade-out');
        }
        
        // Reducir el tiempo de espera de 800ms a 400ms
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('returnToProjects'));
        }, 400);
    }, []);
    
    // Optimizar detección de rueda
    useEffect(() => {
        // Forzar scroll al inicio inmediatamente
        window.scrollTo(0, 0);
        
        // Reducir el tiempo de espera para habilitar la detección
        const enableTimer = setTimeout(() => {
            isAtTopRef.current = true;
            
            // Usar pasivo: false solo para eventos de rueda en lugar de scroll
            const handleWheel = (e: WheelEvent) => {
                if (isAtTopRef.current && e.deltaY < 0) {
                    e.preventDefault();
                    redirectToProjects();
                }
            };
            
            // Usar throttle para mejorar el rendimiento de detección de scroll
            let lastScrollTime = 0;
            const throttleTime = 100; // 100ms throttle
            
            const handleScroll = () => {
                const now = Date.now();
                if (now - lastScrollTime > throttleTime) {
                    lastScrollTime = now;
                    isAtTopRef.current = window.scrollY <= 5;
                }
            };
            
            window.addEventListener('wheel', handleWheel, { passive: false });
            window.addEventListener('scroll', handleScroll, { passive: true });
            
            return () => {
                window.removeEventListener('wheel', handleWheel);
                window.removeEventListener('scroll', handleScroll);
            };
        }, 500); // Reducir de 800ms a 500ms
        
        return () => clearTimeout(enableTimer);
    }, [redirectToProjects]);
    
    return (
        <div ref={containerRef} className="list-projects-container">
            <div className="back-to-projects">
                <button 
                    className="button-back" 
                    onClick={redirectToProjects}
                >
                    ↑ Back to Projects
                </button>
            </div>
            
            <div className="list-content">
                <h1>Research</h1>
                <div className="list-scroll-indicator">
                    <p>Scroll up to return to Projects</p>
                </div>
                
                {/* Tu contenido aquí */}
            </div>
        </div>
    );
};

export default React.memo(ListProjects);