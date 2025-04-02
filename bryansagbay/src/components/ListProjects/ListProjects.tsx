import React, { useEffect, useRef } from 'react';
import './ListProjects.css'; 


interface ListProjectsProps {
    onBackToFeatured: () => void;
  }

const ListProjects: React.FC<ListProjectsProps> = ({ onBackToFeatured }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let lastScroll = 0;

    const handleScroll = () => {
      const current = el.scrollTop;
      if (current < 10 && lastScroll > current) {
        onBackToFeatured();
      }
      lastScroll = current;
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [onBackToFeatured]);

  return (
    <div className="list-projects-container" ref={containerRef}>
      <div className="back-button-wrapper">
        <button className="back-button" onClick={onBackToFeatured}>
          ← Back to featured projects
        </button>
      </div>

      <div className="projects-grid">
        {/* Aquí renderiza tus proyectos en grid */}
        <p>Listado de proyectos resumidos...</p>
      </div>
    </div>
  );
};

export default ListProjects;
