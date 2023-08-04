import React from 'react';
import PopupWithForm from './PopupWithForm';
//import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({name, link});
  }

  function handleChangeCardName(e) {
    setName(e.target.value)
  }

  function handleChangeCardLink(e) {
    setLink(e.target.value)
  }

  React.useEffect(() => {
    setName('');
    setLink('')}, [props.isOpen])

  return (
    <PopupWithForm 
      onSubmit={handleSubmit}
      isOpen={props.isOpen} 
      onClose={props.onClose}
      title={"Новое место"} 
      buttonSave={"Создать"} 
      form={"form_places"}>
      <input 
        value={name} 
        onChange={handleChangeCardName}
        className="popup__input popup__input_type_place" required
        type="text" name="place" id="input-place"
        minLength="2" maxLength="30" placeholder="Название"/>
      <span className="input-place-error popup__span"></span>
      <input 
        value={link} 
        onChange={handleChangeCardLink}
        className="popup__input popup__input_type_src" required
        type="url" name="link" id="input-src"
        placeholder="Ссылка на картинку"/>
      <span className="input-src-error popup__span"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;