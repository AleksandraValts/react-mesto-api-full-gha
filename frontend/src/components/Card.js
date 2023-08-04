import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import React from 'react';

function Card(card) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser._id === card.owner._id;
  const isLiked = card.likes.some(id => id._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${isLiked && "elements__like_active"}`;
  
  function handleClick() {
    card.onCardClick(card);
  }
  
  function handleLikeClick() {
    card.onCardLike(card);
  }
    
  function handleDeleteClick() {
    card.onCardDelete(card)
  }

  return (
    <div className="elements__element">
      <img className="elements__image" alt={card.name} 
           src={card.link} onClick={handleClick}/>
        <div className="elements__info">
          <h2 className="elements__name">{card.name}</h2>
          <div className="elements__like-container">
            <button type="button" className={cardLikeButtonClassName}
            onClick={handleLikeClick}></button>
            <p className="elements__likes-amount">{card.likes.length}</p>
          </div>
        </div>
        {isOwn && <button type="button" className="elements__delete"
        onClick={handleDeleteClick} />}
    </div>
  );
}

export default Card;