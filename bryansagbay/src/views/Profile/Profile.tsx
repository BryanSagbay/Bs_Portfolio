import React, { useEffect, useRef } from 'react';
import './Profile.css';

import { FaReact, FaJs, FaHtml5, FaCss3, FaNodeJs, FaPython, FaGithub, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiMobx, SiTailwindcss, SiFirebase } from 'react-icons/si';

const Profile: React.FC = () => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateIcons = () => {
      if (topRowRef.current) {
        topRowRef.current.style.transform = 'translateX(0)';
        topRowRef.current.animate(
          [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-50%)' }
          ],
          {
            duration: 15000,
            iterations: Infinity
          }
        );
      }

      if (bottomRowRef.current) {
        bottomRowRef.current.style.transform = 'translateX(-50%)';
        bottomRowRef.current.animate(
          [
            { transform: 'translateX(-50%)' },
            { transform: 'translateX(0)' }
          ],
          {
            duration: 15000,
            iterations: Infinity
          }
        );
      }
    };

    animateIcons();
  }, []);

  // Duplicar íconos para crear efecto infinito
  const topRowIcons = [
    <FaReact color="#61DAFB" size={32} />,
    <SiTypescript color="#3178C6" size={32} />,
    <FaJs color="#F7DF1E" size={32} />,
    <FaHtml5 color="#E34F26" size={32} />,
    <FaCss3 color="#1572B6" size={32} />,
    <SiNextdotjs color="#000000" size={32} />,
    <FaNodeJs color="#339933" size={32} />,
    <FaPython color="#3776AB" size={32} />
  ];

  const bottomRowIcons = [
    <SiMobx color="#FF9955" size={32} />,
    <SiTailwindcss color="#06B6D4" size={32} />,
    <FaGithub color="#181717" size={32} />,
    <FaDocker color="#2496ED" size={32} />,
    <SiFirebase color="#FFCA28" size={32} />
  ];

  return (
    <div className="profile-container">
      {/* Columna izquierda */}
      <div className="left-column">
        {/* Perfil */}
        <div className="profile-header">
          <div className="profile-image">
            <img src="/path-to-your-profile-image.jpg" alt="Profile" />
          </div>
          <div className="profile-title">
            <h1>Tu Nombre</h1>
            <div className="subtitle">Creating with code, driven by passion.</div>
            <div className="job-title">
              <span className="code-tag">&lt;/&gt;</span> Senior Frontend Developer & UI Design Lead
            </div>
            <div className="location">Ho Chi Minh City, Viet Nam</div>
            <div className="contact">
              <div>email@example.com</div>
              <div>www.yourdomain.com</div>
            </div>
          </div>
        </div>

        {/* Stack */}
        <div className="stack-section">
          <h2>Stack</h2>
          <div className="scrolling-icons-container">
            <div className="scrolling-row" ref={topRowRef}>
              {[...topRowIcons, ...topRowIcons]}
            </div>
            <div className="scrolling-row reverse" ref={bottomRowRef}>
              {[...bottomRowIcons, ...bottomRowIcons, ...bottomRowIcons]}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="about-section">
          <h2>About</h2>
          <p>
            Hello, World! I am a Software Developer & UI/UX Designer passionate about 
            creating high-performance, user-centric software solutions with intuitive and 
            engaging designs.
          </p>
          <p>
            With 5+ years of experience, I specialize in building high-quality web and mobile 
            applications using Next.js, React, TypeScript, and modern front-end technologies. 
            Beyond work, I love exploring new technologies and turning ideas into reality 
            through personal projects.
          </p>
          <p>Let's connect and collaborate!</p>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="right-column">
        <h2 className="experience-title">Experience</h2>
        
        {/* Experiencia 1 */}
        <div className="experience-item">
          <div className="company-header">
            <div className="company-logo">🍊</div>
            <div className="company-name">Company Name</div>
            <div className="status-indicator active"></div>
          </div>
          
          <div className="job-details">
            <div className="job-header">
              <span className="code-tag">&lt;/&gt;</span>
              <h3>Senior Frontend Developer</h3>
              <button className="expand-btn">↓</button>
            </div>
            <div className="job-period">Full-time · 10.2022 - present</div>
            
            <ul className="responsibilities">
              <li>Develop AI Chat and AI Assistant features.</li>
              <li>Develop Whiteboards with real-time collaboration.</li>
              <li>Build and maintain the Mini App for seamless integration.</li>
              <li>Develop and maintain core features to enhance functionality and user experience.</li>
              <li>Ensure UI/UX consistency and adherence to standards.</li>
            </ul>
            
            <div className="tech-tags">
              <span>TypeScript</span>
              <span>Next.js</span>
              <span>React Native</span>
              <span>MobX</span>
              <span>Tailwind CSS</span>
            </div>
          </div>
        </div>
        
        {/* Experiencia 2 */}
        <div className="experience-item">
          <div className="company-header">
            <div className="company-logo">⚙️</div>
            <div className="company-name">Another Company</div>
            <div className="status-indicator active"></div>
          </div>
          
          <div className="job-details">
            <div className="job-header">
              <span className="code-tag">&lt;/&gt;</span>
              <h3>Software Engineer</h3>
              <button className="expand-btn">↓</button>
            </div>
            <div className="job-period">Part-time · 03.2024 - present</div>
            
            <ul className="responsibilities">
              <li>Integrated payment solutions for secure transactions.</li>
              <li>Registered the e-commerce site with government regulations.</li>
              <li>Developed online ordering to streamline purchases.</li>
            </ul>
            
            <div className="tech-tags">
              <span>Next.js</span>
              <span>Docker</span>
              <span>NGINX</span>
              <span>Cloud</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;