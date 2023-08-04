import React from 'react';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="content">    
      <section className="profile">
        <div className="profile__container">
          <img className="profile__image" src={currentUser.avatar} alt="Авиатор" />
          <div className="profile__button-avatar" onClick={props.onEditAvatar}></div>
            <div className="profile__info">
              <div className="profile__change">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button type="button" className="button profile__button-edit" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
          </div>
          <button type="button" className="button profile__button-add"
            onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">{props.cards.map((card) => (
        <Card key={card._id} {...card} onCardClick={props.onCardClick}
          onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />))}         
      </section>
      </main>
  );
}

export default Main;