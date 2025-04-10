import React from 'react';
import { Article } from '../../data/Articulos';
import './ArticleCard.css';

interface ArticleCardProps {
  article: Article;
  isSelected: boolean;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, isSelected, onClick }) => {
  const { title, description, date, readTime, isComingSoon } = article;

  return (
    <div 
      className={`article-card ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      <div className="date-container">
        <div className="date-line"></div>
        <span className="date">{isComingSoon ? 'Coming soon...' : date}</span>
      </div>
      
      <h2 className="title">{title || 'Artículo sin título'}</h2>
      
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
    </div>
  );
};

export default ArticleCard;