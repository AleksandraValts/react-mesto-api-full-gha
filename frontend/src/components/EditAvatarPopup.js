import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const ref = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: ref.current.value
    });
  }

  React.useEffect(() => {ref.current.value = ''}, [props.isOpen]);

  return (
  <PopupWithForm onSubmit={handleSubmit}
  isOpen={props.isOpen} onClose={props.onClose}
  title={"Обновить аватар"} form={"form_avatar"} container={"avatar"}>
  <input ref={ref}
      className="popup__input popup__input_type_avatar" required
      type="url" name="avatar" id="input-avatar"
      placeholder="Ссылка на картинку"/>
  <span className="input-avatar-error popup__span"></span>
  </PopupWithForm>
)
}

export default EditAvatarPopup;