import React from 'react';
import { Article } from '../../data/Articulos';
import './ArticleCard.css';
import { motion } from 'framer-motion';
interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { title, description, date, readTime, isComingSoon } = article;

  return (
    <motion.div
      className="article-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="date-container">
        <div className="date-line"></div>
        <span className="date">{isComingSoon ? 'Coming soon...' : date}</span>
      </div>
      
      <h2 className="title">{title}</h2>
      
      {!isComingSoon && description && (
        <p className="description">{description}</p>
      )}
      
      <div className="card-footer">
        <button className="read-link">
          {isComingSoon ? 'Read more' : 'Read article'}
          <span className="arrow">›</span>
        </button>
        
        {readTime && (
          <span className="read-time">{readTime}</span>
        )}
      </div>
    </motion.div>
  );
};

export default ArticleCard;