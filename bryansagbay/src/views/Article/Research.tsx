import React, { useState } from 'react';

import './Research.css';
import { Article } from '../../data/Articulos';
import LatestArticles from '../../components/LatestArticles/LatestArticles';
import FeatureCard from '../../components/FeatureCard/FeatureCard';

const Research: React.FC = () => {
  const articles: Article[] = [
    {
      id: '1',
      title: 'Hello world: how I built this site',
      description: 'I originally built this portfolio site back in 2018...',
      date: '20 April 2022',
      readTime: '00:05:03:99',
      isFeatured: false,
    },
    {
      id: '2',
      isComingSoon: true,
      title: 'Coming soon article',
      description: '',
      date: '',
      readTime: '00:00:00:00',
    },
    {
      id: '3',
      isComingSoon: true,
      title: 'Another coming soon',
      description: '',
      date: '',
    },
  ];

  const [selectedArticle, setSelectedArticle] = useState<Article>(articles[0]);

  const handleArticleSelect = (article: Article) => {
    if (!article.isComingSoon) {
      setSelectedArticle(article);
    }
  };

  return (
    <div className="research-container">
      <div className="grid-layout">
        <div className="articles-column">
          <LatestArticles articles={articles} onArticleSelect={handleArticleSelect} />
        </div>
        <div className="featured-column">
          <FeatureCard article={selectedArticle} />
        </div>
      </div>
    </div>
  );
};

export default Research;