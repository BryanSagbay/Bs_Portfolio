// src/components/ArticleDetail/ArticleDetail.tsx
import React, { useState, useEffect } from 'react';
import { useArticles } from '../ArticleContext/ArticleContext';
import './ArticleDetail.css';

const ArticleDetail: React.FC = () => {
    const { selectedArticle } = useArticles();
    const [animating, setAnimating] = useState(false);
    const [displayedArticle, setDisplayedArticle] = useState(selectedArticle);
  
    useEffect(() => {
      if (selectedArticle && (!displayedArticle || selectedArticle.id !== displayedArticle.id)) {
        setAnimating(true);
        
        // Pequeño retraso para mostrar la animación de salida
        const timer = setTimeout(() => {
          setDisplayedArticle(selectedArticle);
          setAnimating(false);
        }, 300);
        
        return () => clearTimeout(timer);
      }
    }, [selectedArticle, displayedArticle]);
  
    if (!displayedArticle) {
      return <div className="article-detail-empty">Selecciona un artículo</div>;
    }
  
    const { title, description, date, readTime, isFeatured } = displayedArticle;
  
    return (
      <div className={`article-detail ${isFeatured ? 'featured' : ''} ${animating ? 'fade-out' : 'fade-in'}`}>
        {isFeatured && <div className="detail-badge">Featured</div>}
        
        <div className="detail-content">
          <div className="date-container">
            <div className="date-line"></div>
            <span className="date">{date}</span>
          </div>
          
          <h2 className="title">{title}</h2>
          
          <p className="description">{description}</p>
  
          <div className="article-body">
            {/* Aquí iría el contenido completo del artículo */}
            <p>Este es el contenido completo del artículo. Aquí podrías mostrar todo el texto, imágenes, código, etc.</p>
            <p>En un proyecto real, este contenido se cargaría desde una base de datos o un CMS.</p>
            <p>Este artículo proporciona una visión detallada sobre el tema, explorando diversos aspectos y ofreciendo soluciones prácticas para problemas comunes.</p>
            <p>La industria del desarrollo web está en constante evolución, y mantenerse al día con las últimas tendencias y mejores prácticas es esencial para cualquier desarrollador frontend.</p>
          </div>
          
          <div className="card-footer">
            <button className="read-link">
              Read full article
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
  
  export default ArticleDetail;