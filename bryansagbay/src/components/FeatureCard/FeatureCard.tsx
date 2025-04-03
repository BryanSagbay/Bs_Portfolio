import React from 'react';
import './FeatureCard.css';
import { Article } from '../../data/Articulos';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

interface FeatureCardProps {
  article: Article;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ article }) => {
  const { title, description, date, readTime } = article;

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
            <button className="read-link">
              Read article
              <span className="arrow">›</span>
            </button>
            {readTime && <span className="read-time">{readTime}</span>}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeatureCard;