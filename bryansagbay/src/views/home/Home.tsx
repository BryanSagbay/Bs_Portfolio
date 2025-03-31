import { useEffect, useRef } from 'react';
import './Home.css';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDownload } from 'react-icons/fa';
import CursorLineal from '../../components/Cursor/CursorLineal';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const bg = containerRef.current.querySelector('.background-layer');
      if (!bg) return;

      // Orbs
      for (let i = 1; i <= 3; i++) {
        const orb = document.createElement('div');
        orb.className = `orb orb-${i}`;
        orb.style.setProperty('--moveX', `${Math.random() * 60 - 30}px`);
        orb.style.setProperty('--moveY', `${Math.random() * 60 - 30}px`);
        bg.appendChild(orb);
      }

      // Grid
      const grid = document.createElement('div');
      grid.className = 'grid-overlay';
      bg.appendChild(grid);

      // Particles
      const particleWrapper = document.createElement('div');
      particleWrapper.className = 'particle-background';
      for (let i = 0; i < 80; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.setProperty('--moveX', `${Math.random() * 200 - 100}px`);
        p.style.setProperty('--moveY', `${Math.random() * 200 - 100}px`);
        p.style.animationDuration = `${5 + Math.random() * 15}s`;
        p.style.animationDelay = `-${Math.random() * 5}s`;
        particleWrapper.appendChild(p);
      }
      bg.appendChild(particleWrapper);
    }
  }, []);

  return (
    
    <div className="home-container" ref={containerRef}>
      <CursorLineal />
      <div className="background-layer"></div>

      <div className="content-section">
        <div className="title-section">
        <h1>
  <span className="highlight typewriter">SOFTWARE</span>
  <br />
  ENGINEER
</h1>
          <p className="intro-text">
            Hi! I'm <span className="highlight">Bryan Sagbay</span>. Software Engineer with +1 year of 
            experience in web development, mobile applications and artificial intelligence integration, 
            offering high performance and scalable solutions.
          </p>
          <div className="buttons-horizontal">
  <button className="icon-button">
    <a href="https://github.com/BryanSagbay" target="_blank" rel="noopener noreferrer">
    <FaGithub className="button-icon" />
    </a>
  </button>

  <button className="icon-button">
    <a href="https://www.linkedin.com/in/bryan-sagbay-1b9912267/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin className="button-icon" />
    </a> 
  </button>

  <button className="icon-button">
    <a href="https://www.instagram.com/brian.sagbay" target="_blank" rel="noopener noreferrer">
      <FaInstagram className="button-icon" />
    </a>
  </button>

  <button className="icon-button">
    <a href="https://x.com/sagbay15130" target="_blank" rel="noopener noreferrer">
      <FaTwitter className="button-icon" />
    </a>
  </button>

  <button className="icon-button">
  <a 
    href="src/template/cv.pdf" 
    target="_blank" 
    rel="noopener noreferrer" 
    download="Bryan_Sagbay_CV.pdf"
  >
    <FaDownload className="button-icon" />
  </a>
  </button>

  <button 
  className="hire-button"
  onClick={() => {
    window.location.href = "mailto:bryansagbay2001@gmail.com?subject=I want to hire you&body=Hi Bryan, I saw your portfolio and I'd like to connect.";
  }}
>
  HIRE ME
</button>

</div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-number">1+</span>
            <span className="stat-label">Years of Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">7+</span>
            <span className="stat-label">Completed Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">21+</span>
            <span className="stat-label">Satisfied Clients</span>
          </div>
        </div>
      </div>
    </div>
  );
}
