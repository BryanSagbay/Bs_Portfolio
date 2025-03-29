import React, { ReactNode } from 'react';
import './ContentArea.css';

interface ContentAreaProps {
  content: ReactNode;
}

const ContentArea: React.FC<ContentAreaProps> = ({ content }) => {
  return (
    <main className="content-area">
      {content}
    </main>
  );
};

export default ContentArea;