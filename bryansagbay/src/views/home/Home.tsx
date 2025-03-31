import { useEffect, useRef } from 'react';
import './Home.css';

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
          <button className="hire-button">HIRE ME</button>
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
