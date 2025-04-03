import React from 'react';

import './Research.css';
import { Article } from '../../data/Articulos';
import LatestArticles from '../../components/LatestArticles/LatestArticles';
import { ArticleProvider } from '../../components/ArticleContext/ArticleContext';
import ArticleDetail from '../../components/ArticleDetail/ArticleDetail';

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
      title: 'You (probably) don\'t need CSS-in-JS',
      description: 'Vanilla CSS is good now actually. Here\'s a couple nifty techniques for dynamically styling React components with CSS custom properties.',
      date: '30 April 2022',
      readTime: '00:07:53:60',
      isFeatured: true,
    },
    {
      id: '3',
      title: 'Building a design system with React',
      description: 'Creating a cohesive design system can greatly improve development efficiency and user experience consistency.',
      date: '15 May 2022',
      readTime: '00:06:21:44',
      isFeatured: false,
    },
    {
      id: '4',
      title: 'The future of JavaScript frameworks',
      description: 'Exploring the trends and innovations shaping the next generation of JavaScript frameworks.',
      date: '10 June 2022',
      readTime: '00:08:15:22',
      isFeatured: false,
    },
    {
      id: '5',
      title: 'Optimizing React performance',
      description: 'Advanced techniques to improve the performance of your React applications.',
      date: '25 June 2022',
      readTime: '00:09:33:10',
      isFeatured: false,
    },
    {
      id: '6',
      isComingSoon: true,
      title: 'Understanding React Server Components',
      description: '',
      date: '',
      readTime: '00:00:00:00',
    }
  ];

  return (
    <ArticleProvider initialArticles={articles}>
      <div className="research-container">
        <div className="grid-layout">
          <div className="articles-column">
            <LatestArticles />
          </div>
          <div className="detail-column">
            <div className="detail-column-inner">
              <ArticleDetail />
            </div>
          </div>
        </div>
      </div>
    </ArticleProvider>
  );
};

export default Research;