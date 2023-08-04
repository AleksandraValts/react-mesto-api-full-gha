function ImagePopup(props) {
  return (
    <div className={`popup popup_type_photo ${props.card ? "popup_opened" : ""}`}>
      <div className="popup__photo-open">
        <button type="button" className="popup__button-close" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card?.link} alt={props.card?.name}/>
        <h3 className="popup__photo-about">{props.card?.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;