interface ListProjectsProps {
    onBack: () => void;
  }
  
  const ListProjects: React.FC<ListProjectsProps> = ({ onBack }) => {
    return (
      <div className="list-projects">
        <div className="top-return-button">
          <button className="boton-volver" onClick={onBack}>
            ← Featured Projects
          </button>
        </div>
  
        <h1>Todos los proyectos</h1>
  
        {/* Aquí tu listado resumido */}
        <div className="projects-grid">
          {/* Por ejemplo: */}
          {/* proyectos.map(p => (...) */}
        </div>
      </div>
    );
  };
  
  export default ListProjects;