import React from 'react';
import Card from '../card/Card';
import './Cards.css';

const Cards = ({ cats, original, setOriginal }) => {
  return (
    <div className="cards__main">
      {cats.map(cat => (
        <Card
          key={cat.name}
          {...cat}
          original={original}
          setOriginal={setOriginal}
        />
      ))}
    </div>
  );
};

export default Cards;
