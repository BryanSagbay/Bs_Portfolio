import React, { useEffect, useRef, useState } from 'react';
import './Profile.css';
import { motion } from 'framer-motion';

// Iconos
import { FaReact, FaNodeJs, FaPython, FaCode } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { MdVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoMdMail } from "react-icons/io";

interface ProjectDetail {
  name: string;
  details: string[];
}

interface Position {
  title: string;
  period: string;
  fullTime: boolean;
  responsibilities?: string[];
  projects?: ProjectDetail[];
  technologies: string[];
}

interface Experience {
  company: string;
  isActive: boolean;
  positions: Position[];
}

const PortfolioLayout: React.FC = () => {
  const [pulse, setPulse] = useState<boolean>(true);
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);

  const techStackRow1 = [
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'PHP', icon: <span className="tech-icon">PHP</span> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'React', icon: <FaReact /> },
  ];

  const techStackRow2 = [
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'Docker', icon: <span className="tech-icon">🐳</span> },
    { name: 'GraphQL', icon: <span className="tech-icon">▢</span> },
    { name: 'MongoDB', icon: <span className="tech-icon">🍃</span> },
    { name: 'PostgreSQL', icon: <span className="tech-icon">🐘</span> },
    { name: 'Redis', icon: <span className="tech-icon">🔶</span> },
    { name: 'AWS', icon: <span className="tech-icon">☁️</span> },
  ];

  const experiences: Experience[] = [
    {
      company: "Simplamo Enterprise JSC",
      isActive: true,
      positions: [
        {
          title: "Senior Frontend Developer",
          period: "10.2022 - presente",
          fullTime: true,
          responsibilities: [
            "Develop AI Chat and AI Assistant features.",
            "Develop Whiteboards with real-time collaboration.",
            "Build and maintain the Zalo Mini App for Simplamo with seamless integration.",
            "Develop and maintain core features to enhance functionality and user experience.",
            "Ensure UI/UX consistency and adherence to standards.",
            "Implement robust frontend solutions for web and mobile platforms.",
            "Analyze technical capabilities and provide optimal solutions."
          ],
          technologies: ["TypeScript", "Next.js", "React Native", "MobX", "MobX-State-Tree", "Tailwind CSS", "Dify"]
        },
        {
          title: "UI Design Lead",
          period: "10.2022 - presente",
          fullTime: true,
          technologies: ["Zalo Mini App", "Agile", "Teamwork", "Research", "Problem-solving"]
        }
      ]
    },
    {
      company: "Quaric Co., Ltd.",
      isActive: true,
      positions: [
        {
          title: "Software Engineer",
          period: "03.2024 - presente",
          fullTime: false,
          projects: [
            {
              name: "Quaric Website",
              details: [
                "Integrated VNPAY-QR for secure transactions.",
                "Registered the e-commerce site with online.gov.vn for compliance.",
                "Developed online ordering to streamline purchases."
              ]
            },
            {
              name: "ZaDark",
              details: [
                "Build and maintain ZaDark.com with Docusaurus, integrating AdSense.",
                "Develop and maintain the ZaDark extension for Zalo Web on Chrome, Safari, Edge, and Firefox."
              ]
            }
          ],
          technologies: ["Next.js", "Strapi", "Auth0", "VNPAY-QR", "Docker", "NGINX", "Google Cloud", "Docusaurus", "Extension", "UX/UI Design", "UX Writing", "Research", "Project Management"]
        }
      ]
    }
  ];

  useEffect(() => {
    const pulseInterval = setInterval(() => setPulse(prev => !prev), 1500);
    return () => clearInterval(pulseInterval);
  }, []);

  useEffect(() => {
    if (firstRowRef.current && secondRowRef.current) {
      firstRowRef.current.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-50%)' }
      ], { duration: 30000, iterations: Infinity });

      secondRowRef.current.animate([
        { transform: 'translateX(-50%)' },
        { transform: 'translateX(0)' }
      ], { duration: 30000, iterations: Infinity });
    }
  }, []);

  return (
    <motion.div
      className="portfolio-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="left-column" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <motion.div className="profile-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <div className="profile-image">
            <img src="src/assets/perfil.jpeg" alt="Chánh Đại" />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">Bryan Sagbay <span className="verified-badge"><MdVerified /></span></h1>
            <p className="profile-tagline">Creating with code, driven by passion.</p>
          </div>
        </motion.div>

        <motion.div className="profile-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <div className="profile-details">
            <div className="detail-item"><span className="detail-icon"><FaCode /></span><span>Software Engineer, Front Developer & UI Design</span></div>
            <div className="detail-item"><span className="detail-icon"><FaLocationDot /></span><span>Cuenca, Ecuador</span></div>
            <div className="detail-item"><span className="detail-icon"><IoIosCall /></span><span>+593 995154703</span></div>
            <div className="detail-item"><span className="detail-icon"><IoMdMail /></span><span>bryansagbay2001@hotmail.com</span></div>
          </div>
        </motion.div>

        <motion.div className="about-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <h2>About</h2>
          <div className="about-content">
            <p>Hello, World! I am Chánh Đại, a Software Developer & UI/UX Designer passionate about creating high-performance, user-centric software solutions with intuitive and engaging designs.</p>
            <p>With 5+ years of experience, I specialize in building high-quality web and mobile applications using Next.js, React, TypeScript, and modern front-end technologies. Beyond work, I love exploring new technologies and through personal projects.</p>
            <p>One of my key projects, <a href="https://zadark.com" target="_blank" rel="noopener noreferrer">ZaDark</a>, enhances the Zalo experience on PC and Web, surpassing 80,000 downloads on <a href="https://sourceforge.net/projects/zadark/" target="_blank" rel="noopener noreferrer">SourceForge</a> and 10,000 active users on the <a href="https://chrome.google.com/webstore/detail/zadark/zadppenmkkihbhjgcmgdpnkmnkbkoafk" target="_blank" rel="noopener noreferrer">Chrome Web Store</a> since 2022.</p>
          </div>
        </motion.div>

        <motion.div className="stack-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <h2>Stack</h2>
          <div className="tech-stack-container">
            <div className="tech-stack-row" ref={firstRowRef}>
              {[...techStackRow1, ...techStackRow1].map((tech, index) => (
                <div className="tech-item" key={`tech1-${index}`}>{tech.icon}</div>
              ))}
            </div>
            <div className="tech-stack-row reverse" ref={secondRowRef}>
              {[...techStackRow2, ...techStackRow2].map((tech, index) => (
                <div className="tech-item" key={`tech2-${index}`}>{tech.icon}</div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="right-column" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}>
        <h2>Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, expIndex) => (
            <motion.div
              className="experience-item"
              key={`exp-${expIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + expIndex * 0.2 }}
            >
              <div className="company-header">
                <div className="company-logo">🏢</div>
                <h3 className="company-name">{exp.company}</h3>
                {exp.isActive && <div className={`status-indicator active ${pulse ? 'pulse' : ''}`}><div className="sonar-wave"></div></div>}
              </div>

              {exp.positions.map((position, posIndex) => (
                <div className="position-container" key={`pos-${expIndex}-${posIndex}`}>
                  <div className="position-header">
                    <div className="code-icon">{'</>'}</div>
                    <h4 className="position-title">{position.title}</h4>
                    <button className="expand-button"><span className="expand-icon">▼</span></button>
                  </div>

                  <div className="position-details">
                    <div className="position-period">
                      <span className={position.fullTime ? "full-time" : "part-time"}>{position.fullTime ? "Full-time" : "Part-time"}</span>
                      <span className="period-dates">{position.period}</span>
                    </div>

                    {position.responsibilities && (
                      <ul className="responsibilities-list">
                        {position.responsibilities.map((resp, respIndex) => (
                          <li key={`resp-${posIndex}-${respIndex}`}><span className="bullet">•</span><span dangerouslySetInnerHTML={{ __html: resp }}></span></li>
                        ))}
                      </ul>
                    )}

                    {position.projects && position.projects.map((project, projIndex) => (
                      <div className="project-container" key={`proj-${posIndex}-${projIndex}`}>
                        <h5 className="project-title">In-house Project: <span className="project-name">{project.name}</span></h5>
                        <ul className="project-details-list">
                          {project.details.map((detail, detailIndex) => (
                            <li key={`detail-${projIndex}-${detailIndex}`}><span className="bullet">•</span><span dangerouslySetInnerHTML={{ __html: detail }}></span></li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {position.technologies && (
                      <div className="technologies-tags">
                        {position.technologies.map((tech, techIndex) => (
                          <span className="tech-tag" key={`tech-${posIndex}-${techIndex}`}>{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioLayout;