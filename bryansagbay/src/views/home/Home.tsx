import { useEffect, useRef, useState } from 'react';
import './Home.css';
import { FaGithub, FaLinkedin, FaInstagram, FaDownload } from 'react-icons/fa';
import { AiOutlineX } from "react-icons/ai";
import CursorLineal from '../../components/Cursor/CursorLineal';
import { HomeData } from '../../types/Home';
import api from '../../services/Portfolio';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    api.get<HomeData[]>('/home')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setData(res.data[0]);
        }
      })
      .catch((err) => console.error('Error al obtener datos del backend:', err));
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const bg = containerRef.current.querySelector('.background-layer');
      if (!bg) return;

      for (let i = 1; i <= 3; i++) {
        const orb = document.createElement('div');
        orb.className = `orb orb-${i}`;
        orb.style.setProperty('--moveX', `${Math.random() * 60 - 30}px`);
        orb.style.setProperty('--moveY', `${Math.random() * 60 - 30}px`);
        bg.appendChild(orb);
      }

      const grid = document.createElement('div');
      grid.className = 'grid-overlay';
      bg.appendChild(grid);

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

  if (!data) return null; // o un loading spinner

  return (
    <div className="home-container" ref={containerRef}>
      <CursorLineal />
      <div className="background-layer"></div>

      <div className="content-section">
        <div className="title-section">
          <h1>
            <span className="highlight">
              <Typewriter
                words={[data.title.toUpperCase()]} // puedes agregar más palabras aquí
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={120}
                deleteSpeed={60}
                delaySpeed={1500}
              />
            </span>
            <br />
            ENGINEER
          </h1>
          <p className="intro-text">
            Hi! I'm <span className="highlight">{data.name}.</span> {data.description}
          </p>
          <div className="buttons-horizontal">
            <button className="icon-button">
              <a href={data.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="button-icon" />
              </a>
            </button>

            <button className="icon-button">
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="button-icon" />
              </a>
            </button>

            <button className="icon-button">
              <a href={data.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="button-icon" />
              </a>
            </button>

            <button className="icon-button">
              <a href={data.x} target="_blank" rel="noopener noreferrer">
                <AiOutlineX className="button-icon" />
              </a>
            </button>

            <button className="icon-button">
              <a
                href={data.cv}
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
                window.location.href = `mailto:${data.correo}?subject=I want to hire you&body=Hi ${data.name.split(" ")[0]}, I saw your portfolio and I'd like to connect.`;
              }}
            >
              HIRE ME
            </button>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-number">{data.year_experience}+</span>
            <span className="stat-label">Years of Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{data.completed_projects}+</span>
            <span className="stat-label">Completed Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{data.satisfied_clients}+</span>
            <span className="stat-label">Satisfied Clients</span>
          </div>
        </div>
      </div>
    </div>
  );
}
