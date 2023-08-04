import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [userData, setUserData] = React.useState({email: '', password: ''})

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value})
  }

  function handleSubmit(e) {
    let { email, password } = userData;
    e.preventDefault();
    props.onRegister({ email, password })
      .catch(err => {console.error(err)})
  }

  return (
    <section className="login">
      <form className="login__form" name="register" onSubmit={handleSubmit}>
        <h2 className="login__title">Регистрация</h2>
        <input className="login__input" type="email" name="email" value={userData.email}
        id="register-email" placeholder="Email" onChange={handleChange} required />
        <input className="login__input" type="password" name="password" value={userData.password}
        id="register-password" placeholder="Пароль" onChange={handleChange} required />
        <button className="login__button" type="submit">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
    </section>
  );
}

export default Register;

