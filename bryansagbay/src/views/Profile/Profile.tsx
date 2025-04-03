import './Profile.css';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaReact, FaJs, FaHtml5, FaCss3, FaNodeJs, FaPython, FaGithub, FaDocker
} from 'react-icons/fa';
import {
  SiTypescript, SiNextdotjs, SiMobx, SiTailwindcss, SiFirebase
} from 'react-icons/si';

const Profile: React.FC = () => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateRow = (row: HTMLDivElement | null, direction: 'left' | 'right') => {
      if (!row) return;
      const distance = row.scrollWidth / 2;
      row.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(${direction === 'left' ? -distance : distance}px)` }
        ],
        {
          duration: 20000,
          iterations: Infinity,
          easing: 'linear'
        }
      );
    };

    animateRow(topRowRef.current, 'left');
    animateRow(bottomRowRef.current, 'right');
  }, []);

  const topRowIcons = [
    <FaReact color="#61DAFB" size={32} />, <SiTypescript color="#3178C6" size={32} />,
    <FaJs color="#F7DF1E" size={32} />, <FaHtml5 color="#E34F26" size={32} />,
    <FaCss3 color="#1572B6" size={32} />, <SiNextdotjs color="#000000" size={32} />,
    <FaNodeJs color="#339933" size={32} />, <FaPython color="#3776AB" size={32} />
  ];

  const bottomRowIcons = [
    <SiMobx color="#FF9955" size={32} />, <SiTailwindcss color="#06B6D4" size={32} />,
    <FaGithub color="#181717" size={32} />, <FaDocker color="#2496ED" size={32} />,
    <SiFirebase color="#FFCA28" size={32} />
  ];

  return (
    <div className="research-container">
      <div className="grid-layout">
        <div className="detail-column">
          <div className="detail-column-inner">
            <motion.div className="profile-header" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
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
            </motion.div>

            <motion.div className="about-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>
              <h2>About</h2>
              <p>Hello, World! I am a Software Developer & UI/UX Designer passionate about creating high-performance, user-centric software solutions with intuitive and engaging designs.</p>
              <p>With 5+ years of experience, I specialize in building high-quality web and mobile applications using Next.js, React, TypeScript, and modern front-end technologies. Beyond work, I love exploring new technologies and turning ideas into reality through personal projects.</p>
              <p>Let's connect and collaborate!</p>
            </motion.div>

            <motion.div
              className="stack-section"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2>Stack</h2>
              <div className="scrolling-icons-container">
                <div className="scrolling-row" ref={topRowRef}>
                  {[...topRowIcons, ...topRowIcons].map((icon, i) => (
                    <span key={`top-${i}`}>{icon}</span>
                  ))}
                </div>
                <div className="scrolling-row reverse" ref={bottomRowRef}>
                  {[...bottomRowIcons, ...bottomRowIcons, ...bottomRowIcons].map((icon, i) => (
                    <span key={`bottom-${i}`}>{icon}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="articles-column">
          <h2 className="experience-title sticky-title">Experience</h2>
          <div className="articles-scrollable">
            <motion.div className="experience-item" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="company-header">
                <div className="company-logo">🍊</div>
                <div className="company-name">Company Name</div>
                <div className="status-indicator active"></div>
              </div>
              <div className="job-details">
                <div className="job-header">
                  <span className="code-tag">&lt;/&gt;</span>
                  <h3>Senior Frontend Developer</h3>
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
            </motion.div>

            <motion.div className="experience-item" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div className="company-header">
                <div className="company-logo">⚙️</div>
                <div className="company-name">Another Company</div>
                <div className="status-indicator active"></div>
              </div>
              <div className="job-details">
                <div className="job-header">
                  <span className="code-tag">&lt;/&gt;</span>
                  <h3>Software Engineer</h3>
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
            </motion.div>
            <motion.div className="experience-item" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div className="company-header">
                <div className="company-logo">⚙️</div>
                <div className="company-name">Another Company</div>
                <div className="status-indicator active"></div>
              </div>
              <div className="job-details">
                <div className="job-header">
                  <span className="code-tag">&lt;/&gt;</span>
                  <h3>Software Engineer</h3>
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
