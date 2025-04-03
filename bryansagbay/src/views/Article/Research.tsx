import React from 'react';

import './Research.css';
import { Article } from '../../data/Articulos';
import LatestArticles from '../../components/LatestArticles/LatestArticles';
import FeatureCard from '../../components/FeatureCard/FeatureCard';

const Research: React.FC = () => {
  const articles: Article[] = [
    {
      id: '1',
      title: 'Hello world: how I built this site',
      description: 'I originally built this portfolio site back in 2018, and since then it\'s evolved quite a bit. Recently I migrated from Create React App to Next.js and made some major upgrades in the process.',
      date: '20 April 2022',
      readTime: '00:05:03:99',
      isFeatured: false,
    },
    {
      id: '2',
      isComingSoon: true,
      title: '',
      description: '',
      date: '',
      readTime: '00:00:00:00',
    },
    {
      id: '3',
      isComingSoon: true,
      title: '',
      description: '',
      date: '',
    }
  ];

  const featuredArticle: Article = {
    id: 'featured-1',
    title: 'You (probably) don\'t need CSS-in-JS',
    description: 'Vanilla CSS is good now actually. Here\'s a couple nifty techniques for dynamically styling React components with CSS custom properties.',
    date: '30 April 2022',
    readTime: '00:07:53:60',
    isFeatured: true,
  };

  return (
    <div className="research-container">
      <div className="grid-layout">
        <div className="articles-column">
          <LatestArticles articles={articles} />
        </div>
        <div className="featured-column">
          <FeatureCard article={featuredArticle} />
        </div>
      </div>
    </div>
  );
};

export default Research;
