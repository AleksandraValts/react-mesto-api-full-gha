import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
  
    React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about)
    }, [currentUser, props.isOpen])

    function handleSubmit(e) {
      e.preventDefault();
      props.onUpdateUser({name, about: description});
    }
    
    function handleChangeUserName(e) {
      setName(e.target.value)
    }
  
    function handleChangeUserAbout(e) {
      setDescription(e.target.value)
    }

  return (
    <PopupWithForm onSubmit={handleSubmit} 
      isOpen={props.isOpen} onClose={props.onClose}
      title={"Редактировать профиль"} form={"form_profile"}>
      <input value={name || ''} onChange={handleChangeUserName}
        className="popup__input popup__input_type_name" required
        type="text" name="name" id="input-name"
        minLength="2" maxLength="40" placeholder="Имя пользователя"/>
      <span className="input-name-error popup__span"></span>
      <input value={description || ''} onChange={handleChangeUserAbout}
        className="popup__input popup__input_type_about" required
        type="text" name="about" id="input-about" minLength="2" 
        maxLength="200" placeholder="Информация о пользователе"/>
      <span className="input-about-error popup__span"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;