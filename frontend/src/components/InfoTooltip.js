function InfoTooltip(props) {
  return (
    <div className ={`popup popup_type_login ${props.isOpen ? "popup_opened" : "" }`}>
      <div className="popup__container_login popup__container">
        <button type="button" className="popup__button-close" onClick={props.onClose}></button>
        <div className={`popup__login-img ${props.isSuccess ? 
        "popup__login-img_type_ok" : "popup__login-img_type_not-ok"}`}></div>
        <h2 className="popup__title-login">
        {props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз"}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;