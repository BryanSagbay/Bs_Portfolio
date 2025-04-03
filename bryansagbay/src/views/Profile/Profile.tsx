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
    const animateInfiniteScroll = (element: HTMLDivElement | null, direction: 'left' | 'right') => {
      if (!element) return;
      
      const originalContent = element.innerHTML;
      element.innerHTML = originalContent + originalContent;
      
      const contentWidth = element.scrollWidth / 2;
      
      const keyframes = [
        { transform: 'translateX(0)' },
        { transform: `translateX(${direction === 'left' ? -contentWidth : contentWidth}px)` }
      ];
      
      const options = {
        duration: 20000,
        iterations: Infinity,
        easing: 'linear'
      };
      
      const animation = element.animate(keyframes, options);
      
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          animation.pause();
        } else {
          animation.play();
        }
      });
      
      return () => {
        if (animation) {
          animation.cancel();
        }
      };
    };

    // Iniciar las animaciones para ambas filas
    const topRowCleanup = animateInfiniteScroll(topRowRef.current, 'left');
    const bottomRowCleanup = animateInfiniteScroll(bottomRowRef.current, 'right');
    
    // Función de limpieza
    return () => {
      if (topRowCleanup) topRowCleanup();
      if (bottomRowCleanup) bottomRowCleanup();
    };
  }, []);

  const topRowIcons = [
    <FaReact key="react" color="#61DAFB" size={32} />, 
    <SiTypescript key="typescript" color="#3178C6" size={32} />,
    <FaJs key="javascript" color="#F7DF1E" size={32} />, 
    <FaHtml5 key="html" color="#E34F26" size={32} />,
    <FaCss3 key="css" color="#1572B6" size={32} />, 
    <SiNextdotjs key="nextjs" color="#000000" size={32} />,
    <FaNodeJs key="nodejs" color="#339933" size={32} />, 
    <FaPython key="python" color="#3776AB" size={32} />
  ];

  const bottomRowIcons = [
    <SiMobx key="mobx" color="#FF9955" size={32} />, 
    <SiTailwindcss key="tailwind" color="#06B6D4" size={32} />,
    <FaGithub key="github" color="#181717" size={32} />, 
    <FaDocker key="docker" color="#2496ED" size={32} />,
    <SiFirebase key="firebase" color="#FFCA28" size={32} />
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
                  {topRowIcons.map((icon, i) => (
                    <span key={`top-${i}`}>{icon}</span>
                  ))}
                </div>
                <div className="scrolling-row reverse" ref={bottomRowRef}>
                  {bottomRowIcons.map((icon, i) => (
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
                <div className="company-name">Simplamo Enterprise JSC</div>
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
                  <li>Build and maintain the Zalo Mini App for seamless integration.</li>
                  <li>Develop and maintain core features to enhance functionality and user experience.</li>
                  <li>Ensure UI/UX consistency and adherence to standards.</li>
                  <li>Implement robust frontend solutions for web and mobile platforms.</li>
                  <li>Analyze technical capabilities and provide optimal solutions.</li>
                </ul>
                <div className="tech-tags">
                  <span>TypeScript</span>
                  <span>Next.js</span>
                  <span>React Native</span>
                  <span>MobX</span>
                  <span>MobX-State-Tree</span>
                  <span>Tailwind CSS</span>
                  <span>Dify</span>
                  <span>Zalo Mini App</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="experience-item" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div className="company-header">
                <div className="company-logo">⚙️</div>
                <div className="company-name">Simplamo Enterprise JSC</div>
                <div className="status-indicator active"></div>
              </div>
              <div className="job-details">
                <div className="job-header">
                  <span className="code-tag">✏️</span>
                  <h3>UI Design Lead</h3>
                </div>
                <div className="job-period">Full-time · 10.2022 - present</div>
                <ul className="responsibilities">
                  <li>Lead UI/UX design initiatives across all products.</li>
                  <li>Create design systems for consistent user experience.</li>
                  <li>Collaborate with development teams to implement designs.</li>
                  <li>Conduct user research and usability testing.</li>
                </ul>
                <div className="tech-tags">
                  <span>Figma</span>
                  <span>UI Design</span>
                  <span>Design Systems</span>
                  <span>Prototyping</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="experience-item" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <div className="company-header">
                <div className="company-logo">💼</div>
                <div className="company-name">Previous Company</div>
                <div className="status-indicator"></div>
              </div>
              <div className="job-details">
                <div className="job-header">
                  <span className="code-tag">&lt;/&gt;</span>
                  <h3>Frontend Developer</h3>
                </div>
                <div className="job-period">Full-time · 01.2020 - 09.2022</div>
                <ul className="responsibilities">
                  <li>Developed responsive web applications using React and TypeScript.</li>
                  <li>Implemented state management solutions using Redux and MobX.</li>
                  <li>Collaborated with backend developers to integrate APIs.</li>
                  <li>Improved application performance and load times.</li>
                </ul>
                <div className="tech-tags">
                  <span>React</span>
                  <span>JavaScript</span>
                  <span>Redux</span>
                  <span>CSS/SCSS</span>
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