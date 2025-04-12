import React from 'react';
import './FeatureCard.css';
import { ResearchArticle } from '../../types/Research';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureCardProps {
  article: ResearchArticle;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ article }) => {
  const { title, description, date, timeread, link } = article;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={article.id}
        className="feature-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="feature-badge">Featured</div>
        <div className="feature-content">
          <div className="date-container">
            <div className="date-line"></div>
            <span className="date">{date}</span>
          </div>
          <h2 className="title">{title}</h2>
          <p className="description">{description}</p>
          <div className="card-footer">
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="read-link">
                Read article <span className="arrow">›</span>
              </a>
            ) : (
              <button className="read-link" disabled>
                Read article <span className="arrow">›</span>
              </button>
            )}
            {timeread && <span className="read-time">{timeread}</span>}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeatureCard;
