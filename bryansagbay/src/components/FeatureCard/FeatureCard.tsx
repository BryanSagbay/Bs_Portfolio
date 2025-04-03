import React from 'react';
import './FeatureCard.css';
import { Article } from '../../data/Articulos';

interface FeatureCardProps {
  article: Article;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ article }) => {
  const { title, description, date, readTime } = article;

  return (
    <div className="feature-card">
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
          
          {readTime && (
            <span className="read-time">{readTime}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
