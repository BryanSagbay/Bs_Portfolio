import React from 'react';

import './LatestArticles.css';
import { Article } from '../../data/Articulos';
import ArticleCard from '../ArticleCard/ArticleCard';

interface LatestArticlesProps {
  articles: Article[];
}

const LatestArticles: React.FC<LatestArticlesProps> = ({ articles }) => {
  return (
    <div className="latest-articles">
      <h1 className="section-title">Latest articles</h1>
      <div className="articles-container">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;