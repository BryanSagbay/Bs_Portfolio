import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="content-section">
        <div className="title-section">
          <h1>
            <span className="highlight">FRONTEND</span>
            <br />
            DEVELOPER
          </h1>
          <p className="intro-text">
            Hi! I'm <span className="highlight">Bryan</span>. A creative Frontend Developer with 3+ years of
            experience in building high-performance, scalable, and responsive
            web solutions.
          </p>
          <button className="hire-button">
            HIRE ME
          </button>
        </div>
        
        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years of Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">7+</span>
            <span className="stat-label">Completed Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10k+</span>
            <span className="stat-label">Hours Worked</span>
          </div>
        </div>
      </div>
    </div>
  );
}