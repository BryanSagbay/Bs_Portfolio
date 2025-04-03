import React from 'react';

import './LatestArticles.css';
import { Article } from '../../data/Articulos';
import ArticleCard from '../ArticleCard/ArticleCard';

interface LatestArticlesProps {
  articles: Article[];
  onArticleSelect: (article: Article) => void;
}

const LatestArticles: React.FC<LatestArticlesProps> = ({ articles, onArticleSelect }) => {
  return (
    <div className="latest-articles">
      <h1 className="section-title">Latest articles</h1>
      <div className="articles-container">
        {articles.map((article) => (
          <div 
            key={article.id} 
            onClick={() => onArticleSelect(article)} 
            className={`article-wrapper ${article.isComingSoon ? 'disabled' : ''}`}
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;