// CardFlip.js
import React, { useState } from 'react';
import './CardFlip.css';

const CardFlip = ({ frontContent, backContent }) => {
  const [flipped, setFlipped] = useState(true);

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="card-container" onClick={toggleFlip}>
      <div className={`card ${flipped ? 'flipped' : ''}`}>
        <div className="card-face card-front">{frontContent}</div>
        <div className="card-face card-back">{backContent}</div>
      </div>
    </div>
  );
};

export default CardFlip;
