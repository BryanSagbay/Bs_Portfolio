import React, { useEffect, useRef, useState } from 'react';
import './Profile.css';
import { motion, AnimatePresence } from 'framer-motion';

// Iconos
import { FaReact, FaNodeJs, FaPython, FaCode, FaAngular, FaJava, FaDocker, FaBootstrap, FaHtml5, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiTailwindcss, SiPhp, SiMongodb } from 'react-icons/si';
import { MdVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoMdMail } from "react-icons/io";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { VscAzure } from "react-icons/vsc";
import { FcLinux } from "react-icons/fc";

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
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);

  const taglines = [
    "Software Engineer.",
    "Front End Developer.",
    "Creating with code, driven by passion."
  ];
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  const techStackRow1 = [
    { name: 'Java', icon: <FaJava size={28} color="#007396" /> },
    { name: 'TypeScript', icon: <SiTypescript size={28} color="#3178C6" /> },
    { name: 'JavaScript', icon: <SiJavascript size={28} color="#F7DF1E" /> },
    { name: 'Python', icon: <FaPython size={28} color="#3776AB" /> },
    { name: 'Node.js', icon: <FaNodeJs size={28} color="#339933" /> },
    { name: 'PHP', icon: <SiPhp size={28} color="#777BB4" /> },
    { name: 'React', icon: <FaReact size={28} color="#61DAFB" /> },
    { name: 'Angular', icon: <FaAngular size={28} color="#DD0031" /> }
  ];

  const techStackRow2 = [
    { name: 'Git', icon: <FaGithub size={28} color="#F05032" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={28} color="#38BDF8" /> },
    { name: 'Bootstrap', icon: <FaBootstrap size={28} color="#7952B3" /> },
    { name: 'HTML5', icon: <FaHtml5 size={28} color="#E34F26" /> },
    { name: 'Docker', icon: <FaDocker size={28} color="#2496ED" /> },
    { name: 'MongoDB', icon: <SiMongodb size={28} color="#47A248" /> },
    { name: 'PostgreSQL', icon: <BiLogoPostgresql size={28} color="#336791" /> },
    { name: 'Redis', icon: <DiRedis size={28} color="#DC382D" /> },
    { name: 'Linux', icon: <FcLinux size={28} /> },
    { name: 'Azure', icon: <VscAzure size={28} color="#2496ED" /> }
  ];

  const experiences: Experience[] = [
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

  // Nuevas variantes de animación para framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const listItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className="portfolio-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="left-column"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="profile-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div
            className="profile-image"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src="src/assets/perfil.jpeg" alt="Bryan Sagbay" />
          </motion.div>
          <div className="profile-info">
            <h1 className="profile-name">
              Bryan Sagbay
              <motion.span
                className="verified-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, delay: 0.8 }}
              >
                <MdVerified size={24} />
              </motion.span>
            </h1>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTagline}
                className="profile-tagline"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {taglines[currentTagline]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="profile-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="profile-details"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="detail-item" variants={itemVariants} whileHover={{ x: 5 }}>
              <span className="detail-icon"><FaCode /></span>
              <span>Software Engineer, Front Developer & UI Design</span>
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants} whileHover={{ x: 5 }}>
              <span className="detail-icon"><FaLocationDot /></span>
              <span>Cuenca, Ecuador</span>
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants} whileHover={{ x: 5 }}>
              <span className="detail-icon"><IoIosCall /></span>
              <span>+593 995154703</span>
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants} whileHover={{ x: 5 }}>
              <span className="detail-icon"><IoMdMail /></span>
              <span>bryansagbay2001@hotmail.com</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="stack-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Stack</h2>
          <div className="tech-stack-container">
            <div className="tech-stack-row" ref={firstRowRef}>
              {[...techStackRow1, ...techStackRow1].map((tech, index) => (
                <motion.div
                  className="tech-item"
                  key={`tech1-${index}`}
                  whileHover={{
                    y: -8,
                    scale: 1.1,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {tech.icon}
                </motion.div>
              ))}
            </div>
            <div className="tech-stack-row reverse" ref={secondRowRef}>
              {[...techStackRow2, ...techStackRow2].map((tech, index) => (
                <motion.div
                  className="tech-item"
                  key={`tech2-${index}`}
                  whileHover={{
                    y: -8,
                    scale: 1.1,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {tech.icon}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="right-column"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="about-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2>About</h2>
          <motion.div
            className="about-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={itemVariants}>
              Hello, World! I am Chánh Đại, a Software Developer & UI/UX Designer passionate about creating high-performance, user-centric software solutions with intuitive and engaging designs.
            </motion.p>
            <motion.p variants={itemVariants}>
              With 5+ years of experience, I specialize in building high-quality web and mobile applications using Next.js, React, TypeScript, and modern front-end technologies. Beyond work, I love exploring new technologies and through personal projects.
            </motion.p>
            <motion.p variants={itemVariants}>
              One of my key projects, <a href="https://zadark.com" target="_blank" rel="noopener noreferrer">ZaDark</a>, enhances the Zalo experience on PC and Web, surpassing 80,000 downloads on <a href="https://sourceforge.net/projects/zadark/" target="_blank" rel="noopener noreferrer">SourceForge</a> and 10,000 active users on the <a href="https://chrome.google.com/webstore/detail/zadark/zadppenmkkihbhjgcmgdpnkmnkbkoafk" target="_blank" rel="noopener noreferrer">Chrome Web Store</a> since 2022.
            </motion.p>
          </motion.div>
        </motion.div>
        
        <h2>Experience</h2>

        

        {experiences.map((exp, expIndex) => (
          <motion.div
            className="experience-item"
            key={`exp-${expIndex}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.5,
              delay: expIndex * 0.2,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ y: -5 }}
          >
            <h3 className="company-name">{exp.company}</h3>

            {exp.positions.map((position, posIndex) => (
              <motion.div
                className="position-container"
                key={`pos-${expIndex}-${posIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + posIndex * 0.15 }}
              >
                <div className="position-header">
                  <h4 className="position-title">{position.title}</h4>
                </div>

                <div className="position-details">
                  <div className="position-period">
                    <span className={position.fullTime ? "full-time" : "part-time"}>
                      {position.fullTime ? "Full-time" : "Part-time"}
                    </span>
                    <span className="period-dates">{position.period}</span>
                  </div>

                  {position.projects && position.projects.map((project, projIndex) => (
                    <motion.div
                      className="project-container"
                      key={`proj-${posIndex}-${projIndex}`}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + projIndex * 0.1 }}
                      whileHover={{ x: 5, backgroundColor: "#edf2fb" }}
                    >
                      <h5 className="project-title">
                        Project: <span className="project-name">{project.name}</span>
                      </h5>
                      <motion.ul
                        className="project-details-list"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {project.details.map((detail, detailIndex) => (
                          <motion.li
                            key={`detail-${projIndex}-${detailIndex}`}
                            variants={listItemVariants}
                            whileHover={{ x: 3, color: "#000" }}
                          >
                            <span className="bullet">•</span>
                            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                          </motion.li>
                        ))}
                      </motion.ul>
                      {position.technologies && (
                    <motion.div
                      className="technologies-tags"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {position.technologies.map((tech, techIndex) => (
                        <motion.span
                          className="tech-tag"
                          key={`tech-${posIndex}-${techIndex}`}
                          whileHover={{
                            y: -5,
                            backgroundColor: "var(--primary-color)",
                            color: "white"
                          }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                    </motion.div>
                  ))}

                </div>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PortfolioLayout;