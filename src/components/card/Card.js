import React, { useState } from 'react';
import './Card.css';
const Card = ({
  name,
  phone,
  email,
  image,
  favoured,
  original,
  setOriginal,
}) => {
  const [favouredResult, setFavouredResult] = useState(favoured);
  const toggleFavoured = name => {
    setFavouredResult(!favouredResult);
    const newFavouredList = original.map(el => {
      if (el.name === name) {
        el.favoured = !el.favoured;
        return el;
      }
      return el;
    });
    setOriginal(newFavouredList);
  };
  return (
    <article className="card">
      <button
        onClick={() => {
          toggleFavoured(name);
        }}
        className="card__favour"
      >
        {favouredResult ? (
          <ion-icon name="heart"></ion-icon>
        ) : (
          <ion-icon name="heart-outline"></ion-icon>
        )}
        {/*  <ion-icon name="heart"></ion-icon> */}
      </button>
      <div className="card__header">
        <img src={image.uri} className="card__image" alt={image.alt}></img>
      </div>
      <div className="card__content">
        <h2>{name}</h2>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
};

export default Card;
