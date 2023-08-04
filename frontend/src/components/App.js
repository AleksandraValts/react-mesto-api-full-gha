import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import apiData from '../utils/Api.js';
import * as apiAuth from '../utils/ApiAuth.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isOkPopupOpen, setOkPopupOpen] = React.useState(false);
  const [isInfoTTSuccess, setInfoTTSuccess] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState('');

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
    Promise.all([apiData.getUserInfo(), apiData.getInitialCards()])
      .then(([user, data]) => {
        setCurrentUser(user);
        setCards(data.reverse())
      })
    .catch((err) => {console.log(err)})
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id._id === currentUser._id);
    if (!isLiked) {
      apiData.getCardLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {console.log(err)});
    } else {
      apiData.deleteCardLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {console.log(err)});
    }
  }

  function handleCardDelete(card) {
    apiData.deleteCard(card._id)
      .then(() => {
        setCards(prevCards => prevCards.filter(c => c._id !== card._id)) 
      })
      .catch((err) => {console.log(err)});
  }

  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }
  
  function closeAllPopups() {
    setProfilePopupOpen(false);
    setPlacePopupOpen(false);
    setAvatarPopupOpen(false);
    setSelectedCard(null);
    setOkPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    apiData.changeUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => {console.error(err)})
  }

  function handleUpdateAvatar(data) {
    apiData.changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {console.error(err)})
  }

  function handleAddPlaceSubmit(data) {
    apiData.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => {console.error(err)})
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      apiAuth
        .checkToken(jwt)
        .then((res) => {
           setLoggedIn(true);
           setHeaderEmail(res.email);
           navigate('/');  
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, [navigate])

  function handleRegisterNewUser({email, password}) {
   return apiAuth
      .register(email, password)
      .then((res) => {
        if (res) {
          setInfoTTSuccess(true);
          navigate('/sign-in');
        }
      })
      .catch((err) => {
        setInfoTTSuccess(false);
        console.log(err);
      })
      .finally(() => setOkPopupOpen(true));
  }

  function handleLoginUser({email, password}) {
    return apiAuth
      .authorise(email, password)
      .then((data) => {
        if(!data) { return }
        if (data.token) {
          setHeaderEmail(email);
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          navigate('/');
        }
      })
      .catch((err) => {
        setInfoTTSuccess(false);
        setOkPopupOpen(true);
        console.log(err);
      });
    }

  function handleExit() {
    localStorage.removeItem('jwt');
    setHeaderEmail('');
    setLoggedIn(false);
    navigate('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onExit={handleExit} headerEmail={headerEmail}/>
          <Routes> 
            <Route 
              path="/" 
              element={<ProtectedRoute element={Main} loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}
              onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />} /> 
            <Route 
              path="/" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-up" />} /> 
            <Route 
              path="/sign-up" element={<Register onRegister={handleRegisterNewUser} />} />
            <Route 
              path="/sign-in" element={<Login onLogin={handleLoginUser} />} />
          </Routes>
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />       
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup
          isOpen={selectedCard}
          card={selectedCard}
          onClose={closeAllPopups} />
        <InfoTooltip
          onClose={closeAllPopups} 
          isOpen={isOkPopupOpen} 
          isSuccess={isInfoTTSuccess}/>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;